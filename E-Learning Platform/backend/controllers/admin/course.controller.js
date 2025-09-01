import asyncHandler from "../../utils/asyncHandler.js";
import Course from "../../models/Course.model.js";
import Video from "../../models/Video.model.js";
import Enrollment from "../../models/Enrollment.model.js";
import {
  createNotification,
  notifyNewCourse,
} from "../../services/notification.service.js";
import logger from "../../utils/logger.js";
import Progress from "../../models/Progress.model.js";
import Notification from "../../models/Notification.model.js";
import Comment from "../../models/Comment.model.js";
// @desc    Create a new course
// @route   POST /api/admin/courses
import path from "path";
import {
  uploadBufferToS3,
  deleteS3Object,
  deleteS3Prefix,
} from "../../services/s3Uploader.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  const courseData = {
    title,
    description,
    createdBy: req.user._id,
  };

  /**
   * LOCAL STORAGE: Save file path & URL
   *
   * FUTURE (Cloud):
   *   - Use req.file.buffer with S3/Cloudinary SDK
   *   - Save returned `url` & `key` instead of local path
   */
  if (req.file) {
    const ext = path.extname(req.file.originalname).toLowerCase() || ".jpg";
    // Align create path under thumbnails/{courseId}/
    const tempId = new Date().getTime();
    const key = `thumbnails/${tempId}/${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;
    const uploaded = await uploadBufferToS3({
      buffer: req.file.buffer,
      key,
      contentType: req.file.mimetype || "image/jpeg",
    });

    // Generate CloudFront URL instead of S3 URL
    const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
    const cloudfrontUrl = `${cloudfrontBase}/thumbnails/${tempId}/${path.basename(
      key
    )}`;

    courseData.thumbnail = { key, url: cloudfrontUrl };
  }

  const course = await Course.create(courseData);

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc    Update course details (title, description, thumbnail)
// @route   PUT /api/admin/courses/:id
export const updateCourse = asyncHandler(async (req, res) => {
  const updateData = {
    title: req.body.title,
    description: req.body.description,
  };

  // Handle thumbnail update if a new file is uploaded
  if (req.file) {
    const ext = path.extname(req.file.originalname).toLowerCase() || ".jpg";
    const key = `thumbnails/${req.params.id}/${Date.now()}${ext}`;
    const uploaded = await uploadBufferToS3({
      buffer: req.file.buffer,
      key,
      contentType: req.file.mimetype || "image/jpeg",
    });

    // Generate CloudFront URL instead of S3 URL
    const cloudfrontBase = process.env.CLOUDFRONT_BASE_URL;
    const cloudfrontUrl = `${cloudfrontBase}/thumbnails/${
      req.params.id
    }/${path.basename(key)}`;

    updateData.thumbnail = { key, url: cloudfrontUrl };
  }

  const course = await Course.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.json({
    success: true,
    data: course,
  });
});

// @desc    Get all courses (for admin)
// @route   GET /api/admin/courses
export const getCoursesForAdmin = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .populate("createdBy", "firstName lastName email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// Get all courses (for users)
// @desc    Get all published courses (for users)
// @route   GET /api/courses
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ isPublished: true })
    .select("title description thumbnail tableOfContent createdAt")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// Add to getCourseDetails controller:
export const getCourseDetails = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate(
    "createdBy",
    "firstName lastName"
  );

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  // Clean up stale video references
  if (course.videos && course.videos.length > 0) {
    const validVideoIds = [];
    for (const videoId of course.videos) {
      const videoExists = await Video.exists({ _id: videoId });
      if (videoExists) {
        validVideoIds.push(videoId);
      }
    }

    // Update course if we found stale references
    if (validVideoIds.length !== course.videos.length) {
      await Course.findByIdAndUpdate(course._id, {
        videos: validVideoIds,
      });
      course.videos = validVideoIds;
    }
  }

  // Check enrollment for video access UI
  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: req.params.id,
  });

  // get the comments count for the course when user fetch the details
  const commentsCount = await Comment.countDocuments({
    course: req.params.id,
    isDeleted: false,
  });

  res.json({
    success: true,
    data: {
      ...course.toObject(),
      commentsCount,
      canAccessVideos:
        enrollment?.status === "approved" ||
        course.createdBy._id.equals(req.user._id),
    },
  });
});
// @desc    Get course videos
// @route   GET /api/courses/:id/videos
export const getCourseVideos = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate(
      "videos",
      "title duration sequence status thumbnails createdAt hlsUrl hlsPath"
    )
    .select("videos");

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  // Clean up stale video references and filter out null populated videos
  const validVideos = course.videos.filter((video) => video !== null);

  // Update course if we found stale references
  if (validVideos.length !== course.videos.length) {
    const validVideoIds = validVideos.map((video) => video._id);
    await Course.findByIdAndUpdate(course._id, {
      videos: validVideoIds,
    });
  }

  res.json({
    success: true,
    data: validVideos,
  });
});

// @desc    Publish a course
export const publishCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      isPublished: true,
      publishedAt: new Date(), // Add publication timestamp
    },
    { new: true }
  );

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  // Non-blocking notification
  notifyNewCourse(course._id)
    .then((result) => logger.info(`Notified ${result.notifiedUsers} users`))
    .catch((err) => logger.error("Notification error", err));

  res.json({
    success: true,
    data: course,
    message: "Course is being published. Notifications are being sent.",
  });
});

export const completeCourse = async (req, res) => {
  const { courseId } = req.params;

  // 1. Verify all requirements are met
  const isComplete = await checkCourseRequirements(req.user._id, courseId);

  if (isComplete) {
    // 2. Mark as complete
    await markCourseComplete(req.user._id, courseId);
    res.json({ success: true, completed: true });
  } else {
    res.json({ success: true, completed: false });
  }
};

// @desc    Delete a course
// @route   DELETE /api/admin/courses/:id
export const deleteCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  // 1. Verify course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  // 2. Check if user is course creator or admin
  if (!course.createdBy.equals(req.user._id) && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this course",
    });
  }

  // 3. Delete S3 artifacts (course thumbnail and all video HLS + thumbnails)
  try {
    if (course.thumbnail?.key) {
      await deleteS3Object(course.thumbnail.key);
    }
  } catch (e) {}
  try {
    await deleteS3Prefix(`videos/${courseId}/`);
  } catch (e) {}
  try {
    await deleteS3Prefix(`thumbnails/${courseId}/`);
  } catch (e) {}

  // 4. Perform cascading deletion (transactions recommended)
  await Promise.all([
    // Delete related videos
    Video.deleteMany({ course: courseId }),

    // Remove enrollments
    Enrollment.deleteMany({ course: courseId }),

    // Delete notifications
    Notification.deleteMany({ relatedCourse: courseId }),
  ]);

  // 5. Finally delete the course
  await Course.findByIdAndDelete(courseId);
  // 6. Notify user of course removal in background
  createNotification(req.user._id, "course_removal", {
    courseId: courseId,
    courseName: course.title,
  }).catch((error) => {
    logger.error(
      "Failed to create course removal notification:",
      error.message
    );
  });

  res.json({
    success: true,
    message: "Course and all related data deleted successfully",
  });
});

// Utility function to clean up stale video references in all courses
export const cleanupStaleVideoReferences = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({});
    let totalCleaned = 0;
    let totalStaleReferences = 0;

    for (const course of courses) {
      if (course.videos && course.videos.length > 0) {
        const validVideoIds = [];
        for (const videoId of course.videos) {
          const videoExists = await Video.exists({ _id: videoId });
          if (videoExists) {
            validVideoIds.push(videoId);
          } else {
            totalStaleReferences++;
          }
        }

        // Update course if we found stale references
        if (validVideoIds.length !== course.videos.length) {
          await Course.findByIdAndUpdate(course._id, {
            videos: validVideoIds,
          });
          totalCleaned++;
        }
      }
    }

    res.json({
      success: true,
      message: `Cleanup completed. ${totalCleaned} courses cleaned, ${totalStaleReferences} stale references removed.`,
      data: {
        coursesCleaned: totalCleaned,
        staleReferencesRemoved: totalStaleReferences,
      },
    });
  } catch (error) {
    logger.error("Error during cleanup:", error);
    res.status(500).json({
      success: false,
      message: "Error during cleanup process",
    });
  }
});
