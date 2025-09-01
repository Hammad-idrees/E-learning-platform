import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // uploads/banners/<file>
    url: { type: String, required: true }, // /uploads/banners/<file>
  },
  { _id: false }
);

const BannerSchema = new mongoose.Schema(
  {
    image: { type: ImageSchema, required: true },
    caption: { type: String, trim: true, maxlength: 300 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

BannerSchema.index({ createdAt: -1 });

const Banner = mongoose.model("Banner", BannerSchema);
export default Banner;
