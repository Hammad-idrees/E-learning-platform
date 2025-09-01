import axios from "../utils/axios";

/* ========== 🔐 ADMIN AUTH ========== */

// Admin login
export const adminLogin = async (credentials) => {
  const response = await axios.post("/auth/admin/login", credentials);
  return response.data;
};

/* ========== 👥 USER MANAGEMENT ========== */

// Get all users
export const getAllUsers = async () => {
  const response = await axios.get("/admin/users");
  return response.data;
};

// Get users by course ID
export const getUsersByCourse = async (courseId) => {
  const response = await axios.get(`/admin/courses/${courseId}/users`);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  const response = await axios.delete(`/admin/users/${userId}`);
  return response.data;
};
