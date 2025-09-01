import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaListUl,
  FaPlus,
  FaTrashAlt,
  FaSave,
  FaClock,
  FaHashtag,
  FaFont,
} from "react-icons/fa";

const TOCModal = ({ open, onClose, course, toc, onSave }) => {
  const [tocItems, setTocItems] = useState([]);

  useEffect(() => {
    setTocItems(toc || []);
  }, [toc, open]);

  const handleChange = (idx, field, value) => {
    setTocItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    setTocItems((prev) => [
      ...prev,
      { title: "", duration: 0, sequence: prev.length + 1 },
    ]);
  };

  const handleRemoveItem = (idx) => {
    setTocItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    onSave(tocItems);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] border border-gray-100 transform transition-all duration-300 scale-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#2563eb]/5 to-[#2563eb]/10 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2563eb]/10 rounded-lg">
              <FaListUl className="w-5 h-5 text-[#2563eb]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a]">
                Table of Contents
              </h3>
              <p className="text-sm text-[#64748b] mt-1">
                Managing TOC for:{" "}
                <span className="font-medium">{course?.title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5 text-[#64748b]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col p-6">
          {tocItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaListUl className="w-8 h-8 text-[#2563eb]/40" />
                </div>
                <h4 className="text-lg font-semibold text-[#0f172a] mb-2">
                  No TOC items
                </h4>
                <p className="text-[#64748b] mb-6">
                  Start building your table of contents by adding items
                </p>
                <button
                  onClick={handleAddItem}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#2563eb]/90 transition-colors font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Add First Item</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[#64748b]">
                  {tocItems.length} item{tocItems.length !== 1 ? "s" : ""} •
                  Total duration:{" "}
                  {formatDuration(
                    tocItems.reduce(
                      (sum, item) => sum + (item.duration || 0),
                      0
                    )
                  )}
                </p>
                <button
                  onClick={handleAddItem}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#2563eb]/90 transition-colors text-sm font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              {tocItems.map((item, idx) => (
                <div
                  key={item.videoId || idx}
                  className="bg-[#f8fafc] border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[#2563eb] bg-[#2563eb]/10 px-2 py-1 rounded">
                      Item #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1.5 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <FaTrashAlt className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Title Field */}
                    <div className="md:col-span-6">
                      <label className="flex items-center space-x-2 text-sm font-medium text-[#0f172a] mb-2">
                        <FaFont className="w-4 h-4 text-[#2563eb]" />
                        <span>Title</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 text-[#0f172a] placeholder-[#64748b]"
                        value={item.title || ""}
                        onChange={(e) =>
                          handleChange(idx, "title", e.target.value)
                        }
                        placeholder="Enter item title..."
                      />
                    </div>

                    {/* Duration Field */}
                    <div className="md:col-span-3">
                      <label className="flex items-center space-x-2 text-sm font-medium text-[#0f172a] mb-2">
                        <FaClock className="w-4 h-4 text-[#22c55e]" />
                        <span>Duration (sec)</span>
                      </label>
                      <input
                        type="number"
                        className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 text-[#0f172a]"
                        value={item.duration || 0}
                        onChange={(e) =>
                          handleChange(idx, "duration", Number(e.target.value))
                        }
                        placeholder="0"
                        min={0}
                      />
                      <p className="text-xs text-[#64748b] mt-1">
                        {formatDuration(item.duration || 0)}
                      </p>
                    </div>

                    {/* Sequence Field */}
                    <div className="md:col-span-3">
                      <label className="flex items-center space-x-2 text-sm font-medium text-[#0f172a] mb-2">
                        <FaHashtag className="w-4 h-4 text-[#ef4444]" />
                        <span>Sequence</span>
                      </label>
                      <input
                        type="number"
                        className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all duration-200 text-[#0f172a]"
                        value={item.sequence || 0}
                        onChange={(e) =>
                          handleChange(idx, "sequence", Number(e.target.value))
                        }
                        placeholder="0"
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-t border-gray-100 bg-[#f8fafc] rounded-b-2xl flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-[#64748b] rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#2563eb]/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaSave className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TOCModal;
