// models/Notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "enrollment_approved",
        "enrollment_rejected",
        "course_removal",
        "password_reset",
        "new_course",
        "course_completed",
        "profile_updated",
        "new_enrollment_request",
        "admin_enrollment_request",
      ],
      required: true,
    },
    relatedCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes
notificationSchema.index({ userId: 1, read: 1 });
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

// Proper export
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
