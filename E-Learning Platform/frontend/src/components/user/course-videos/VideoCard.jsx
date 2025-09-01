import React, { useState } from "react";
import { FaPlay, FaClock } from "react-icons/fa";

const VideoCard = ({ video, onClick, index }) => {
  const [imageError, setImageError] = useState(false);

  const getThumbnailUrl = (thumbRaw) => {
    if (!thumbRaw) return null;

    const thumb = String(thumbRaw);

    // If it's already a full URL, return as is
    if (thumb.startsWith("http://") || thumb.startsWith("https://")) {
      return thumb;
    }

    // Fallback to relative path
    return thumb;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const thumbnailUrl = getThumbnailUrl(video?.thumbnails?.[0]?.url);

  const handleImageError = () => {
    console.log("Thumbnail failed to load:", thumbnailUrl);
    setImageError(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
      {/* Video Thumbnail - Bigger size */}
      <div
        className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden"
        onClick={() => onClick(video)}
      >
        {/* Thumbnail Image */}
        {thumbnailUrl && !imageError ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xl">{index + 1}</span>
            </div>
            <p className="text-sm">Video {index + 1}</p>
          </div>
        )}

        {/* Play Button Overlay - Bigger and more prominent */}
        <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <div className="w-20 h-20 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <FaPlay className="w-8 h-8 text-gray-800 ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        {video?.duration && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded-md font-medium flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            {formatDuration(video.duration)}
          </div>
        )}

        {/* Sequence Badge */}
        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-medium">
          {video.sequence || 0}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        {/* Title with Browser Tooltip */}
        <div className="relative mb-2">
          <h3
            className="font-semibold text-gray-900 dark:text-white text-base line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
            title={video.title}
          >
            {video.title}
          </h3>
        </div>

        {video.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {new Date(video.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(video);
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlay className="w-3 h-3" />
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
