import axios from "../utils/axios";

/* ========== 👤 USER APIs ========== */

// Request enrollment to a course
export const requestEnrollment = async (courseId) => {
  const response = await axios.post("/enrollments", { courseId });
  return response.data;
};

// Get enrollments for the current user
export const getMyEnrollments = async () => {
  const response = await axios.get("/enrollments/my");
  return response.data;
};

// Get enrollment status for a specific course
export const getEnrollmentStatus = async (courseId) => {
  const response = await axios.get(`/enrollments/status/${courseId}`);
  return response.data;
};

/* ========== 🛠️ ADMIN APIs ========== */

// Get enrollments by status (comma-separated: pending,approved,rejected)
export const getEnrollmentsByStatus = async (statusCsv = "pending") => {
  const response = await axios.get(`/enrollments/admin/enrollments`, {
    params: { status: statusCsv },
  });
  return response.data;
};

// Get all pending enrollments
export const getPendingEnrollments = async () => {
  const response = await axios.get("/enrollments/admin/enrollments", {
    params: { status: "pending" },
  });
  return response.data;
};

// Approve a specific enrollment
export const approveEnrollment = async (enrollmentId) => {
  const response = await axios.put(
    `/enrollments/admin/enrollments/${enrollmentId}/approve`
  );
  return response.data;
};

// Reject a specific enrollment with optional reason
export const rejectEnrollment = async (enrollmentId, reason = "") => {
  const response = await axios.put(
    `/enrollments/admin/enrollments/${enrollmentId}/reject`,
    { reason }
  );
  return response.data;
};

// Delete a specific enrollment
export const deleteEnrollment = async (enrollmentId) => {
  const response = await axios.delete(
    `/enrollments/admin/enrollments/${enrollmentId}`
  );
  return response.data;
};
