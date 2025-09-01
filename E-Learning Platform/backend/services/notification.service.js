// services/notification.service.js
import Notification from "../models/Notification.model.js";
import { sendBatchEmails } from "./email.service.js";
import Course from "../models/Course.model.js";
import User from "../models/User.model.js";
import logger from "../utils/logger.js";

const messageTemplates = {
  // Course-related notifications
  new_course: (courseName) =>
    `📚 A new course "${courseName}" is now available. Start learning today!`,
  course_updated: (courseName) =>
    `ℹ️ The course "${courseName}" has been updated with new content. Check it out!`,
  course_completed: (courseName) =>
    `🎉 Congratulations! You’ve successfully completed "${courseName}". Keep up the great work!`,

  // Enrollment notifications
  enrollment_approved: (courseName) =>
    `✅ Your enrollment request has been approved. You now have access to "${courseName}".`,
  enrollment_rejected: (courseName, reason = "") =>
    `❌ Your enrollment request for "${courseName}" was declined.${
      reason ? ` Reason: ${reason}` : ""
    }`,
  new_enrollment_request: (courseName, requester) =>
    `📩 A new enrollment request has been submitted for "${courseName}" by ${requester}.`,

  // Account notifications
  password_reset: () =>
    `🔒 Your account password has been successfully reset. If this wasn’t you, please contact support immediately.`,
  profile_updated: () =>
    `📝 Your profile details have been updated successfully.`,

  // System notifications
  course_removal: (courseName) =>
    `⚠️ The course "${courseName}" is no longer available in the catalog.`,
  system_alert: (message) => `🚨 System Alert: ${message}`,

  // Admin notifications
  new_enrollment_admin: (courseName, requester) =>
    `📩 New enrollment request for "${courseName}" submitted by ${requester}.`,
  content_approval_needed: (itemType) =>
    `🛠️ Approval Required: A new ${itemType} is awaiting your review.`,

  // Formatting helpers
  format_with_emoji: (emoji, text) => `${emoji} ${text}`,
  format_important: (text) => `❗${text}❗`,
};

export const createNotification = async (userId, type, metadata = {}) => {
  try {
    // Special handling for course-related notifications
    let courseName = metadata.courseName;

    if (!courseName && metadata.courseId) {
      const course = await Course.findById(metadata.courseId).select("title");
      courseName = course?.title || "Unknown Course";
    }

    // Fallback for course removal notifications
    if (type === "course_removal" && !courseName) {
      courseName = "a course";
    }

    // Ensure courseName is never undefined for course-related notifications
    if (type.includes("course") && !courseName) {
      courseName = "a course";
    }

    // Call the appropriate template function based on type
    let message;
    if (type === "course_removal") {
      message = messageTemplates[type](courseName);
    } else if (type === "enrollment_rejected") {
      message = messageTemplates[type](courseName, metadata.reason);
    } else if (type === "new_enrollment_request") {
      message = messageTemplates[type](courseName, metadata.requester);
    } else if (type === "new_enrollment_admin") {
      message = messageTemplates[type](courseName, metadata.requester);
    } else if (type === "content_approval_needed") {
      message = messageTemplates[type](metadata.itemType);
    } else if (type === "system_alert") {
      message = messageTemplates[type](metadata.message);
    } else {
      // For other types that only need courseName
      message = messageTemplates[type](courseName);
    }

    return await Notification.create({
      userId,
      type,
      message,
      relatedCourse: metadata.courseId,
      read: false,
    });
  } catch (error) {
    logger.error(`Failed to create notification: ${error.message}`);
    throw error;
  }
};

export const notifyNewCourse = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course not found");

    const users = await User.find({ isAdmin: false }).select("_id email");
    if (!users.length) {
      logger.info("No non-admin users to notify");
      return { success: true, notifiedUsers: 0 };
    }

    const notifications = users.map((user) => ({
      userId: user._id,
      type: "new_course",
      message: messageTemplates.new_course(course.title),
      relatedCourse: courseId,
    }));

    await Notification.insertMany(notifications);

    // Send emails in background (non-blocking)
    sendBatchEmails(
      users.map((u) => u._id),
      "new_course",
      { courseName: course.title }
    ).catch((emailError) => {
      logger.error("Email sending failed:", emailError.message);
    });

    logger.info(
      `Notified ${users.length} users about new course ${course.title}`
    );
    return { success: true, notifiedUsers: users.length };
  } catch (error) {
    logger.error(`Course notification failed: ${error.message}`);
    throw error;
  }
};

export const notifyAdminsOfEnrollmentRequest = async (
  userId,
  courseId,
  courseTitle
) => {
  try {
    // 1. Get all admin users with email addresses
    const admins = await User.find({ isAdmin: true }).select("_id email");

    if (!admins.length) {
      logger.warn("No admin users found to notify");
      return { success: false, message: "No admin users found" };
    }

    // 2. Get requesting user details
    const requestingUser = await User.findById(userId)
      .select("firstName lastName email")
      .lean();

    if (!requestingUser) {
      logger.error("Requesting user not found");
      return { success: false, message: "User not found" };
    }

    // 3. Create simplified notifications (without metadata)
    const notifications = admins.map((admin) => ({
      userId: admin._id,
      type: "admin_enrollment_request", // Changed to match enum
      message: `📩 New enrollment request for "${courseTitle}" from ${requestingUser.firstName} ${requestingUser.lastName}`,
      relatedCourse: courseId,
      read: false,
    }));

    // 4. Insert notifications
    const result = await Notification.insertMany(notifications);
    logger.info(`Created ${result.length} admin notifications`);

    // 5. Prepare email data
    const emailData = {
      courseName: courseTitle,
      requester: `${requestingUser.firstName} ${requestingUser.lastName}`,
      requesterEmail: requestingUser.email,
    };

    // 6. Send emails (non-blocking)
    sendBatchEmails(
      admins.map((admin) => admin._id),
      "new_enrollment_request",
      emailData
    ).catch((emailError) => {
      logger.error("Email sending failed:", emailError.message);
    });

    return { success: true, notifiedAdmins: admins.length };
  } catch (error) {
    logger.error(`Admin notification failed: ${error.message}`);
    return {
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }
};
