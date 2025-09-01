import multer from "multer";
import path from "path";

// Memory storage to send directly to S3
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

const uploadBannersMulter = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

export default uploadBannersMulter;
