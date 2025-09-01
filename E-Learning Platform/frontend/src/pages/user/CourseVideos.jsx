import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import CourseVideosHeader from "../../components/user/course-videos/CourseVideosHeader";
import VideoGrid from "../../components/user/course-videos/VideoGrid";
import VideoPlayerModal from "../../components/user/course-videos/VideoPlayerModal";
import LoadingSkeleton from "../../components/user/course-videos/LoadingSkeleton";
import ErrorState from "../../components/user/course-videos/ErrorState";
import { getCourseDetails } from "../../services/courses";
import { getCourseVideos } from "../../services/courses";

const CourseVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);

  // Player state
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const loadCourseData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [courseRes, videosRes] = await Promise.all([
        getCourseDetails(courseId),
        getCourseVideos(courseId),
      ]);

      if (courseRes?.success) {
        setCourse(courseRes.data);
      }

      if (videosRes?.success && videosRes.data.length > 0) {
        const sortedVideos = videosRes.data.sort(
          (a, b) => a.sequence - b.sequence
        );
        setVideos(sortedVideos);
      } else {
        setError("No videos found for this course");
      }
    } catch (err) {
      console.error("Error loading course data:", err);
      setError("Failed to load course data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  const handlePlay = (video) => {
    setPlayingVideo(video);
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setPlayingVideo(null);
  };

  const handleBackToCourses = () => {
    navigate("/my-courses");
  };

  const handleRetry = () => {
    loadCourseData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
        <StudentHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSkeleton />
        </main>
        <StudentFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
        <StudentHeader />
        <ErrorState error={error} onRetry={handleRetry} />
        <StudentFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      <StudentHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <CourseVideosHeader
          course={course}
          onBack={handleBackToCourses}
          videoCount={videos.length}
        />

        {/* Video Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Course Videos ({videos.length})
          </h3>
          <VideoGrid videos={videos} onVideoSelect={handlePlay} />
        </div>

        {/* Video Player Modal */}
        <VideoPlayerModal
          isOpen={playerOpen}
          video={playingVideo}
          onClose={handleClosePlayer}
        />
      </main>
      
      <StudentFooter />
    </div>
  );
};

export default CourseVideos;
