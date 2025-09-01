import express from "express";
import {
  createTOC,
  getTOCsByCourse,
  updateTOC,
  deleteTOC,
} from "../controllers/Toc.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create TOC for a course
router.post("/", protect, admin, createTOC);

// Get TOCs for a specific course
router.get("/:courseId", protect, getTOCsByCourse);

// Update TOC
router.put("/:id", protect, admin, updateTOC);

// Delete TOC
router.delete("/:id", protect, admin, deleteTOC);

export default router;
