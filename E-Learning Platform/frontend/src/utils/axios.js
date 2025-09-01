// src/services/axios.js
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../services/auth"; // Your auth service

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Unified base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10s timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("afaqnama_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Enhanced)
api.interceptors.response.use(
  (response) => {
    // Success: Pass through with toast for non-GET requests
    if (response.config.method !== "get" && response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    // Handle specific error cases
    if (error.response?.status === 401) {
      logout(); // Cleanup auth state
      toast.error("Session expired. Redirecting to login...");
      window.location.href = "/login";
    } else if (expectedError) {
      const message = error.response?.data?.message || "Request failed";
      toast.error(message);
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// Add cancel token support
api.cancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

export default api;
