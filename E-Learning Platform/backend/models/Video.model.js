import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
      maxlength: 500,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    duration: {
      type: Number, // in seconds
      default: 0,
    },
    sequence: {
      type: Number, // for manual ordering
      required: true,
    },
    // Absolute URL to S3/CDN HLS playlist (if uploaded to cloud)
    hlsUrl: {
      type: String,
      default: undefined,
    },
    // HLS Storage Path (single definition)
    hlsPath: {
      type: String,
      required: true,
      get: function (path) {
        // Changed to function for proper 'this' binding
        if (process.env.STORAGE_TYPE === "s3") {
          // Remove '/uploads/' prefix for S3
          return path.replace(/^\/?uploads\//, "streaming/");
        }
        return path;
      },
    },
    thumbnails: [
      {
        key: String, // Storage path
        url: String, // Full access URL
      },
    ],
    status: {
      type: String,
      enum: ["ready"],
      default: "ready",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable getters when converting to JSON
  }
);

export default mongoose.model("Video", videoSchema);
