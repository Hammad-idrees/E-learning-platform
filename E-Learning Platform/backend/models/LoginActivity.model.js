import mongoose from "mongoose";

const LoginActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

LoginActivitySchema.index({ createdAt: 1 });

const LoginActivity = mongoose.model("LoginActivity", LoginActivitySchema);

export default LoginActivity;
