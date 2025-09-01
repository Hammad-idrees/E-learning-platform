import { execSync } from "child_process";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { uploadFileToS3 } from "./s3Uploader.js";
import logger from "../utils/logger.js";
import Video from "../models/Video.model.js";

const exec = promisify(execCallback);
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const THUMBNAILS_DIR = path.join(UPLOADS_DIR, "thumbnails");

function detectSystemFFmpeg(cmd) {
  try {
    return execSync(cmd).toString().trim();
  } catch {
    return null;
  }
}

async function configureFFmpeg() {
  let ffmpegPath = null;
  let ffprobePath = null;

  if (process.platform === "win32") {
    ffmpegPath = detectSystemFFmpeg("where ffmpeg");
    ffprobePath = detectSystemFFmpeg("where ffprobe");
  } else {
    ffmpegPath = detectSystemFFmpeg("which ffmpeg");
    ffprobePath = detectSystemFFmpeg("which ffprobe");
  }

  if (!ffmpegPath || !ffprobePath) {
    logger.warn(
      "System ffmpeg not found. Falling back to npm ffmpeg-installer..."
    );
    const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");
    const ffprobeInstaller = await import("@ffprobe-installer/ffprobe");
    ffmpegPath = ffmpegInstaller.default.path;
    ffprobePath = ffprobeInstaller.default.path;
  }

  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  logger.info(`Using FFmpeg: ${ffmpegPath}`);
  logger.info(`Using FFprobe: ${ffprobePath}`);
}

await configureFFmpeg();

// Single target resolution (720p) with tuned bitrate settings
const resolutions = [
  {
    name: "720p",
    width: 1280,
    height: 720,
    videoBitrate: "3500k",
    audioBitrate: "160k",
    maxrate: "4000k",
    bufsize: "7000k",
  },
];

// Get video duration (seconds) using ffprobe via fluent-ffmpeg
const getVideoDuration = async (filePath) => {
  return new Promise((resolve) => {
    try {
      ffmpeg.ffprobe(filePath, (err, data) => {
        if (err) {
          logger.error("ffprobe error while reading duration:", err.message);
          resolve(0);
          return;
        }
        const seconds = Number(data?.format?.duration) || 0;
        resolve(seconds);
      });
    } catch (err) {
      logger.error("Error getting video duration:", err);
      resolve(0);
    }
  });
};

export const processVideo = async (
  file,
  courseId,
  userId,
  title,
  description
) => {
  const videoId = new mongoose.Types.ObjectId();
  logger.info(
    `Starting video processing for course: ${courseId}, video: ${videoId}`
  );

  const courseDir = path.join(UPLOADS_DIR, "courses", courseId.toString());
  const videoDir = path.join(courseDir, "videos", videoId.toString());
  const hlsDir = path.join(videoDir, "hls");
  fs.mkdirSync(hlsDir, { recursive: true });

  const tempVideoPath = path.join(
    courseDir,
    "temp",
    `${Date.now()}-${file.originalname}`
  );
  fs.mkdirSync(path.dirname(tempVideoPath), { recursive: true });
  fs.writeFileSync(tempVideoPath, file.buffer);

  try {
    const duration = await getVideoDuration(tempVideoPath);
    // Ensure thumbnails directory exists (temporary local capture)
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });

    // Use single resolution (720p) with simplified structure
    const res = resolutions[0]; // 720p
    const outPath = path.join(hlsDir, "index.m3u8");

    await new Promise((resolve, reject) => {
      ffmpeg(tempVideoPath)
        .videoCodec("libx264")
        .audioCodec("aac")
        .size(`${res.width}x${res.height}`)
        .outputOptions([
          `-b:v ${res.videoBitrate}`,
          `-maxrate ${res.maxrate}`,
          `-bufsize ${res.bufsize}`,
          `-b:a ${res.audioBitrate}`,
          "-ac 2",
          "-profile:v high",
          "-level 4.1",
          "-preset fast",
          "-g 48",
          "-sc_threshold 0",
          "-hls_time 10",
          "-hls_list_size 0",
          "-f hls",
        ])
        .output(outPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    // Generate 3 candidate thumbnails at 25%, 50%, 75% of the duration
    const captureTimes = [0.25, 0.5, 0.75].map((p) =>
      Math.max(0, Math.floor(duration * p))
    );
    const candidateFiles = [];
    for (let i = 0; i < captureTimes.length; i++) {
      const t = captureTimes[i];
      const outThumb = path.join(
        THUMBNAILS_DIR,
        `${videoId.toString()}-${i + 1}.jpg`
      );
      try {
        await new Promise((resolve, reject) => {
          // Use -y to overwrite if exists; use good quality and scale width 640
          ffmpeg(tempVideoPath)
            .seekInput(t)
            .frames(1)
            .outputOptions(["-qscale:v 2"])
            .videoFilters("scale=640:-1")
            .output(outThumb)
            .on("end", resolve)
            .on("error", reject)
            .run();
        });
        candidateFiles.push(outThumb);
      } catch (e) {
        // ignore this candidate
      }
    }

    // Pick the largest file as a simple heuristic for the clearest frame
    let s3Thumb = null;
    if (candidateFiles.length > 0) {
      let best = candidateFiles[0];
      try {
        for (const f of candidateFiles) {
          const cur = fs.statSync(f).size;
          const bestSize = fs.statSync(best).size;
          if (cur > bestSize) best = f;
        }
      } catch {}
      // Upload selected thumbnail to S3 and cleanup local files
      try {
        const key = `thumbnails/${courseId.toString()}/${videoId.toString()}/auto-${Date.now()}.jpg`;
        const uploaded = await uploadFileToS3({ filePath: best, key });

        // Generate CloudFront URL instead of S3 URL for thumbnails
        const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
        const cloudfrontUrl = `${cloudfrontBase}/thumbnails/${courseId.toString()}/${videoId.toString()}/${path.basename(
          key
        )}`;

        s3Thumb = { key, url: cloudfrontUrl };
      } catch (e) {
        logger.error("Failed to upload auto thumbnail to S3", e);
      } finally {
        // cleanup local temp thumbnails
        for (const f of candidateFiles) {
          try {
            fs.unlinkSync(f);
          } catch {}
        }
      }
    }

    const video = await Video.create({
      _id: videoId,
      title: title || file.originalname.replace(/\.[^/.]+$/, ""),
      description: description || "",
      course: courseId,
      sequence: await Video.countDocuments({ course: courseId }),
      duration,
      hlsPath: path.join(
        "uploads",
        "courses",
        courseId.toString(),
        "videos",
        videoId.toString(),
        "hls",
        "index.m3u8"
      ),
      createdBy: userId,
      thumbnails: s3Thumb ? [s3Thumb] : [],
      status: "ready",
    });

    logger.info(
      `Video processing completed successfully for video: ${videoId}`
    );
    return video;
  } catch (error) {
    logger.error(`Video processing failed for video: ${videoId}`, error);
    throw error;
  } finally {
    if (fs.existsSync(tempVideoPath)) {
      fs.unlinkSync(tempVideoPath);
      logger.info("Temporary video file cleaned up");
    }
  }
};

logger.info("Video model loaded successfully");
