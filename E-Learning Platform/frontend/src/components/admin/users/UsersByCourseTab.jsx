import React, { useEffect, useState } from "react";
import { getCoursesForAdmin } from "../../../services/courses";
import { getUsersByCourse } from "../../../services/admin";
import { FaBookOpen } from "react-icons/fa";

const UsersByCourseTab = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);
  const [dataWarning, setDataWarning] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      setError(null);
      setDataWarning(null);
      try {
        const data = await getCoursesForAdmin();
        if (data && Array.isArray(data.data)) {
          setCourses(data.data);
        } else if (Array.isArray(data)) {
          setCourses(data);
        } else if (data && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
          setDataWarning("Unexpected response format from courses API.");
        }
      } catch {
        setError("Failed to fetch courses.");
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setUsers([]);
    if (!courseId) return;
    setLoadingUsers(true);
    setError(null);
    setDataWarning(null);
    try {
      const data = await getUsersByCourse(courseId);
      if (data && data.data && Array.isArray(data.data.docs)) {
        setUsers(data.data.docs);
      } else if (data && Array.isArray(data.data)) {
        setUsers(data.data);
      } else if (Array.isArray(data)) {
        setUsers(data);
      } else if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
        setDataWarning("Unexpected response format from users API.");
      }
    } catch {
      setError("Failed to fetch users for this course.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const renderStatus = (status) => {
    const normalized = (status || "").toLowerCase();
    if (normalized === "approved" || normalized === "accepted")
      return (
        <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          {status}
        </span>
      );
    if (normalized === "pending")
      return (
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          {status}
        </span>
      );
    if (normalized === "rejected")
      return (
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          {status}
        </span>
      );
    return (
      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
        n/a
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Course Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-[#0f172a]">
            Select Course
          </label>
          <div className="relative">
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full appearance-none border border-gray-300 px-4 py-3 rounded-lg bg-white text-gray-700 text-sm shadow-sm 
                   focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 
                   hover:border-[#2563eb]/60 cursor-pointer"
            >
              <option value="">-- Select a course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Loading / Errors */}
      {loadingCourses && (
        <div className="text-gray-600 animate-pulse">Loading courses...</div>
      )}
      {error && (
        <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      {dataWarning && (
        <div className="text-yellow-700 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
          {dataWarning}
        </div>
      )}
      {loadingUsers && (
        <div className="text-gray-600 animate-pulse">Loading users...</div>
      )}
      {selectedCourse && !loadingUsers && !users.length && (
        <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
          <FaBookOpen className="w-5 h-5 text-gray-500" />
          <span>No users found for this course.</span>
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg">
          <table className="min-w-full">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wide">
                  Name
                </th>
                <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wide">
                  Email
                </th>
                <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wide">
                  Username
                </th>
                <th className="px-6 py-3 font-semibold text-sm uppercase tracking-wide">
                  Enrollment Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-[#f1f5f9] transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-[#0f172a] font-medium">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-[#0f172a]">{user.email}</td>
                  <td className="px-6 py-4 text-[#0f172a]">{user.username}</td>
                  <td className="px-6 py-4">
                    {renderStatus(user.enrollmentStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersByCourseTab;
