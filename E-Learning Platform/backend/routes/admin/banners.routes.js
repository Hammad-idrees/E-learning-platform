import express from "express";
import { protect, admin } from "../../middleware/auth.middleware.js";
import uploadBannersMulter from "../../middleware/multer.banner.middleware.js";
import {
  uploadBanners,
  listBanners,
  deleteBanner,
  getPublicBanners,
} from "../../controllers/admin/banner.controller.js";

const router = express.Router();

// Admin
router.post(
  "/",
  protect,
  admin,
  uploadBannersMulter.array("images", 10),
  uploadBanners
);
router.get("/", protect, admin, listBanners);
router.delete("/:id", protect, admin, deleteBanner);

// Public
router.get("/public/list", getPublicBanners);

export default router;
