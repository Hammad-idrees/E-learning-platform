import React, { useState, useEffect } from "react";
import { FaTimes, FaImage, FaBook, FaFileAlt } from "react-icons/fa";

const CourseFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  // Removed unused thumbnailPreview state

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setThumbnail(null);
      // Removed setThumbnailPreview usage
    } else {
      setTitle("");
      setDescription("");
      setThumbnail(null);
      // Removed setThumbnailPreview usage
    }
  }, [initialData, open]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      // Removed setThumbnailPreview usage
      reader.readAsDataURL(file);
    } else {
      // Removed setThumbnailPreview usage
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, thumbnail });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#2563eb]/5 to-[#2563eb]/10 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2563eb]/10 rounded-lg">
              <FaBook className="w-5 h-5 text-[#2563eb]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0f172a]">
              {initialData ? "Edit Course" : "Create New Course"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5 text-[#64748b]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-[#0f172a]">
              <FaFileAlt className="w-4 h-4 text-[#2563eb]" />
              <span>Course Title</span>
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 text-[#0f172a] placeholder-[#64748b]"
              placeholder="Enter course title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-[#0f172a]">
              <FaFileAlt className="w-4 h-4 text-[#2563eb]" />
              <span>Description</span>
            </label>
            <textarea
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 resize-none text-[#0f172a] placeholder-[#64748b]"
              rows={7}
              placeholder="Describe your course..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <p className="text-xs text-[#64748b]">
              {description.length}/1000 characters
            </p>
          </div>

          {/* Thumbnail Field */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-[#0f172a]">
              <FaImage className="w-4 h-4 text-[#2563eb]" />
              <span>Course Thumbnail</span>
            </label>

            {/* Selected File Display */}
            {thumbnail && (
              <div className="flex items-center justify-between p-3 bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#2563eb]/10 rounded-lg">
                    <FaImage className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#0f172a] truncate">
                      {thumbnail.name}
                    </p>
                    <p className="text-xs text-[#64748b]">
                      {(thumbnail.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setThumbnail(null);
                  }}
                  className="p-1.5 bg-[#ef4444] text-white rounded-full hover:bg-[#ef4444]/90 transition-colors flex-shrink-0"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleThumbnailChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex items-center justify-center w-full h-16 sm:h-18 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-all duration-200 cursor-pointer group"
              >
                <div className="text-center px-4">
                  <FaImage className="w-5 h-5 text-gray-400 group-hover:text-[#2563eb] mx-auto mb-1.5 transition-colors" />
                  <p className="text-sm text-[#64748b] group-hover:text-[#2563eb] font-medium">
                    Click to upload thumbnail
                  </p>
                  <p className="text-xs text-[#64748b] hidden sm:block">
                    JPG, JPEG, PNG, WEBP up to 4MB
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-[#64748b] rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#2563eb]/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {initialData ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;
