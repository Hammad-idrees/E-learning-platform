import multer from "multer";
import path from "path";

// Use memory storage so we can push to S3 directly
const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed (.jpg, .jpeg, .png, .webp)"),
      false
    );
  }
};

export const uploadThumbnail = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 4 * 1024 * 1024 },
});
