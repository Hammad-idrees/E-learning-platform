import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../services/auth.service.js";
import User from "../models/User.model.js";
import LoginActivity from "../models/LoginActivity.model.js";

// @desc    Register new user
// @route   POST /api/auth/signup
export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password, country, phone } =
    req.body;

  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // Create user (let model handle hashing)
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password, // Will be hashed by pre-save hook
    country,
    phone: phone || null,
  });

  // Generate token with user role
  const token = generateToken(user._id, user.isAdmin);

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      country: user.country,
      isAdmin: user.isAdmin,
      token,
    },
  });
});

// @desc    Authenticate user
// @route   POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password
  const user = await User.findOne({ email }).select("+password");

  // Verify credentials
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Generate token with role
  const token = generateToken(user._id, user.isAdmin);

  // Record login activity (non-blocking)
  try {
    await LoginActivity.create({
      user: user._id,
      isAdmin: !!user.isAdmin,
      createdAt: new Date(),
    });
  } catch (e) {
    // Intentionally ignore logging errors to not block login
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    },
  });
});

// @desc    Authenticate admin
// @route   POST /api/auth/admin/login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find admin user
  const admin = await User.findOne({ email, isAdmin: true }).select(
    "+password"
  );

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "No admin account found with this email",
    });
  }

  // Verify password
  if (!(await admin.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Generate admin token
  const token = generateToken(admin._id, true);

  // Record admin login activity (non-blocking)
  try {
    await LoginActivity.create({
      user: admin._id,
      isAdmin: true,
      createdAt: new Date(),
    });
  } catch (e) {
    // Ignore logging failures
  }

  res.json({
    success: true,
    data: {
      _id: admin._id,
      email: admin.email,
      isAdmin: true,
      token,
    },
  });
});
