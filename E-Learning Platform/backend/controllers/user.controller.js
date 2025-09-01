import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import { hashPassword } from "../services/auth.service.js";
import { createNotification } from "../services/notification.service.js";
import logger from "../utils/logger.js";

// @desc    Get user profile
// @route   GET /api/users/me
export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    data: user,
  });
});

// @desc    Update profile
// @route   PUT /api/users/me
export const updateProfile = asyncHandler(async (req, res) => {
  const updates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    country: req.body.country,
  };

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");
  
  // Create notification in background
  createNotification(req.user._id, "profile_updated").catch((error) => {
    logger.error("Failed to create profile update notification:", error.message);
  });
  
  res.json({
    success: true,
    message: "Profile updated",
    data: user,
  });
});

// @desc    Change password
// @route   PUT /api/users/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // 1. Validate new password strength
  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // 2. Get user with password field
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // 3. Verify current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  // 4. Check if new password is different
  if (await user.comparePassword(newPassword)) {
    return res.status(400).json({
      success: false,
      message: "New password must be different from current password",
    });
  }

  // 5. Check if new password is not recent (optional)
  // Implement password history check here if needed

  // 6. Update password
  try {
    user.password = newPassword;
    await user.save(); // Triggers pre-save hook for hashing

    // 7. Invalidate old tokens (implementation example)
    // await TokenBlacklist.create({ token: req.token });
    
    // Create notification in background
    createNotification(req.user._id, "password_reset").catch((error) => {
      logger.error("Failed to create password reset notification:", error.message);
    });
    
    return res.json({
      success: true,
      message: "Password updated successfully",
      updatedAt: user.passwordChangedAt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password update failed",
      error: error.message,
    });
  }
});
