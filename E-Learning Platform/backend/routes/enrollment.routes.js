import express from "express";
import {
  requestEnrollment,
  getMyEnrollments,
  getEnrollmentStatus,
  getPendingEnrollments,
  approveEnrollment,
  rejectEnrollment,
  deleteEnrollment,
} from "../controllers/enrollment.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// User routes
router.post("/", protect, requestEnrollment);
router.get("/my", protect, getMyEnrollments);
router.get("/status/:courseId", protect, getEnrollmentStatus);

// Admin routes
router.get("/admin/enrollments", protect, admin, getPendingEnrollments);
router.put(
  "/admin/enrollments/:enrollmentId/approve",
  protect,
  admin,
  approveEnrollment
);
router.put(
  "/admin/enrollments/:enrollmentId/reject",
  protect,
  admin,
  rejectEnrollment
);
// Admin routes
router.delete(
  // Add this new route
  "/admin/enrollments/:enrollmentId",
  protect,
  admin,
  deleteEnrollment
);
export default router;
