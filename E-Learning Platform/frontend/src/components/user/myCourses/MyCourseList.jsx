import React from "react";
import MyCourseCard from "./MyCourseCard";

const MyCourseList = ({ enrollments = [] }) => {
  if (!Array.isArray(enrollments) || enrollments.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrollments.map((e) => (
        <MyCourseCard
          key={
            e._id || `${e.courseId || "course"}-${e.createdAt || Math.random()}`
          }
          enrollment={e}
        />
      ))}
    </div>
  );
};

export default MyCourseList;
