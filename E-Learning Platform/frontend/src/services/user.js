import axios from "../utils/axios";

/* ========== 👤 USER PROFILE ========== */

// Get current user's profile
export const getMyProfile = async () => {
  const response = await axios.get("/users/me");
  return response.data;
};

// Update current user's profile
export const updateProfile = async (profileData) => {
  const response = await axios.put("/users/me", profileData);
  return response.data;
};

// Change current user's password
export const changePassword = async (passwordData) => {
  const response = await axios.put("/users/change-password", passwordData);
  return response.data;
};
