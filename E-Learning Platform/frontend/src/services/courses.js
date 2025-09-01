import axios from "../utils/axios";

/* ========== 📌 PUBLIC APIs ========== */

// Get published courses (public)
export const getPublishedCourses = async () => {
  const response = await axios.get("/courses/published");
  return response.data;
};

// Get course details
export const getCourseDetails = async (courseId) => {
  const response = await axios.get(`/courses/${courseId}`);
  return response.data;
};

/* ========== 👤 USER APIs (Protected) ========== */

// Get course videos (enrollment protected by backend)
export const getCourseVideos = async (courseId) => {
  const response = await axios.get(`/courses/${courseId}/videos`);
  return response.data;
};

/* ========== 🛠️ ADMIN APIs ========== */

// Create a new course with thumbnail upload
export const createCourse = async (courseData) => {
  const formData = new FormData();

  formData.append("title", courseData.title);
  formData.append("description", courseData.description);

  if (courseData.thumbnail) {
    formData.append("thumbnail", courseData.thumbnail);
  }

  const response = await axios.post("/admin/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update an existing course
export const updateCourse = async (courseId, courseData) => {
  const response = await axios.put(`/admin/courses/${courseId}`, courseData);
  return response.data;
};

// Delete a course
export const deleteCourse = async (courseId) => {
  const response = await axios.delete(`/admin/courses/${courseId}`);
  return response.data;
};

// Update Table of Contents (TOC)
export const updateCourseTOC = async (courseId, tocData) => {
  const response = await axios.put(`/admin/courses/${courseId}/toc`, tocData);
  return response.data;
};

// Get all courses for admin dashboard
export const getCoursesForAdmin = async () => {
  const response = await axios.get("/admin/courses");
  return response.data;
};

/* ========== 💬 COMMENTS APIs (User/Protected) ========== */

// Add a comment to a course
export const addComment = async (courseId, commentData) => {
  const response = await axios.post(
    `/courses/${courseId}/comments`,
    commentData
  );
  return response.data;
};

// Get all comments for a course
export const getComments = async (courseId) => {
  const response = await axios.get(`/courses/${courseId}/comments`);
  return response.data;
};

// Delete a comment by ID
export const deleteComment = async (courseId, commentId) => {
  const response = await axios.delete(
    `/courses/${courseId}/comments/${commentId}`
  );
  return response.data;
};

/* ========== 🚀 COURSE PUBLISHING (ADMIN) ========== */

// Publish a course (trigger notification + email)
export const publishCourse = async (courseId) => {
  const response = await axios.post(`/admin/courses/${courseId}/publish`);
  return response.data;
};
