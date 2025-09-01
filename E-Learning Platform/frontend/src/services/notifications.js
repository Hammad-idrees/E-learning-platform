import axios from "../utils/axios";

/* ========== 📢 NOTIFICATIONS (USER) ========== */

// Get all notifications for the current user
export const getMyNotifications = async () => {
  const response = await axios.get("/v1/notifications");
  return response.data;
};

// Mark a notification as read
export const markNotificationAsRead = async (id) => {
  const response = await axios.patch(`/v1/notifications/${id}/read`);
  return response.data;
};

// Delete a notification
export const deleteNotification = async (id) => {
  const response = await axios.delete(`/v1/notifications/${id}`);
  return response.data;
};

// Convenience helpers (batch on client)
export const markAllNotificationsRead = async () => {
  const res = await getMyNotifications();
  const list = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
    ? res
    : [];
  await Promise.all(
    list.filter((n) => !n.read).map((n) => markNotificationAsRead(n._id))
  );
  return { success: true };
};

export const deleteAllNotifications = async () => {
  const res = await getMyNotifications();
  const list = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
    ? res
    : [];
  await Promise.all(list.map((n) => deleteNotification(n._id)));
  return { success: true };
};

/* ========== 🚀 COURSE PUBLISHING (ADMIN) ========== */

// Publish a course (trigger notification + email)
export const publishCourse = async (courseId) => {
  const response = await axios.post(`/admin/courses/${courseId}/publish`);
  return response.data;
};
