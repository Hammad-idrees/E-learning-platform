import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9_]{3,20}$/, // Alphanumeric + underscores
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
      match: /^\+?[0-9\s\-]{7,20}$/,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // New fields for password tracking
    passwordChangedAt: {
      type: Date,
      default: null, // Will be set on first manual change
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now, // Tracks both initial and subsequent changes
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    pendingEnrollments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" },
    ],
    completedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    notificationPreferences: {
      newCourses: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// Automatically update timestamps when password changes
// 🔐 Critical Password Hashing Middleware (Add this)
userSchema.pre("save", async function (next) {
  // Only hash if password was modified
  if (!this.isModified("password")) return next();

  try {
    // Hash with 12 rounds of salt
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    this.passwordChangedAt = Date.now();
    this.passwordUpdatedAt = Date.now();
    next();
  } catch (err) {
    next(err);
  }
});

// Helper method to check if password was changed after token issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// for comparing password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.plugin(mongoosePaginate);

// For removing the user details when admin delete the user account
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const userId = this._id;

    try {
      // Delete enrollments by this user
      await mongoose.model("Enrollment").deleteMany({ user: userId });

      // Delete comments by this user
      await mongoose.model("Comment").deleteMany({ user: userId });

      next();
    } catch (err) {
      next(err);
    }
  }
);
export default mongoose.model("User", userSchema);
