import React, { useState, useEffect, useRef } from "react";

const TOCFormModal = ({ show, editingTOC, onSubmit, onClose }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editingTOC) {
      setContent(editingTOC.content);
    } else {
      setContent("");
    }
  }, [editingTOC, show]);

  useEffect(() => {
    if (show && textareaRef.current) {
      setTimeout(() => textareaRef.current.focus(), 100);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Please enter some content");
      return;
    }
    onSubmit(content);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-blue-50 bg-opacity-70 backdrop-blur-sm"></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col border border-blue-100 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <h3 className="text-2xl font-semibold">
            {editingTOC ? "Edit Content" : "Add Content"}
          </h3>
          <p className="text-blue-100 text-sm mt-2">
            Add your learning material below
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content
              </label>

              <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all shadow-inner">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-64 p-5 resize-none focus:outline-none text-gray-700 leading-relaxed"
                  placeholder="Enter your content here..."
                  required
                />
              </div>

              <p className="text-gray-500 text-xs mt-3">
                You can enter text, lists, or any learning material
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
              >
                {editingTOC ? "Update Content" : "Create Content"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TOCFormModal;
