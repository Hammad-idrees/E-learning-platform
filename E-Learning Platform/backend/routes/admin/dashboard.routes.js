import express from "express";
import {
  getDashboardStats,
  getCourseStats,
  getEnrollmentStats,
  getDashboardOverview,
  getLoginActivity,
} from "../../controllers/admin/dashboard.controller.js";
import { protect, admin } from "../../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication and admin privileges
router.use(protect, admin);

// Dashboard statistics routes
router.get("/stats", getDashboardStats);
router.get("/course-stats", getCourseStats);
router.get("/enrollment-stats", getEnrollmentStats);
router.get("/overview", getDashboardOverview);
router.get("/login-activity", getLoginActivity);

export default router;
