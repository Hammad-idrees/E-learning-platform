import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getMyProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/me").get(protect, getMyProfile).put(protect, updateProfile);

router.put("/change-password", protect, changePassword);

export default router;
