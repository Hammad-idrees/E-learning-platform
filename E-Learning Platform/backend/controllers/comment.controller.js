// controllers/comment.controller.js
import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/Comment.model.js";
import Course from "../models/Course.model.js";

// @desc    Add comment to course
// @route   POST /api/courses/:id/comments
export const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  const comment = await Comment.create({
    content,
    course: course._id,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc    Get course comments
// @route   GET /api/courses/:id/comments
export const getComments = asyncHandler(async (req, res) => {
  const filter = { course: req.params.id };

  // Only show non-deleted comments to regular users
  if (!req.user.isAdmin) {
    filter.isDeleted = false;
  }

  const comments = await Comment.find(filter)
    .populate("user", "firstName lastName avatar")
    .sort("-createdAt");

  res.json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  const isOwner = comment.user.toString() === req.user._id.toString();
  const isAdmin = req.user.isAdmin === true;

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this comment",
    });
  }

  await comment.deleteOne(); // 🔥 Hard delete from MongoDB

  res.json({
    success: true,
    message: "Comment permanently deleted",
  });
});
