import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCoursesForAdmin } from "../../services/courses";
import {
  deleteVideo,
  getVideoStreamUrl,
  updateVideoDetails,
} from "../../services/videos";
import axios from "../../utils/axios";
import VideoGrid from "../../components/admin/videos/VideoGrid";
import VideoEditModal from "../../components/admin/videos/VideoEditModal";
import HlsPlayer from "../../components/admin/videos/HlsPlayer";
import toast from "react-hot-toast";
import { Video, Play, ArrowLeft, X } from "lucide-react";

const VideoManager = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get("courseId");

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Player state
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerSrc, setPlayerSrc] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const courseData = await getCoursesForAdmin();
      const foundCourse = courseData.data.find((c) => c._id === courseId);
      setCourse(foundCourse);

      const res = await axios.get(`/courses/${courseId}/videos`);
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setVideos(list);
    } catch {
      toast.error("Failed to load video data");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      loadData();
    }
  }, [courseId, loadData]);

  const handleEdit = (video) => {
    setEditingVideo(video);
    setShowEditModal(true);
  };

  const handleDelete = async (video) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await deleteVideo(video._id);
      toast.success("Video deleted successfully");
      loadData();
    } catch {
      toast.error("Failed to delete video");
    }
  };

  const handlePlay = async (video) => {
    try {
      let streamUrl = null;
      const s3HlsUrl = video.hlsUrl;

      if (s3HlsUrl && /^https?:\/\//i.test(s3HlsUrl)) {
        streamUrl = s3HlsUrl;
      } else {
        streamUrl = await getVideoStreamUrl(video._id);
      }

      if (streamUrl && /^https?:\/\//i.test(streamUrl)) {
        setPlayerSrc(streamUrl);
        setPlayingVideo(video);
        setPlayerOpen(true);
      } else {
        toast.error("Video not available for streaming");
      }
    } catch (error) {
      console.error("Failed to get video stream:", error);
      toast.error("Failed to load video");
    }
  };

  const handleSaveEdit = async (formData) => {
    try {
      await updateVideoDetails(editingVideo._id, formData);
      toast.success("Video updated successfully");
      setShowEditModal(false);
      setEditingVideo(null);
      loadData();
    } catch {
      toast.error("Failed to update video");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading videos...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Course not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Simple Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin-dashboard/courses")}
          className="text-blue-600 hover:underline mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Video className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Video Manager</h1>
        </div>

        <p className="text-gray-600">Course: {course.title}</p>
      </div>

      {/* Videos Count */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Videos ({videos.length})</h2>
      </div>

      {/* Video Grid */}
      <VideoGrid
        videos={videos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPlay={handlePlay}
      />

      {/* Edit Modal */}
      <VideoEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingVideo(null);
        }}
        onSave={handleSaveEdit}
        video={editingVideo}
        onThumbUpdated={loadData}
      />

      {/* Video Player Modal */}
      {playerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-lg">
                  {playingVideo?.title || "Video Preview"}
                </h4>
              </div>
              <button
                onClick={() => {
                  setPlayerOpen(false);
                  setPlayerSrc("");
                  setPlayingVideo(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-4">
              <div className="bg-black rounded overflow-hidden">
                <HlsPlayer
                  src={playerSrc}
                  autoPlay={true}
                  onError={(error) => {
                    console.error("Video playback error:", error);
                    toast.error("Failed to load video");
                  }}
                  onReady={() => {
                    console.log("Video ready for playback");
                  }}
                />
              </div>

              {/* Simple Video Info */}
              {playingVideo && (
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">
                      Duration
                    </div>
                    <div className="text-gray-600">
                      {playingVideo.duration
                        ? `${Math.floor(playingVideo.duration / 60)}:${(
                            playingVideo.duration % 60
                          )
                            .toString()
                            .padStart(2, "0")}`
                        : "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">
                      Status
                    </div>
                    <div className="text-gray-600 capitalize">
                      {playingVideo.status}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">
                      Created
                    </div>
                    <div className="text-gray-600">
                      {new Date(playingVideo.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoManager;
