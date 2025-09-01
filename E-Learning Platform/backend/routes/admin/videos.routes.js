import express from "express";
import {
  uploadVideo,
  getVideoStatus,
  streamVideo, // Add this controller
  getVideoDetails,
  deleteVideo, // Add this controller
  updateVideoDetails, // Add the new controller
  uploadThumbnail,
  generateThumbnail,
} from "../../controllers/admin/video.controller.js";
import { protect, admin } from "../../middleware/auth.middleware.js";
import { canAccessCourse } from "../../middleware/enrollment.middleware.js";
import upload from "../../middleware/multer.middleware.js";
// Thumbnails
import { uploadThumbnail as uploadThumbMulter } from "../../middleware/multer.image.middleware.js";

const router = express.Router();

// Admin video management
router.post(
  "/:courseId/videos",
  protect,
  admin,
  upload.single("video"),
  uploadVideo
);

router.get("/:courseId/videos/:id/status", protect, admin, getVideoStatus);

// Video access (protected by enrollment)
router.get("/:id/stream", protect, canAccessCourse, streamVideo);

router.get("/:id", protect, getVideoDetails);
// Admin-only video management
router.put("/:id", protect, admin, updateVideoDetails); // Add this line
router.delete("/:id", protect, admin, deleteVideo);

router.post(
  "/:id/thumbnail",
  protect,
  admin,
  uploadThumbMulter.single("thumbnail"),
  uploadThumbnail
);
router.post("/:id/thumbnail/auto", protect, admin, generateThumbnail);

export default router;
