import asyncHandler from "../../utils/asyncHandler.js";
import { processVideo } from "../../services/videoProcessor.js";
import Video from "../../models/Video.model.js";
import videoStorage from "../../services/videoStorage.js";
import path from "path";
import fs from "fs";
import {
  uploadBufferToS3,
  uploadDirectoryToS3,
  publicUrlForKey,
} from "../../services/s3Uploader.js";
import Enrollment from "../../models/Enrollment.model.js";
import logger from "../../utils/logger.js";
import Course from "../../models/Course.model.js";
import ffmpeg from "fluent-ffmpeg";
import { uploadFileToS3, deleteS3Prefix } from "../../services/s3Uploader.js";

// Video upload controller
export const uploadVideo = asyncHandler(async (req, res) => {
  logger.info(
    "Upload request received. Files:",
    req.file ? "File present" : "No file"
  );

  if (!req.file) {
    logger.warn("No file detected in request. Body:", req.body);
    return res.status(400).json({
      success: false,
      message: "No video file detected in request",
    });
  }

  const { courseId } = req.params;
  const { title, description } = req.body; // Extract title and description
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No video file uploaded" });
  }

  // Pass title and description to processVideo
  const video = await processVideo(
    file,
    courseId,
    req.user._id,
    title,
    description
  );

  // Ensure the new video is linked to the course.videos array
  try {
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { videos: video._id },
    });
  } catch (linkErr) {
    logger.warn("Failed to link video to course.videos array", {
      courseId,
      videoId: video._id,
      error: linkErr?.message,
    });
  }

  // If local HLS exists, upload folder to S3 and compute absolute URL
  const hlsLocalDir = path.join(
    process.cwd(),
    video.hlsPath.replace(/\\/g, "/").replace(/\/[^\/]+\.m3u8$/, "")
  );
  try {
    const baseKey = `videos/${courseId}/${video._id}`;
    if (fs.existsSync(hlsLocalDir)) {
      await uploadDirectoryToS3({ localDir: hlsLocalDir, baseKey });
    }
    // Determine the correct S3 key for the index.m3u8 file
    const indexKey = `${baseKey}/index.m3u8`;

    // Generate CloudFront URL instead of S3 URL
    const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
    const cloudfrontUrl = `${cloudfrontBase}/videos/${courseId}/${video._id}/index.m3u8`;

    // persist on video
    try {
      video.hlsUrl = cloudfrontUrl;
      await video.save();
    } catch {}

    // Optional: cleanup local HLS after successful upload
    const shouldDeleteLocal =
      String(process.env.S3_DELETE_LOCAL_HLS || "").toLowerCase() === "true";
    if (shouldDeleteLocal) {
      try {
        // Remove the entire video folder (parent of hls directory) to avoid any local retention
        const videoLocalDir = path.dirname(hlsLocalDir);
        fs.rmSync(videoLocalDir, { recursive: true, force: true });
      } catch (delErr) {
        logger.error("Failed to delete local video directory", delErr);
      }
    }
    // respond with S3 URL for immediate playback via S3/CDN
    res.status(201).json({
      success: true,
      data: {
        id: video._id,
        status: video.status,
        hlsUrl: video.hlsUrl || `/uploads/${video.hlsPath}`,
      },
      warning: "S3 upload failed; using local URL",
    });
  } catch (e) {
    logger.error("Failed to upload HLS to S3", e);
    res.status(201).json({
      success: true,
      data: {
        id: video._id,
        status: video.status,
        hlsUrl: `/uploads/${video.hlsPath}`,
        hlsUrl: video.hlsUrl || null,
      },
      warning: "S3 upload failed; using local URL",
    });
  }
});

// Add this new controller for getting video status
export const getVideoStatus = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found",
    });
  }

  res.json({
    success: true,
    status: video.status,
    processingProgress: video.processingProgress, // Optional: add if you track progress
  });
});

