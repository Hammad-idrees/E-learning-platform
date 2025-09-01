import React, { useEffect, useState, useRef } from "react";
import { getCoursesForAdmin } from "../../services/courses";
import {
  uploadVideo,
  getVideoStatus,
  deleteVideo,
  uploadVideoThumbnail,
} from "../../services/videos";
import VideoUploadForm from "../../components/admin/videos/VideoUploadForm";
import VideoList from "../../components/admin/videos/VideoList";
import axios from "../../utils/axios";
import HlsPlayer from "../../components/admin/videos/HlsPlayer";
import {
  Video,
  Play,
  Upload,
  AlertCircle,
  Loader2,
  X,
  TrendingUp,
  FileVideo,
} from "lucide-react";

const POLL_INTERVAL_MS = 5000;
const MAX_POLL_MS = 5 * 60 * 1000; // 5 minutes

const Videos = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [videos, setVideos] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerSrc, setPlayerSrc] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);
  const pollTimer = useRef(null);
  const pollStart = useRef(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      setError(null);
      try {
        const data = await getCoursesForAdmin();
        setCourses(Array.isArray(data.data) ? data.data : []);
      } catch {
        setError("Failed to fetch courses.");
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, []);

  const fetchCourseVideos = async (courseId) => {
    if (!courseId) return;
    setLoadingVideos(true);
    setError(null);
    try {
      const res = await axios.get(`/courses/${courseId}/videos`);
      const payload = res.data;
      const list = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
        ? payload
        : [];
      setVideos(list);
    } catch {
      setVideos([]);
      setError("Failed to fetch course videos.");
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleSelectCourse = (e) => {
    const id = e.target.value;
    setSelectedCourse(id);
    setVideos([]);
    if (id) fetchCourseVideos(id);
  };

  const startPollingStatus = (courseId, videoId) => {
    pollStart.current = Date.now();
    if (pollTimer.current) clearInterval(pollTimer.current);
    pollTimer.current = setInterval(async () => {
      try {
        const statusRes = await getVideoStatus(courseId, videoId);
        const status = statusRes?.data?.status || statusRes?.status;
        if (status === "ready") {
          clearInterval(pollTimer.current);
          pollTimer.current = null;
          await fetchCourseVideos(courseId);
        } else if (Date.now() - pollStart.current > MAX_POLL_MS) {
          clearInterval(pollTimer.current);
          pollTimer.current = null;
          await fetchCourseVideos(courseId);
        }
      } catch {
        // ignore transient errors and keep polling until timeout
      }
    }, POLL_INTERVAL_MS);
  };

  const handleUpload = async (courseId, formData, thumbnailFile) => {
    setUploading(true);
    setError(null);
    try {
      const res = await uploadVideo(courseId, formData);
      const newId = res?.data?.id;
      // If admin provided a thumbnail, upload it immediately
      if (newId && thumbnailFile) {
        try {
          await uploadVideoThumbnail(newId, thumbnailFile);
        } catch (err) {
          console.warn("Thumbnail upload failed", err);
        }
      }
      await fetchCourseVideos(courseId);
      if (newId) startPollingStatus(courseId, newId);
    } catch {
      setError("Failed to upload video.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (video) => {
    if (!window.confirm("Delete this video? This cannot be undone.")) return;
    try {
      await deleteVideo(video._id);
      await fetchCourseVideos(selectedCourse);
    } catch {
      setError("Failed to delete video.");
    }
  };

  const selectedCourseTitle =
    courses.find((c) => c._id === selectedCourse)?.title || "";

  const handlePlay = (video) => {
    setCurrentVideo(video);
    // Prefer absolute S3 URL if available
    const s3 = video.hlsUrl;
    if (s3 && /^https?:\/\//i.test(s3)) {
      setPlayerSrc(s3);
      setPlayerOpen(true);
      return;
    }
    // Fallback to regular stream route
    const base = (import.meta.env.VITE_API_BASE_URL || "").replace(
      /\/?api\/?$/,
      ""
    );
    const src = `${base}/api/admin/videos/${video._id}/stream`;
    setPlayerSrc(src);
    setPlayerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#1d4ed8] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                    Video Uploader
                  </h1>
                  <p className="text-blue-100 text-lg font-medium">
                    Upload, manage, and preview course videos with ease
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <FileVideo className="w-6 h-6 text-white" />
                    <div className="text-white">
                      <div className="text-2xl font-bold">{videos.length}</div>
                      <div className="text-blue-200 text-sm font-medium">
                        Total Videos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Selector */}
          <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-lg font-semibold text-[#0f172a] flex items-center gap-2">
                <Play className="w-5 h-5 text-[#2563eb]" />
                Select Course:
              </label>
              <select
                className="flex-1 max-w-md border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 bg-white"
                value={selectedCourse}
                onChange={handleSelectCourse}
                disabled={loadingCourses}
              >
                <option value="">-- Select a course --</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
              {loadingCourses && (
                <div className="flex items-center gap-2 text-[#2563eb]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">
                    Loading courses...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-[#fef2f2] to-[#fee2e2] border-2 border-[#fecaca] rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#ef4444]/10 rounded-xl">
                <AlertCircle className="h-6 w-6 text-[#ef4444]" />
              </div>
              <div>
                <h3 className="text-[#dc2626] font-bold text-lg mb-1">
                  Error Occurred
                </h3>
                <p className="text-[#b91c1c] font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Form */}
        {selectedCourse && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <VideoUploadForm
                selectedCourseId={selectedCourse}
                selectedCourseTitle={selectedCourseTitle}
                onSubmit={handleUpload}
                uploading={uploading}
              />
            </div>
          </div>
        )}

        {/* Videos List */}
        {selectedCourse && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#2563eb]/10 rounded-xl border-2 border-[#2563eb]/20">
                    <TrendingUp className="w-5 h-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0f172a]">
                      Course Videos
                    </h2>
                    <p className="text-gray-600 font-medium">
                      {loadingVideos
                        ? "Loading videos..."
                        : `${videos.length} video${
                            videos.length !== 1 ? "s" : ""
                          } found`}
                    </p>
                  </div>
                </div>

                {loadingVideos && (
                  <div className="flex items-center gap-2 text-[#2563eb]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-medium">Refreshing...</span>
                  </div>
                )}
              </div>

              {loadingVideos ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
                  <div className="mt-3 text-sm text-[#64748b]">
                    Loading videos...
                  </div>
                </div>
              ) : (
                <VideoList
                  videos={videos}
                  onDelete={handleDelete}
                  onPlay={handlePlay}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Video Player Modal */}
      {playerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#2563eb]/10 rounded-xl">
                  <Play className="w-5 h-5 text-[#2563eb]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#0f172a]">
                    {currentVideo?.title || "Video Preview"}
                  </h4>
                  <p className="text-sm text-gray-600">{selectedCourseTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setPlayerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-6">
              <HlsPlayer src={playerSrc} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
