import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // Using memory storage

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".mp4", ".mov", ".avi"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB max
});
