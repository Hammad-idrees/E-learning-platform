import asyncHandler from "../utils/asyncHandler.js";
import Enrollment from "../models/Enrollment.model.js";
import Course from "../models/Course.model.js";
import User from "../models/User.model.js";
import {
  createNotification,
  notifyAdminsOfEnrollmentRequest,
} from "../services/notification.service.js";

// @desc    Request enrollment in a course
// @route   POST /api/enrollments
export const requestEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  // Validate course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  // Check for existing enrollment
  const existingEnrollment = await Enrollment.findOne({
    user: req.user._id,
    course: courseId,
  });

  if (existingEnrollment) {
    return res.status(400).json({
      success: false,
      message: `Enrollment already ${existingEnrollment.status}`,
    });
  }

  // Create enrollment request
  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: courseId,
    status: "pending",
  });
  // Notify admins
  await notifyAdminsOfEnrollmentRequest(req.user._id, courseId, course.title);

  res.status(201).json({
    success: true,
    message: "Enrollment requested. Waiting for admin approval.",
    data: enrollment,
  });
});

// @desc    Get user's enrollments
// @route   GET /api/enrollments/my
export const getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate("course", "title description createdAt thumbnail videos") // include thumbnail and videos
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: enrollments.length,
    data: enrollments,
  });
});

// @desc    Check enrollment status for a course
// @route   GET /api/enrollments/status/:courseId
export const getEnrollmentStatus = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: courseId,
  });

  res.json({
    success: true,
    data: enrollment || { status: "not_enrolled" },
  });
});

// @desc    Get enrollments by status for Admin (defaults to pending)
// @route   GET /api/enrollments/admin/enrollments?status=pending,approved
export const getPendingEnrollments = asyncHandler(async (req, res) => {
  const { status = "pending" } = req.query;
  const statuses = String(status)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const enrollments = await Enrollment.find({ status: { $in: statuses } })
    .populate("user", "firstName lastName email")
    .populate("course", "title description videos")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: enrollments.length,
    data: enrollments,
  });
});

// @desc    Approve enrollment (Admin)
// @route   PUT /api/admin/enrollments/:enrollmentId/approve
export const approveEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.enrollmentId);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: "Enrollment not found",
    });
  }

  if (enrollment.status === "approved") {
    return res.status(400).json({
      success: false,
      message: "Enrollment already approved",
    });
  }

  // Update enrollment status
  enrollment.status = "approved";
  await enrollment.save();

  // Add course to user's enrolled courses
  await User.findByIdAndUpdate(enrollment.user, {
    $addToSet: { enrolledCourses: enrollment.course },
  });

  // Trigger notification
  await createNotification(enrollment.user, "enrollment_approved", {
    courseId: enrollment.course,
  });

  res.json({
    success: true,
    message: "Enrollment approved and user notified",
    data: enrollment,
  });
});

// @desc    Reject enrollment (Admin)
// @route   PUT /api/admin/enrollments/:enrollmentId/reject
export const rejectEnrollment = asyncHandler(async (req, res) => {
  const { reason } = req.body || {}; // Safe destructuring
  const enrollment = await Enrollment.findById(req.params.enrollmentId);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: "Enrollment not found",
    });
  }

  if (enrollment.status === "rejected") {
    return res.status(400).json({
      success: false,
      message: "Enrollment already rejected",
    });
  }

  enrollment.status = "rejected";
  enrollment.rejectionReason = reason || "";
  await enrollment.save();

  // Notify user about rejection
  await createNotification(enrollment.user, "enrollment_rejected", {
    courseId: enrollment.course,
    reason: enrollment.rejectionReason,
  });

  res.json({
    success: true,
    message: "Enrollment rejected",
    data: enrollment,
  });
});

// @desc    Delete enrollment (Admin - hard delete)
// @route   DELETE /api/admin/enrollments/:enrollmentId
export const deleteEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.enrollmentId);

  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: "Enrollment not found",
    });
  }

  // Remove course from user's enrolledCourses
  if (enrollment.status === "approved") {
    await User.findByIdAndUpdate(enrollment.user, {
      $pull: { enrolledCourses: enrollment.course },
    });
  }

  // Hard delete enrollment
  await Enrollment.findByIdAndDelete(req.params.enrollmentId);

  res.json({
    success: true,
    message: "Enrollment permanently deleted",
    data: {
      id: req.params.enrollmentId,
      course: enrollment.course,
      user: enrollment.user,
    },
  });
});
