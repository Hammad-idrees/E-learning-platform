import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import Enrollment from "../models/Enrollment.model.js";
import Course from "../models/Course.model.js";

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;

  // Build query
  const query = { isAdmin: false };
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const options = {
    select: "-password -__v",
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
  };

  const users = await User.paginate(query, options);

  res.json({
    success: true,
    data: users,
  });
});

// @desc    Get users for a specific course (admin only)
// @route   GET /api/admin/courses/:courseId/users
export const getUsersByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { status = "approved" } = req.query;

  // Validate course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  // Build query
  const query = {
    course: courseId,
    status: { $in: status.split(",") },
  };

  const enrollments = await Enrollment.find(query)
    .populate({
      path: "user",
      select: "firstName lastName email username", // added username
    })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: enrollments.map((e) => ({
      _id: e.user._id,
      firstName: e.user.firstName,
      lastName: e.user.lastName,
      email: e.user.email,
      username: e.user.username, // will now be available
      enrollmentStatus: e.status,
      enrolledAt: e.createdAt,
    })),
  });
});

// @desc    Delete a user (admin only)
// @route   DELETE /api/admin/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Cannot delete an admin account",
    });
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "User deleted successfully",
  });
});
