import axios from "../utils/axios";

// Get dashboard overview statistics
export const getDashboardOverview = async () => {
  const response = await axios.get("/admin/dashboard/overview");
  return response.data;
};

// Get basic dashboard statistics
export const getDashboardStats = async () => {
  const response = await axios.get("/admin/dashboard/stats");
  return response.data;
};

// Get course-specific statistics
export const getCourseStats = async () => {
  const response = await axios.get("/admin/dashboard/course-stats");
  return response.data;
};

// Get enrollment statistics
export const getEnrollmentStats = async () => {
  const response = await axios.get("/admin/dashboard/enrollment-stats");
  return response.data;
};

// Get login activity for the last 30 days
export const getLoginActivity = async () => {
  const response = await axios.get("/admin/dashboard/login-activity");
  return response.data;
};
