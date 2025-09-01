import axios from "../utils/axios";

// ========== Admin APIs ==========

// Upload a video to a course
export const uploadVideo = async (courseId, formData) => {
  const response = await axios.post(
    `/admin/courses/${courseId}/videos`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      // Extend timeout for long-running video processing (e.g., 10 minutes)
      timeout: 600000,
    }
  );
  return response.data;
};

// Check video processing status
export const getVideoStatus = async (courseId, videoId) => {
  const response = await axios.get(
    `/admin/courses/${courseId}/videos/${videoId}/status`
  );
  return response.data;
};

// Delete a video by ID
export const deleteVideo = async (videoId) => {
  const response = await axios.delete(`/videos/${videoId}`);
  return response.data;
};
// Update video details
export const updateVideoDetails = async (videoId, updateData) => {
  try {
    const response = await axios.put(`/videos/${videoId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Upload a custom thumbnail image
export const uploadVideoThumbnail = async (videoId, file) => {
  const formData = new FormData();
  formData.append("thumbnail", file);
  const response = await axios.post(`/videos/${videoId}/thumbnail`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Auto-generate a thumbnail from the video
export const autoGenerateThumbnail = async (videoId) => {
  const response = await axios.post(`/videos/${videoId}/thumbnail/auto`);
  return response.data;
};

// ========== User APIs ==========

// Stream video (returns blob/streamed content)
export const getVideoStreamUrl = async (videoId) => {
  const response = await axios.get(`/videos/${videoId}/stream`);
  // Remove responseType: "blob" since backend returns JSON
  return response.data.data.hlsUrl; // Extract the HLS URL
};
// Get video metadata/details including duration, title and description
export const getVideoDetails = async (videoId) => {
  const response = await axios.get(`/videos/${videoId}`);
  return response.data;
};
