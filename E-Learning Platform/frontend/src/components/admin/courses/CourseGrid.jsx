import React from "react";
import CourseCard from "./CourseCard";
import { FaPlus, FaGraduationCap } from "react-icons/fa";

const CourseGrid = ({ courses, onEdit, onDelete, onPublish, onManageTOC }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center hover:border-[#2563eb]/30 transition-colors duration-300">
        <div className="p-4 bg-[#2563eb]/10 rounded-full mb-4">
          <FaGraduationCap className="w-12 h-12 text-[#2563eb]" />
        </div>
        <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
          No Courses Found
        </h3>
        <p className="text-[#64748b] mb-6 max-w-md">
          Get started by creating your first course. Click the{" "}
          <span className="inline-flex items-center px-2 py-1 bg-[#2563eb]/10 text-[#2563eb] rounded-md font-medium">
            <FaPlus className="w-3 h-3 mr-1" />
            Add Course
          </span>{" "}
          button to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onManageTOC={onManageTOC}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
