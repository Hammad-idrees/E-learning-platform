import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/User.model.js";
import Course from "../../models/Course.model.js";
import Video from "../../models/Video.model.js";
import Enrollment from "../../models/Enrollment.model.js";
import LoginActivity from "../../models/LoginActivity.model.js";

// @desc    Get dashboard overview statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin only)
export const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    // Get total counts
    const [
      totalUsers,
      totalCourses,
      totalVideos,
      approvedEnrollments,
      rejectedEnrollments,
      pendingEnrollments,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Video.countDocuments(),
      Enrollment.countDocuments({ status: "approved" }),
      Enrollment.countDocuments({ status: "rejected" }),
      Enrollment.countDocuments({ status: "pending" }),
    ]);

    const stats = {
      totalUsers,
      totalCourses,
      totalVideos,
      enrollments: {
        approved: approvedEnrollments,
        rejected: rejectedEnrollments,
        pending: pendingEnrollments,
        total: approvedEnrollments + rejectedEnrollments + pendingEnrollments,
      },
    };

    res.json({
      success: true,
      data: stats,
      message: "Dashboard statistics retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard statistics",
      error: error.message,
    });
  }
});

// @desc    Get course-specific statistics
// @route   GET /api/admin/dashboard/course-stats
// @access  Private (Admin only)
export const getCourseStats = asyncHandler(async (req, res) => {
  try {
    // Get all courses with their related data
    const courses = await Course.find({})
      .populate("videos", "_id")
      .populate("createdBy", "firstName lastName")
      .lean();

    const courseStats = await Promise.all(
      courses.map(async (course) => {
        // Get enrollment counts for this course
        const [approvedEnrollments, rejectedEnrollments, pendingEnrollments] =
          await Promise.all([
            Enrollment.countDocuments({
              course: course._id,
              status: "approved",
            }),
            Enrollment.countDocuments({
              course: course._id,
              status: "rejected",
            }),
            Enrollment.countDocuments({
              course: course._id,
              status: "pending",
            }),
          ]);

        return {
          courseId: course._id,
          courseTitle: course.title,
          courseDescription: course.description,
          isPublished: course.isPublished,
          totalVideos: course.videos ? course.videos.length : 0,
          totalUsers:
            approvedEnrollments + rejectedEnrollments + pendingEnrollments,
          enrollmentBreakdown: {
            approved: approvedEnrollments,
            rejected: rejectedEnrollments,
            pending: pendingEnrollments,
            total:
              approvedEnrollments + rejectedEnrollments + pendingEnrollments,
          },
          createdBy: course.createdBy
            ? `${course.createdBy.firstName} ${course.createdBy.lastName}`
            : "Unknown",
          createdAt: course.createdAt,
        };
      })
    );

    res.json({
      success: true,
      data: courseStats,
      message: "Course statistics retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve course statistics",
      error: error.message,
    });
  }
});

// @desc    Get enrollment statistics breakdown
// @route   GET /api/admin/dashboard/enrollment-stats
// @access  Private (Admin only)
export const getEnrollmentStats = asyncHandler(async (req, res) => {
  try {
    // Get enrollment counts by status
    const [approved, rejected, pending] = await Promise.all([
      Enrollment.countDocuments({ status: "approved" }),
      Enrollment.countDocuments({ status: "rejected" }),
      Enrollment.countDocuments({ status: "pending" }),
    ]);

    // Get recent enrollments (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEnrollments = await Enrollment.find({
      createdAt: { $gte: sevenDaysAgo },
    })
      .populate("user", "firstName lastName email")
      .populate("course", "title")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const stats = {
      total: approved + rejected + pending,
      approved,
      rejected,
      pending,
      recentEnrollments: recentEnrollments.map((enrollment) => ({
        id: enrollment._id,
        status: enrollment.status,
        createdAt: enrollment.createdAt,
        user: enrollment.user
          ? `${enrollment.user.firstName} ${enrollment.user.lastName}`
          : "Unknown User",
        userEmail: enrollment.user ? enrollment.user.email : "",
        course: enrollment.course ? enrollment.course.title : "Unknown Course",
      })),
    };

    res.json({
      success: true,
      data: stats,
      message: "Enrollment statistics retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve enrollment statistics",
      error: error.message,
    });
  }
});

// @desc    Get comprehensive dashboard data (all stats in one call)
// @route   GET /api/admin/dashboard/overview
// @access  Private (Admin only)
export const getDashboardOverview = asyncHandler(async (req, res) => {
  try {
    // Get all statistics in parallel for better performance
    const [
      totalUsers,
      totalCourses,
      totalVideos,
      approvedEnrollments,
      rejectedEnrollments,
      pendingEnrollments,
      courses,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Video.countDocuments(),
      Enrollment.countDocuments({ status: "approved" }),
      Enrollment.countDocuments({ status: "rejected" }),
      Enrollment.countDocuments({ status: "pending" }),
      Course.find({}).populate("videos", "_id").lean(),
    ]);

    // Get course-specific stats
    const courseStats = await Promise.all(
      courses.map(async (course) => {
        const [approved, rejected, pending] = await Promise.all([
          Enrollment.countDocuments({ course: course._id, status: "approved" }),
          Enrollment.countDocuments({ course: course._id, status: "rejected" }),
          Enrollment.countDocuments({ course: course._id, status: "pending" }),
        ]);

        return {
          courseId: course._id,
          courseTitle: course.title,
          totalVideos: course.videos ? course.videos.length : 0,
          totalUsers: approved + rejected + pending,
          enrollmentBreakdown: { approved, rejected, pending },
        };
      })
    );

    const overview = {
      summary: {
        totalUsers,
        totalCourses,
        totalVideos,
        enrollments: {
          approved: approvedEnrollments,
          rejected: rejectedEnrollments,
          pending: pendingEnrollments,
          total: approvedEnrollments + rejectedEnrollments + pendingEnrollments,
        },
      },
      courseStats,
      lastUpdated: new Date(),
    };

    res.json({
      success: true,
      data: overview,
      message: "Dashboard overview retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard overview",
      error: error.message,
    });
  }
});

// @desc    Get login activity aggregated by day for last 30 days
// @route   GET /api/admin/dashboard/login-activity
// @access  Private (Admin only)
export const getLoginActivity = asyncHandler(async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);

    const pipeline = [
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          logins: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ];

    const results = await LoginActivity.aggregate(pipeline);

    // Build full 30-day series with zeros where missing
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      const found = results.find(
        (r) => r._id.year === y && r._id.month === m && r._id.day === d
      );

      days.push({
        date: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        logins: found ? found.logins : 0,
        dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }

    res.json({ success: true, data: days });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch login activity",
      error: error.message,
    });
  }
});