// Add this new controller for getting video details
export const getVideoDetails = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)
    .select("title description duration thumbnails") // include thumbnails
    .populate("course", "title");

  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found",
    });
  }

  res.json({
    success: true,
    data: video,
  });
});

// @desc    Update video details
// @route   PUT /api/videos/:id
// @access  Admin
export const updateVideoDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Validate input
  if (!title && !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
      code: "MISSING_FIELDS",
    });
  }

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found",
      code: "VIDEO_NOT_FOUND",
    });
  }

  // Update only provided fields
  if (title) video.title = title;
  if (description) video.description = description;

  const updatedVideo = await video.save();

  res.json({
    success: true,
    message: "Video updated successfully",
    data: {
      id: updatedVideo._id,
      title: updatedVideo.title,
      description: updatedVideo.description,
      updatedAt: updatedVideo.updatedAt,
    },
  });
});

// Stream video controller
// This controller handles S3-based video streaming
export const streamVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found in database",
      code: "VIDEO_NOT_FOUND",
    });
  }

  // Check if video has S3 hlsUrl
  if (!video.hlsUrl) {
    return res.status(404).json({
      success: false,
      message: "Video not available for streaming",
      code: "VIDEO_NOT_AVAILABLE",
    });
  }

  // Instead of redirecting, return the URL in JSON
  // This allows frontend to handle CORS and authentication properly
  return res.json({
    success: true,
    data: {
      hlsUrl: video.hlsUrl,
    },
  });
});

// Delete video controller
// controllers/video.controller.js
export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });

  try {
    // 0. Delete S3 assets: HLS and thumbnails for this video
    try {
      const hlsPrefix = `videos/${video.course}/${video._id}/`;
      const thumbsPrefix = `thumbnails/${video.course}/${video._id}/`;
      await deleteS3Prefix(hlsPrefix);
      await deleteS3Prefix(thumbsPrefix);
    } catch (e) {
      logger.error("S3 video asset deletion failed", e);
    }

    // 1. Get CORRECT storage path
    const hlsPath = video.hlsPath
      .replace(/^[\/\\]?uploads[\/\\]/, "") // Remove any leading uploads/
      .replace(/\\/g, "/"); // Normalize to forward slashes

    const absolutePath = path.join(
      process.cwd(),
      "uploads", // Base storage directory
      hlsPath // Already normalized path
    );
    const videoDir = path.dirname(absolutePath);

    // 2. Debug logs (keep these temporarily)
    logger.info("Corrected deletion path:", videoDir);
    logger.info("Directory exists?", fs.existsSync(videoDir));

    // 3. Delete files if they exist
    let filesDeleted = false;
    if (fs.existsSync(videoDir)) {
      fs.rmSync(videoDir, { recursive: true, force: true });
      filesDeleted = true;
      logger.info("Successfully deleted video files");
    }

    // 4. Database cleanup
    await Video.findByIdAndDelete(video._id);
    await Course.findByIdAndUpdate(video.course, {
      $pull: { videos: video._id },
    });

    res.json({
      success: true,
      message: filesDeleted
        ? "Video and files deleted"
        : "Video deleted (files already missing)",
    });
  } catch (error) {
    logger.error("Final deletion error:", error);
    res.status(500).json({
      success: false,
      message: "Video metadata deleted but file cleanup failed",
      debug:
        process.env.NODE_ENV === "development"
          ? {
              attemptedPath: videoDir,
              error: error.message,
            }
          : undefined,
    });
  }
});

//------------> Thumbnail Related <------------

