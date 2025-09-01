import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { getTOCsByCourse } from "../../../services/toc";
import {
  FaEllipsisV,
  FaTrashAlt,
  FaEdit,
  FaUpload,
  FaVideo,
  FaListUl,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaBook,
} from "react-icons/fa";

const KebabMenu = ({ onEdit, onDelete, onPublish }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-20">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="p-2 bg-white/95 backdrop-blur-sm rounded-lg hover:bg-white border shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <FaEllipsisV className="w-4 h-4 text-[#1e293b]" />
      </button>

      {open && (
        <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-30">
          {[
            {
              icon: FaEdit,
              label: "Edit",
              onClick: onEdit,
              color: "text-[#2563eb]",
            },
            {
              icon: FaUpload,
              label: "Publish",
              onClick: onPublish,
              color: "text-[#22c55e]",
            },
            {
              icon: FaTrashAlt,
              label: "Delete",
              onClick: onDelete,
              color: "text-[#ef4444]",
            },
          ].map((IconObj) => {
            const { icon, label, onClick, color } = IconObj;
            const Icon = icon;
            return (
              <button
                key={label}
                className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-[#f8fafc] transition-colors text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onClick?.();
                }}
              >
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-[#1e293b]">{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ published }) => (
  <span
    className={`px-3 py-1 text-xs font-medium rounded-full ${
      published
        ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20"
        : "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20"
    }`}
  >
    {published ? "Published" : "Draft"}
  </span>
);

const VideoStats = ({ courseId, onShowAll }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/courses/${courseId}/videos`);
        setCount(Array.isArray(res.data?.data) ? res.data.data.length : 0);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [courseId]);

  return (
    <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg border">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#2563eb]/10 rounded-lg">
          <FaVideo className="w-5 h-5 text-[#2563eb]" />
        </div>
        <div>
          <p className="font-medium text-[#0f172a]">Videos</p>
          <p className="text-sm text-[#64748b]">
            {loading ? "Loading..." : `${count} videos`}
          </p>
        </div>
      </div>
      <button
        onClick={onShowAll}
        className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#2563eb]/90 transition-colors text-sm font-medium"
      >
        View All
      </button>
    </div>
  );
};

const TOCPreview = ({ courseId, onManage }) => {
  const [tocs, setTocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTOC = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTOCsByCourse(courseId);
      setTocs(
        Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []
      );
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadTOC();
  }, [courseId, loadTOC]);

  return (
    <div className="p-4 bg-[#f8fafc] rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#22c55e]/10 rounded-lg">
            <FaBook className="w-5 h-5 text-[#22c55e]" />
          </div>
          <div>
            <p className="font-medium text-[#0f172a]">Table of Contents</p>
            <p className="text-sm text-[#64748b]">
              {loading ? "Loading..." : `${tocs.length} sections`}
            </p>
          </div>
        </div>
        <button
          onClick={onManage}
          className="px-4 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#22c55e]/90 transition-colors text-sm font-medium"
        >
          Manage
        </button>
      </div>

      {tocs.length > 0 && (
        <div className="space-y-2">
          {tocs.slice(0, 2).map((toc, index) => (
            <div key={toc._id} className="flex items-center space-x-2 text-sm">
              <span className="w-5 h-5 bg-[#2563eb]/10 text-[#2563eb] rounded flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <span className="text-[#64748b] truncate">
                {toc.content?.replace(/<[^>]+>/g, "").slice(0, 60)}...
              </span>
            </div>
          ))}
          {tocs.length > 2 && (
            <p className="text-xs text-[#64748b] ml-7">
              +{tocs.length - 2} more sections
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const CourseCard = ({ course, onEdit, onDelete, onPublish, onManageTOC }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <KebabMenu
        onEdit={() => onEdit?.(course)}
        onDelete={() => onDelete?.(course)}
        onPublish={() => onPublish?.(course)}
      />

      {/* Thumbnail */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {course?.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2563eb]/10 to-[#2563eb]/20 flex items-center justify-center">
            <FaPlay className="w-12 h-12 text-[#2563eb]/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-[#0f172a] line-clamp-2 flex-1 mr-3">
            {course.title}
          </h3>
          <StatusBadge published={course.isPublished} />
        </div>

        <p className="text-[#64748b] text-sm leading-relaxed line-clamp-3 mb-4">
          {course.description || "No description available"}
        </p>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center space-x-2 py-3 text-[#2563eb] hover:text-[#2563eb]/80 transition-colors font-medium"
        >
          <span>{expanded ? "Show Less" : "View Details"}</span>
          {expanded ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <VideoStats
              courseId={course._id}
              onShowAll={() =>
                navigate(
                  `/admin-dashboard/video-manager?courseId=${course._id}`
                )
              }
            />
            <TOCPreview
              courseId={course._id}
              onManage={() => onManageTOC?.(course)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
