import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import logger from "../utils/logger.js";

// Security constants
const BCRYPT_SALT_ROUNDS = 12;
const DEFAULT_JWT_EXPIRES_IN = "1d"; // Shorter default for better security

// Password hashing with stronger salt
export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS); // Increased from 10 to 12
  } catch (error) {
    logger.error(`Password hashing failed: ${error.message}`);
    throw new Error("Password processing failed");
  }
};

// Secure password comparison
export const comparePassword = async (candidatePassword, userPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, userPassword);
  } catch (error) {
    logger.error(`Password comparison failed: ${error.message}`);
    return false; // Fail securely
  }
};

// Enhanced token generation
export const generateToken = (userId, isAdmin = false) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: userId,
      isAdmin, // Include admin status in payload
      iat: Math.floor(Date.now() / 1000), // Issued at timestamp
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_JWT_EXPIRES_IN,
      algorithm: "HS256", // Explicitly specify algorithm
    }
  );
};

// Robust unique fields check
export const checkUniqueFields = async ({ email, username }) => {
  const errors = {};

  try {
    // Case-insensitive checks
    const emailExists = await User.exists({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    const usernameExists = await User.exists({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });

    if (emailExists) errors.email = "Email already in use";
    if (usernameExists) errors.username = "Username taken";

    return Object.keys(errors).length > 0 ? errors : null;
  } catch (error) {
    logger.error(`Unique fields check failed: ${error.message}`);
    throw new Error("Registration validation failed");
  }
};

// New: Token verification
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
