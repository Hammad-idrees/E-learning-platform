import React, { useState } from "react";
import { FaPlay, FaEdit, FaTrash, FaImage } from "react-icons/fa";

const VideoCard = ({ video, onEdit, onDelete, onPlay }) => {
  const [imageError, setImageError] = useState(false);

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = () => {
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getStatusIcon = () => {
    return "✓";
  };

  // Get thumbnail URL - prefer the first thumbnail
  const thumbnailUrl = video.thumbnails?.[0]?.url || null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Video Thumbnail */}
      <div className="relative h-48 bg-gray-100">
        {thumbnailUrl && !imageError ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <FaImage className="w-12 h-12 mb-2" />
            <span className="text-sm">No thumbnail</span>
          </div>
        )}

        {/* Play Button Overlay */}
        {onPlay && (
          <button
            onClick={() => onPlay(video)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <div className="w-16 h-16 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <FaPlay className="w-6 h-6 text-gray-800 ml-1" />
            </div>
          </button>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md font-medium">
          {formatDuration(video.duration)}
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor()}`}
          >
            <span className="mr-1">{getStatusIcon()}</span>
            {video.status}
          </span>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>

        {video.description && (
          <p className="text-gray-600 text-xs line-clamp-2 mb-3">
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="bg-gray-100 px-2 py-1 rounded">
            Sequence: {video.sequence || 0}
          </span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* Play Button */}
          {onPlay && (
            <button
              onClick={() => onPlay(video)}
              className="flex-1 px-3 py-2 text-xs rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-sm"
            >
              <FaPlay className="w-3 h-3" />
              Play
            </button>
          )}

          <button
            onClick={() => onEdit?.(video)}
            className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200 hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-1 font-medium"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </button>

          <button
            onClick={() => onDelete?.(video)}
            className="flex-1 px-3 py-2 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200 hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-1 font-medium"
          >
            <FaTrash className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
