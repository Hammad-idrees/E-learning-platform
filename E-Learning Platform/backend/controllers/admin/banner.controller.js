import fs from "fs";
import path from "path";
import { uploadBufferToS3, deleteS3Object } from "../../services/s3Uploader.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Banner from "../../models/Banner.model.js";
import logger from "../../utils/logger.js";

export const uploadBanners = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const captions = (() => {
    try {
      // captions can be array or single string; also allow JSON array via field 'captions'
      if (Array.isArray(req.body.captions)) return req.body.captions;
      if (typeof req.body.captions === "string") return [req.body.captions];
      return [];
    } catch {
      return [];
    }
  })();

  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No images uploaded" });
  }

  const created = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const caption = captions[i] || undefined;
      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      const key = `banners/${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${ext}`;
      const uploaded = await uploadBufferToS3({
        buffer: file.buffer,
        key,
        contentType: file.mimetype || "image/jpeg",
      });

      // Generate CloudFront URL instead of S3 URL
      const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
      const cloudfrontUrl = `${cloudfrontBase}/banners/${path.basename(key)}`;

      const doc = await Banner.create({
        image: { key, url: cloudfrontUrl },
        caption,
        createdBy: userId,
      });
      created.push(doc);
    }
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    logger.error("Banner upload failed", err);
    res.status(500).json({ success: false, message: "Failed to save banners" });
  }
});

export const listBanners = asyncHandler(async (req, res) => {
  const items = await Banner.find({}).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
});

export const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res
      .status(404)
      .json({ success: false, message: "Banner not found" });
  }
  try {
    if (banner.image?.key) {
      await deleteS3Object(banner.image.key);
    }
  } catch (e) {}
  await Banner.findByIdAndDelete(banner._id);
  res.json({ success: true, message: "Banner deleted" });
});

export const getPublicBanners = asyncHandler(async (req, res) => {
  const items = await Banner.find({})
    .sort({ createdAt: -1 })
    .select({ image: 1, caption: 1, createdAt: 1 })
    .lean();
  res.json({ success: true, data: items });
});
