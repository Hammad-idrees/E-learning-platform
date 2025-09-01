import React, { useState } from "react";
import {
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";

const TOCItem = ({ item, index, totalItems, onEdit, onDelete, onReorder }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(item._id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return "No content";
    const textContent = content.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onReorder(index, index - 1)}
                disabled={index === 0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ChevronUp className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={() => onReorder(index, index + 1)}
                disabled={index === totalItems - 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">#{index + 1}</span>
              <span>•</span>
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1 text-gray-400">
              <GripVertical className="w-4 h-4" />
            </div>
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg mt-1">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 leading-relaxed">
                {truncateContent(item.content)}
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Created: {formatDate(item.createdAt)}</span>
              </div>
              {item.updatedAt && item.updatedAt !== item.createdAt && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Updated: {formatDate(item.updatedAt)}</span>
                </div>
              )}
            </div>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">
              {item.content ? item.content.replace(/<[^>]*>/g, "").length : 0}{" "}
              chars
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <div className="text-center space-y-4">
              <div className="p-3 bg-red-100 rounded-full w-fit mx-auto">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete TOC Item
                </h3>
                <p className="text-gray-500 mt-1">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TOCItem;
