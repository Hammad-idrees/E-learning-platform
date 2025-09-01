import axios from "../utils/axios";

// Create TOC for a course
export const createTOC = async ({ courseId, content }) => {
  const response = await axios.post("/toc", { courseId, content });
  return response.data;
};

// Get TOCs for a specific course (returns array)
export const getTOCsByCourse = async (courseId) => {
  const response = await axios.get(`/toc/${courseId}`);
  return response.data;
};

// Update a TOC by id
export const updateTOC = async (id, content) => {
  const response = await axios.put(`/toc/${id}`, { content });
  return response.data;
};

// Delete a TOC by id
export const deleteTOC = async (id) => {
  const response = await axios.delete(`/toc/${id}`);
  return response.data;
};
