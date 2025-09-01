import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { apiLimiter } from "./config/rateLimit.config.js";
import seedAdmin from "./utils/seedAdmin.js";
import userRoutes from "./routes/user.routes.js";
import adminCourseRoutes from "./routes/admin/courses.routes.js";
import AdminVideoRoutes from "./routes/admin/videos.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import bannerRoutes from "./routes/admin/banners.routes.js";
import { publishCourse } from "./controllers/admin/course.controller.js";
import tableOfContentRoutes from "./routes/Toc.routes.js";
import dashboardRoutes from "./routes/admin/dashboard.routes.js";
import path from "path";

import helmet from "helmet";
import corsOptions from "./config/cors.config.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:5173" })); // Allow only your frontend

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

//===================================--> Middlewares <--===============================================
// Middleware
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(apiLimiter); // Apply rate limiting to all routes
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);
//=====================================================================================================

//===================================--> Routes <--====================================================
// Routes
app.use("/api/auth", authRoutes);
// After other route imports
app.use("/api/users", userRoutes);
// Serve HLS files locally
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// After other middleware
app.use("/api/admin/courses", adminCourseRoutes);
app.use("/api/admin/courses", AdminVideoRoutes);
app.use("/api/admin/banners", bannerRoutes);
//get all courses for users
app.use("/api/courses", adminCourseRoutes);
//Enrollment routes
app.use("/api/enrollments", enrollmentRoutes);
// Public course routes
app.use("/api/videos", AdminVideoRoutes);
// Public banners endpoint
app.use("/api", bannerRoutes);
// Admin get All users and users by course
app.use("/api/admin", adminRoutes);
// Admin publish course
app.post("/api/admin/courses/:id/publish", publishCourse);
// Notification routes
app.use("/api/v1/notifications", notificationRoutes);
// Table of content routes
app.use("/api/toc", tableOfContentRoutes);
// Dashboard routes
app.use("/api/admin/dashboard", dashboardRoutes);

//=====================================================================================================

// Error handling middleware (should be last)
app.use(errorMiddleware);

// Start server
connectDB().then(async () => {
  // admin credentials loading on
  if (process.env.SEED_ADMIN === "true") {
    await seedAdmin();
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
