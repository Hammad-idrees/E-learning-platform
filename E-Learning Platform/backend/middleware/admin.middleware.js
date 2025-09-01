import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";

export const requireAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user?.isAdmin) {
    return res.status(403).json({
      message: "Admin privileges required",
    });
  }

  next();
});
