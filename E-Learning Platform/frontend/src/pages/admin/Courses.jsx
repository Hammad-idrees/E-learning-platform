import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCoursesForAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
} from "../../services/courses";
import CourseFormModal from "../../components/admin/courses/CourseFormModal";
import CourseGrid from "../../components/admin/courses/CourseGrid";
import { BookOpen, Plus, AlertCircle, Loader2 } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCoursesForAdmin();
      setCourses(
        Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []
      );
    } catch {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (course) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    await deleteCourse(course._id);
    fetchCourses();
  };

  const handlePublish = async (course) => {
    if (!window.confirm("Publish this course and notify users?")) return;
    await publishCourse(course._id);
    fetchCourses();
  };

  const handleFormSubmit = async (formData) => {
    if (editingCourse) {
      await updateCourse(editingCourse._id, formData);
    } else {
      await createCourse(formData);
    }
    setShowForm(false);
    fetchCourses();
  };

  const handleManageTOC = (course) => {
    navigate(`/admin-dashboard/toc/${course._id}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#2563eb] to-[#1e40af] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Course Management
                </h1>
              </div>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
                Create, edit, publish, and manage AfaqNama courses with
                comprehensive content control
              </p>
            </div>

            <button
              className="group bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50"
              onClick={handleAdd}
            >
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {/* Stats Card - Long, Interactive & Beautiful */}
        <div className="flex justify-start mb-6">
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full max-w-md group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Courses
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {courses.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                <svg
                  className="w-4 h-4 text-green-600 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
                <span className="text-xs text-green-600 font-medium">+12%</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-[#ef4444] flex-shrink-0" />
              <p className="text-[#dc2626] font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
                  <span className="ml-3 text-[#64748b] font-medium">
                    Loading courses...
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-xl"></div>
                      <div className="mt-4 space-y-2">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="transform transition-all duration-500 ease-in-out">
                <CourseGrid
                  courses={courses}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPublish={handlePublish}
                  onManageTOC={handleManageTOC}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <CourseFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCourse}
      />
    </div>
  );
};

export default Courses;
