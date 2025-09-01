import asyncHandler from "../utils/asyncHandler.js";
import Enrollment from "../models/Enrollment.model.js";
import Course from "../models/Course.model.js";

// Middleware to allow course access but block videos if not enrolled
export const canAccessCourse = asyncHandler(async (req, res, next) => {
  // Allow all authenticated users to access course metadata
  if (!req.path.includes("/videos")) return next();

  // For video routes, check enrollment
  const courseId = req.params.courseId || req.params.id;

  // Admins and course creators bypass
  if (req.user?.isAdmin) return next();
  const course = await Course.findById(courseId);
  if (course?.createdBy.equals(req.user._id)) return next();

  // Check enrollment
  const isEnrolled = await Enrollment.exists({
    user: req.user._id,
    course: courseId,
    status: "approved",
  });

  if (!isEnrolled) {
    return res.status(403).json({
      success: false,
      message: "Enroll in the course to access videos",
    });
  }

  next();
});
