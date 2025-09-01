import React from "react";

const CourseTable = ({
  courses,
  onEdit,
  onDelete,
  onPublish,
  onManageTOC,
  loading,
}) => {
  if (loading)
    return (
      <div className="text-center py-8 text-gray-500">Loading courses...</div>
    );
  if (!courses.length)
    return (
      <div className="text-center py-8 text-gray-500">No courses found.</div>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr
              key={course._id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {course.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {course.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    course.isPublished
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(course.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                    onClick={() => onEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 transition-colors duration-150"
                    onClick={() => onDelete(course)}
                  >
                    Delete
                  </button>
                  {!course.isPublished && (
                    <button
                      className="text-green-600 hover:text-green-900 transition-colors duration-150"
                      onClick={() => onPublish(course)}
                    >
                      Publish
                    </button>
                  )}
                  <button
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                    onClick={() => onManageTOC(course)}
                  >
                    Manage TOC
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
