import React, { useState } from "react";
import { deleteAllNotifications } from "../../../services/notifications";
import { Trash2 } from "lucide-react";

const DeleteAllButton = ({ notifications, onUpdate, onError }) => {
  const [deletingAll, setDeletingAll] = useState(false);

  const totalCount = notifications.length;

  const handleDeleteAll = async () => {
    if (totalCount === 0) return;

    // Double confirmation for destructive action
    const firstConfirm = window.confirm(
      `Are you sure you want to delete all ${totalCount} notifications?`
    );
    if (!firstConfirm) return;

    const secondConfirm = window.confirm(
      `⚠️ FINAL WARNING: This will permanently delete ALL ${totalCount} notifications and cannot be undone. Are you absolutely sure?`
    );
    if (!secondConfirm) return;

    setDeletingAll(true);

    try {
      await deleteAllNotifications();

      // Update parent component state - clear all notifications
      onUpdate([]);
    } catch {
      onError("Failed to delete all notifications.");
    } finally {
      setDeletingAll(false);
    }
  };

  // Don't render if no notifications
  if (totalCount === 0) return null;

  return (
    <button
      onClick={handleDeleteAll}
      disabled={deletingAll}
      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
    >
      <Trash2 className="w-4 h-4" />
      {deletingAll ? "Deleting all..." : `Delete all (${totalCount})`}
    </button>
  );
};

export default DeleteAllButton;
