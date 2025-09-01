import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add virtual for admin view
enrollmentSchema.virtual("userDetails", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
  options: { select: "firstName lastName email" },
});

// Add virtual for course details
enrollmentSchema.virtual("courseDetails", {
  ref: "Course",
  localField: "course",
  foreignField: "_id",
  justOne: true,
  options: { select: "title description" },
});

export default mongoose.model("Enrollment", enrollmentSchema);
