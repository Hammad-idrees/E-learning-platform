import mongoose from "mongoose";

const tableOfContentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Assuming you already have a Course model
    required: true,
  },
  content: {
    type: String, // HTML or plain text
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("TableOfContent", tableOfContentSchema);
