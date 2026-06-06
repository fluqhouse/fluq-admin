import api from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

/**
 * Get all users with pagination, search, and filters
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=10] - Users per page
 * @param {string} [params.search] - Search by name, email, or user_id
 * @param {string} [params.role] - Filter by role (user, admin, superadmin)
 * @param {string} [params.status] - Filter by status (verified, unverified)
 * @param {string} [params.sortBy] - Sort field (createdAt, updatedAt, first_name, last_name, email)
 * @param {string} [params.sortOrder] - Sort order (ASC, DESC)
 * @returns {Promise<Object>} Users list with pagination
 */
export const getAllUsers = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );

    const response = await api.get("/api/auth/admin/users", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get user by ID
 * @param {string} userId - User ID (user_id, not primary key)
 * @returns {Promise<Object>} User details
 */
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/auth/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Update user status
 * @param {string} userId - User ID
 * @param {Object} data - Update data
 * @param {boolean} [data.is_verified] - Verification status
 * @param {string} [data.role] - User role
 * @returns {Promise<Object>} Updated user
 */
export const updateUserStatus = async (userId, data) => {
  try {
    const response = await api.put(`/api/auth/admin/users/${userId}/status`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Delete user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/auth/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
