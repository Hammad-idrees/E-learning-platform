import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { uploadVideoThumbnail } from "../../../services/videos";

const VideoEditModal = ({ isOpen, onClose, onSave, video, onThumbUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [thumbUploading, setThumbUploading] = useState(false);
  const [thumbPreview, setThumbPreview] = useState(null);

  const resolveUrl = (u) => {
    if (!u) return null;
    if (/^https?:\/\//i.test(u)) return u;
    const base = (import.meta.env.VITE_API_BASE_URL || "").replace(
      /\/?api\/?$/,
      ""
    );
    return `${base}${u.startsWith("/") ? u : "/" + u}`;
  };

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || "",
        description: video.description || "",
      });
      const firstThumb = video?.thumbnails?.[0]?.url || null;
      setThumbPreview(resolveUrl(firstThumb));
    }
  }, [video]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    onSave(formData);
  };

  const handleUploadThumb = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setThumbUploading(true);
      const res = await uploadVideoThumbnail(video._id, file);
      const url = resolveUrl(res?.data?.thumbnails?.[0]?.url);
      if (url) setThumbPreview(url);
      toast.success("Thumbnail updated");
      if (typeof onThumbUpdated === "function") onThumbUpdated();
    } catch (err) {
      toast.error(err?.message || "Failed to upload thumbnail");
    } finally {
      setThumbUploading(false);
      e.target.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Video</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Thumbnail preview and upload only in upload flow per request; remove auto-generate button here */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail
            </label>
            {thumbPreview ? (
              <img
                src={thumbPreview}
                alt="Thumbnail"
                className="w-full h-40 object-cover rounded mb-2 border"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded mb-2 flex items-center justify-center text-gray-500">
                No thumbnail
              </div>
            )}
            <div className="flex gap-3">
              <label className="px-3 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-300 text-sm">
                {thumbUploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadThumb}
                  disabled={thumbUploading}
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoEditModal;
