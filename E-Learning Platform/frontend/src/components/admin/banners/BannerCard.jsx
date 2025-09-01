import React, { useState } from "react";
import { Trash2, Eye, ImageOff } from "lucide-react";

const resolveUrl = (relativeUrl) => {
  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(
    /\/?api\/?$/,
    ""
  );
  if (!relativeUrl) return "";
  if (/^https?:\/\//i.test(relativeUrl)) return relativeUrl;
  return `${base}${
    relativeUrl.startsWith("/") ? relativeUrl : "/" + relativeUrl
  }`;
};

const BannerCard = ({ banner, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const src = resolveUrl(banner.image?.url);

  const handleImageError = () => {
    setImageError(true);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group">
        {/* Image Container */}
        <div className="relative w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {src && !imageError ? (
            <>
              <img
                src={src}
                alt={banner.caption || "Banner"}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
              />

              {/* Preview Button */}
              <button
                onClick={handlePreview}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-60"
                title="Preview image"
              >
                <Eye className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageOff className="w-8 h-8 mb-1" />
              <span className="text-xs">No image available</span>
            </div>
          )}
        </div>

        {/* Content Footer */}
        <div className="p-4 flex items-center justify-between gap-3 border-t border-gray-100">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {banner.caption || "No caption provided"}
            </p>
            {banner.caption && (
              <p className="text-xs text-gray-500 mt-1">Banner Image</p>
            )}
          </div>

          <button
            onClick={() => onDelete(banner)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors duration-200 group/delete"
            title="Delete banner"
          >
            <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && src && !imageError && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={handleClosePreview}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={src}
              alt={banner.caption || "Banner preview"}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={handleClosePreview}
                className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {banner.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 text-white p-3 rounded-lg">
                <p className="text-sm">{banner.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BannerCard;
