import React, { useEffect, useRef, useState } from "react";
import { getMyNotifications } from "../../../services/notifications";
import { useNavigate } from "react-router-dom";

const NotificationsBellDropdown = ({ open, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getMyNotifications();
        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setItems(
          data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 py-3 z-50"
    >
      <div className="px-4 pb-2 text-sm font-semibold text-[#0F2C59] dark:text-gray-100">
        Notifications
      </div>
      <div className="max-h-72 overflow-y-auto">
        {loading ? (
          <div className="px-4 py-2 text-sm text-[#64748B] dark:text-gray-400">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="px-4 py-2 text-sm text-[#64748B] dark:text-gray-400">
            No notifications
          </div>
        ) : (
          items.map((n) => (
            <div
              key={n._id}
              className={`px-4 py-2 text-sm border-t first:border-t-0 ${
                !n.read
                  ? "bg-blue-50 text-blue-900 border-blue-100 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800"
                  : "text-[#0F2C59] dark:text-gray-100 border-gray-100 dark:border-gray-700"
              }`}
            >
              <div className="font-medium">{n.message}</div>
              <div className="text-xs text-[#64748B] dark:text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-4 pt-2">
        <button
          onClick={() => {
            onClose?.();
            navigate("/notifications");
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          View all
        </button>
      </div>
    </div>
  );
};

export default NotificationsBellDropdown;
