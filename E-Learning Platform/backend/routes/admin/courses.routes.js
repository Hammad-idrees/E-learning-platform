import express from "express";
import {
  createCourse,
  updateCourse,
  getCoursesForAdmin,
  getAllCourses,
  getCourseDetails,
  getCourseVideos,
  deleteCourse, // Add this import
  cleanupStaleVideoReferences,
} from "../../controllers/admin/course.controller.js";
import { protect, admin } from "../../middleware/auth.middleware.js";
import { canAccessCourse } from "../../middleware/enrollment.middleware.js";
import { uploadThumbnail } from "../../middleware/multer.image.middleware.js";

import {
  addComment,
  getComments,
  deleteComment,
} from "../../controllers/comment.controller.js";

const router = express.Router();

// Admin-only routes
router
  .route("/")
  .post(protect, admin, uploadThumbnail.single("thumbnail"), createCourse)
  .get(protect, admin, getCoursesForAdmin);

// Cleanup route
router.post("/cleanup-videos", protect, admin, cleanupStaleVideoReferences);

router
  .route("/:id")
  .put(protect, admin, updateCourse)
  .put(protect, admin, uploadThumbnail.single("thumbnail"), updateCourse)
  .delete(protect, admin, deleteCourse);

// Public routes
router.get("/published", getAllCourses);
router.get("/:id", protect, getCourseDetails);
router.get("/:id/videos", protect, canAccessCourse, getCourseVideos);

// Comments routes
router.post("/:id/comments", protect, addComment);
router.get("/:id/comments", protect, getComments);
router.delete("/comments/:id", protect, deleteComment);
export default router;
