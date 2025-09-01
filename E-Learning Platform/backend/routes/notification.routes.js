import express from "express";
import { publishCourse } from "../controllers/admin/course.controller.js";
import {
  getMyNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/courses/:id/publish", protect, admin, publishCourse);
// Get all notifications for the logged-in user
router.get("/", protect, getMyNotifications);
router.patch("/:id/read", protect, markNotificationAsRead);
router.delete("/:id", protect, deleteNotification);
export default router;
