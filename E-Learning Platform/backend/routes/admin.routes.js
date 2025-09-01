import express from "express";
import {
  getAllUsers,
  getUsersByCourse,
} from "../controllers/admin.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";
import { adminLogin } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import authValidation from "../validations/auth.validation.js";
import { login } from "../controllers/auth.controller.js";
import { deleteUser } from "../controllers/admin.controller.js";
const router = express.Router();

// Admin login route
router.post("/login", validate(authValidation.login), adminLogin);
// User management routes
router.get("/users", protect, admin, getAllUsers);
router.get("/courses/:courseId/users", protect, admin, getUsersByCourse);

// Add below your existing admin routes
router.delete("/users/:id", protect, admin, deleteUser);
export default router;
