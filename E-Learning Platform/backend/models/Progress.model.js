import mongoose from "mongoose";

// models/Progress.model.js
const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Compound index for faster queries
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
progressSchema.index({ lastActivity: 1 });
export default mongoose.model("Progress", progressSchema);
