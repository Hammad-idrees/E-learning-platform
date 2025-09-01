import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import CourseInfo from "../../components/user/course-details/CourseInfo";
import TableOfContents from "../../components/user/course-details/TableOfContents";
import VideosList from "../../components/user/course-details/VideosList";
import { getCourseDetails } from "../../services/courses";
import { getEnrollmentStatus } from "../../services/enrollments";
import { getTOCsByCourse } from "../../services/toc";
import { getVideoDetails } from "../../services/videos";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [toc, setToc] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch course details
        const courseResponse = await getCourseDetails(courseId);
        const courseData = courseResponse.data;
        setCourse(courseData);

        // Fetch table of contents using the TOC API
        try {
          const tocResponse = await getTOCsByCourse(courseId);
          console.log("TOC Response:", tocResponse); // Debug log

          // Check if response has success and data properties
          if (
            tocResponse.success &&
            Array.isArray(tocResponse.data) &&
            tocResponse.data.length > 0
          ) {
            setToc(tocResponse.data);
            console.log("TOC set successfully:", tocResponse.data);
          } else {
            console.log("No TOC data found for course:", courseId);
            setToc([]);
          }
        } catch (tocError) {
          console.error("Error fetching TOC:", tocError);
          setToc([]);
        }

        // Fetch detailed video information for each video
        if (courseData.videos && courseData.videos.length > 0) {
          const videoDetailsPromises = courseData.videos.map(
            async (videoId) => {
              try {
                const videoResponse = await getVideoDetails(videoId);
                if (videoResponse.success) {
                  return videoResponse.data;
                }
                return null;
              } catch (videoError) {
                console.error(`Error fetching video ${videoId}:`, videoError);
                return null;
              }
            }
          );

          const videoDetails = await Promise.all(videoDetailsPromises);
          const validVideos = videoDetails.filter((video) => video !== null);
          setVideos(validVideos);

          // Update the course data with the correct video count
          setCourse({
            ...courseData,
            videos: validVideos,
          });
        }

        // Check enrollment status
        try {
          const enrollmentResponse = await getEnrollmentStatus(courseId);
          setEnrollmentStatus(
            enrollmentResponse.data?.status || "not_enrolled"
          );
        } catch (enrollmentError) {
          console.error("Error checking enrollment status:", enrollmentError);
          setEnrollmentStatus("not_enrolled");
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course details. Please try again later.");
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <StudentHeader />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                Loading course details...
              </p>
            </div>
          </div>
        </main>
        <StudentFooter />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <StudentHeader />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-8 rounded-2xl max-w-md mx-auto backdrop-blur-sm shadow-lg">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Course not found
              </h3>
              <p className="text-sm text-red-600 dark:text-red-300 mb-6">
                {error || "The requested course could not be found."}
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Courses
              </button>
            </div>
          </div>
        </main>
        <StudentFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <StudentHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Header Section */}
        <div className="text-center mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Course Details
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              {course.title}
            </span>
          </h1>
          <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">
            Discover comprehensive course content and learning materials
          </p>
        </div>

        {/* Course Information */}
        <CourseInfo
          course={course}
          enrollmentStatus={enrollmentStatus}
          onBack={() => navigate("/courses")}
        />

        {/* Table of Contents */}
        {toc.length > 0 && (
          <div className="mt-12">
            <TableOfContents toc={toc} />
          </div>
        )}

        {/* Videos List */}
        {videos.length > 0 && (
          <div className="mt-12">
            <VideosList videos={videos} enrollmentStatus={enrollmentStatus} />
          </div>
        )}

        {/* No content message */}
        {toc.length === 0 && videos.length === 0 && (
          <div className="mt-12 text-center py-12">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-blue-200/30 dark:border-slate-700/50 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                No Content Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This course doesn't have any content yet. Check back later!
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  Content will be added soon
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <StudentFooter />
    </div>
  );
};

export default CourseDetail;
