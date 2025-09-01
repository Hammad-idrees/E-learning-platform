import React from "react";
import VideoCard from "./VideoCard";
import { FaVideo, FaPlus } from "react-icons/fa";

const VideoGrid = ({ videos, onEdit, onDelete, onPlay }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaVideo className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No videos found
        </h3>
        <p className="text-gray-500 mb-6">
          Upload your first video to get started
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FaPlus className="w-4 h-4 mr-2" />
          Upload Video
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          onEdit={onEdit}
          onDelete={onDelete}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
