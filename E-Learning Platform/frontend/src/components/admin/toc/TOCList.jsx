import React from "react";
import { ListOrdered, FileText } from "lucide-react";
import TOCItem from "./TOCItem";

const TOCList = ({ tocs, onEdit, onDelete, onMoveItem }) => {
  if (!tocs || tocs.length === 0) {
    return null; // Return null since TOCManager handles empty state
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ListOrdered className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Table of Contents
            </h3>
            <p className="text-sm text-gray-500">{tocs.length} items</p>
          </div>
        </div>
      </div>

      {/* TOC Items */}
      <div className="space-y-3">
        {tocs.map((item, index) => (
          <TOCItem
            key={item._id}
            item={item}
            index={index}
            totalItems={tocs.length}
            onEdit={onEdit}
            onDelete={onDelete}
            onReorder={onMoveItem}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500">
          Drag and drop items to reorder your course structure
        </p>
      </div>
    </div>
  );
};

export default TOCList;
