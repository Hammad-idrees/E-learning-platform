import React from "react";
import { Play, X } from "lucide-react";
import HlsPlayer from "../../admin/videos/HlsPlayer";

const VideoPlayerModal = ({ isOpen, video, onClose }) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Play className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
              {video.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Video Player */}
        <div className="p-4">
          <div className="bg-black rounded overflow-hidden">
            <HlsPlayer
              src={video.hlsUrl}
              autoPlay={true}
              onError={(error) => {
                console.error("Video playback error:", error);
              }}
              onReady={() => {
                console.log("Video ready for playback:", video.title);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
