import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";

// Middleware to protect routes - verify JWT 
// and attach user to request object
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Middleware to check admin status
export const admin = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized as admin");
  }
  next();
});

// Middleware to check if password needs change
export const checkPasswordChange = asyncHandler(async (req, res, next) => {
  if (req.user.forcePasswordChange) {
    res.status(403);
    throw new Error("Password change required");
  }
  next();
});
