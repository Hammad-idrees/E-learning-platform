import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Eye,
  Lock,
  Video,
  Target,
  BookOpen,
} from "lucide-react";

const VideoItem = ({ video, index, enrollmentStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  };

  const canAccessVideo = enrollmentStatus === "approved";

  // Get the first thumbnail URL
  const thumbnailUrl =
    video.thumbnails && video.thumbnails.length > 0
      ? video.thumbnails[0].url
      : null;

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200/30 dark:border-slate-700/50 overflow-hidden group">
      {/* Video Header */}
      <div className="p-4 border-b border-blue-200/30 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[#0F2C59] dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-slate-700/60 px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3 mr-2 text-blue-500" />
                  <span className="font-medium">
                    {formatDuration(video.duration)}
                  </span>
                </div>
                {!canAccessVideo && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full flex items-center border border-yellow-200 dark:border-yellow-700">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={toggleExpanded}
            className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isExpanded ? (
              <>
                <span className="mr-2 text-sm font-medium">Collapse</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span className="mr-2 text-sm font-medium">View Details</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video Content */}
      {isExpanded && (
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Video Thumbnail */}
            <div className="lg:w-1/3">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-600 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    thumbnailUrl ? "hidden" : "flex"
                  }`}
                  style={{ display: thumbnailUrl ? "none" : "flex" }}
                >
                  <Play className="w-16 h-16 text-blue-400 dark:text-blue-300" />
                </div>

                {/* Lock Overlay for Non-Enrolled Users */}
                {!canAccessVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/20 dark:bg-slate-800/20 rounded-full p-2 backdrop-blur-sm">
                      <Lock className="w-7 h-7 text-blue-500/80 drop-shadow-lg" />
                    </div>
                  </div>
                )}

                {/* Play Button Overlay for Enrolled Users */}
                {canAccessVideo && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-blue-500/50 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-5 h-5 text-white/80 ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Details */}
            <div className="lg:w-2/3">
              <div className="space-y-5">
                {/* Description */}
                {video.description && (
                  <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 border border-gray-200 dark:border-slate-600">
                    <h4 className="font-semibold text-[#0F2C59] dark:text-white mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                      Description
                    </h4>
                    <p className="text-[#64748B] dark:text-gray-300 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                )}

                {/* Video Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                    <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">
                        Duration: {formatDuration(video.duration)}
                      </span>
                    </div>
                  </div>
                  {video.views && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3">
                      <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                        <Eye className="w-4 h-4 mr-2" />
                        <span className="font-medium">{video.views} views</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Access Status */}
                {!canAccessVideo && (
                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-blue-800 dark:text-blue-200 text-sm font-semibold mb-2">
                          Video Preview Available
                        </p>
                        <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                          You can see the video details, but enrollment is
                          required to watch the full video.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Actions */}
                {canAccessVideo && (
                  <div className="pt-2">
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VideosList = ({ videos, enrollmentStatus }) => {
  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-200/30 dark:border-slate-700/50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-200/30 dark:border-slate-700/50">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0F2C59] dark:text-white">
              Course Videos
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {videos.length} video{videos.length !== 1 ? "s" : ""} • Preview
              all video details
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
            <Target className="w-3 h-3 mr-2" />
            <span className="font-medium">Enroll to watch full videos</span>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="p-6">
        <div className="space-y-4">
          {videos.map((video, index) => (
            <VideoItem
              key={video._id || index}
              video={video}
              index={index}
              enrollmentStatus={enrollmentStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosList;
