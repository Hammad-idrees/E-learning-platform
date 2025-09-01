import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTOCsByCourse,
  createTOC,
  updateTOC,
  deleteTOC,
} from "../../services/toc";
import { getCoursesForAdmin } from "../../services/courses";
import toast from "react-hot-toast";
import TOCList from "../../components/admin/toc/TOCList";
import TOCFormModal from "../../components/admin/toc/TOCFormModal";

const TOCManager = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [tocs, setTocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTOC, setEditingTOC] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [courseId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const courseData = await getCoursesForAdmin();
      const foundCourse = courseData.data.find((c) => c._id === courseId);
      setCourse(foundCourse);

      const tocData = await getTOCsByCourse(courseId);
      const tocList = Array.isArray(tocData)
        ? tocData
        : Array.isArray(tocData?.data)
        ? tocData.data
        : [];
      setTocs(tocList);
    } catch {
      toast.error("Failed to load TOC data");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingTOC(null);
    setShowForm(true);
  };

  const handleEdit = (toc) => {
    setEditingTOC(toc);
    setShowForm(true);
  };

  const handleDelete = async (tocId) => {
    if (!window.confirm("Are you sure you want to delete this TOC item?"))
      return;

    try {
      await deleteTOC(tocId);
      toast.success("TOC item deleted successfully");
      loadData();
    } catch {
      toast.error("Failed to delete TOC item");
    }
  };

  const handleFormSubmit = async (content) => {
    try {
      if (editingTOC) {
        await updateTOC(editingTOC._id, content);
        toast.success("TOC item updated successfully");
      } else {
        await createTOC({ courseId, content });
        toast.success("TOC item created successfully");
      }
      setShowForm(false);
      loadData();
    } catch {
      toast.error(
        editingTOC ? "Failed to update TOC item" : "Failed to create TOC item"
      );
    }
  };

  const handleMoveItem = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= tocs.length) return;

    const newTocs = [...tocs];
    const [movedItem] = newTocs.splice(fromIndex, 1);
    newTocs.splice(toIndex, 0, movedItem);

    setTocs(newTocs);
    toast.success("TOC order updated");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-medium text-slate-700">
            Loading TOC Manager...
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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
          <div className="text-lg font-medium text-red-600 mb-4">
            Course not found
          </div>
          <button
            onClick={() => navigate("/admin-dashboard/courses")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <button
                onClick={() => navigate("/admin-dashboard/courses")}
                className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all duration-200 mb-3 hover:gap-3"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1"
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
                <span className="font-medium">Back to Courses</span>
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    Table of Contents Manager
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Organize and structure your course content
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="text-sm font-medium text-blue-700">
                    Active Course
                  </div>
                </div>
                <div className="text-blue-900 font-semibold text-lg">
                  {course.title}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleAdd}
                className="group w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add TOC Item</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Content Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-gray-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Course Structure
                </h2>
                <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {tocs.length} {tocs.length === 1 ? "item" : "items"} in
                    table of contents
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* TOC List Container */}
          <div className="p-6">
            <div className="space-y-2">
              <TOCList
                tocs={tocs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMoveItem={handleMoveItem}
              />

              {tocs.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <svg
                      className="w-10 h-10 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    No Content Structure Yet
                  </h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Create your first table of contents item to start organizing
                    your course content and provide structure for your students.
                  </p>
                  <button
                    onClick={handleAdd}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3"
                  >
                    <svg
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create First Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Modal */}
        <TOCFormModal
          show={showForm}
          editingTOC={editingTOC}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      </div>
    </div>
  );
};

export default TOCManager;