// Upload custom thumbnail for a video
export const uploadThumbnail = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video)
    return res.status(404).json({ success: false, message: "Video not found" });

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No thumbnail file provided" });
  }

  // Upload thumbnail buffer to S3
  const ext = path.extname(req.file.originalname).toLowerCase() || ".jpg";
  const key = `thumbnails/${video.course}/${video._id}/${Date.now()}${ext}`;
  const uploaded = await uploadBufferToS3({
    buffer: req.file.buffer,
    key,
    contentType: req.file.mimetype || "image/jpeg",
  });

  // Generate CloudFront URL instead of S3 URL
  const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
  const url = `${cloudfrontBase}/thumbnails/${video.course}/${
    video._id
  }/${path.basename(key)}`;
  const relativePath = key;

  // Put newest first
  const nextThumbs = [
    { key: relativePath, url },
    ...(Array.isArray(video.thumbnails) ? video.thumbnails : []),
  ];

  video.thumbnails = nextThumbs;
  await video.save();

  res.json({
    success: true,
    message: "Thumbnail uploaded",
    data: { thumbnails: video.thumbnails },
  });
});

// Auto-generate thumbnail(s) for an existing video from HLS content
export const generateThumbnail = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video)
    return res.status(404).json({ success: false, message: "Video not found" });

  const hlsDir = path
    .join(process.cwd(), video.hlsPath.replace(/\\/g, "/"))
    .replace(/\/(index\.m3u8)$/i, "");

  let inputPlaylist = path.join(hlsDir, "index.m3u8");

  if (!fs.existsSync(inputPlaylist)) {
    return res.status(404).json({
      success: false,
      message: "HLS playlist not found for thumbnail generation",
    });
  }

  // derive approximate duration from DB or fallback
  const duration = Math.max(1, Number(video.duration) || 60);
  const captureTimes = [0.25, 0.5, 0.75].map((p) =>
    Math.max(0, Math.floor(duration * p))
  );

  const thumbnailsDir = path.join(process.cwd(), "uploads", "thumbnails");
  if (!fs.existsSync(thumbnailsDir))
    fs.mkdirSync(thumbnailsDir, { recursive: true });

  const outputs = [];
  for (let i = 0; i < captureTimes.length; i++) {
    const t = captureTimes[i];
    const outThumb = path.join(
      thumbnailsDir,
      `${video._id}-${Date.now()}-${i + 1}.jpg`
    );
    try {
      /* Use -ss before -i for fast seek; some HLS inputs need accurate seek with -ss after -i */
      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(inputPlaylist)
          .inputOptions([`-ss ${t}`])
          .frames(1)
          .outputOptions(["-qscale:v 2"]) // good quality
          .videoFilters("scale=640:-1")
          .output(outThumb)
          .on("end", resolve)
          .on("error", reject)
          .run();
      });
      outputs.push(outThumb);
    } catch (e) {
      // continue with other frames
    }
  }

  if (outputs.length === 0) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate thumbnails" });
  }

  // Pick largest file as heuristic
  let best = outputs[0];
  try {
    for (const f of outputs) {
      const cur = fs.statSync(f).size;
      const bestSize = fs.statSync(best).size;
      if (cur > bestSize) best = f;
    }
  } catch {}

  // Upload chosen thumbnail to S3
  let s3Thumb = null;
  try {
    const key = `thumbnails/${video.course.toString()}/${video._id.toString()}/auto-${Date.now()}.jpg`;
    const uploaded = await uploadFileToS3({ filePath: best, key });

    // Generate CloudFront URL instead of S3 URL
    const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
    const cloudfrontUrl = `${cloudfrontBase}/thumbnails/${video.course}/${
      video._id
    }/${path.basename(key)}`;

    s3Thumb = { key, url: cloudfrontUrl };
  } catch (e) {
    logger.error("Auto-thumbnail S3 upload failed", e);
  } finally {
    try {
      fs.unlinkSync(best);
    } catch {}
  }
  const nextThumbs = [
    ...(s3Thumb ? [s3Thumb] : []),
    ...(Array.isArray(video.thumbnails) ? video.thumbnails : []),
  ];
  video.thumbnails = nextThumbs;
  await video.save();

  res.json({
    success: true,
    message: "Thumbnail generated",
    data: { thumbnails: video.thumbnails },
  });
});
