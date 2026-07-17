/**
 * ==========================================================================
 * CHAT API SERVICE
 * ==========================================================================
 * REST API calls for chat functionality.
 */

import api from "./axios.js";

export const chatAPI = {
  /**
   * Get all conversations for admin dashboard
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 20)
   * @returns {Promise<Object>} Conversations list with pagination
   */
  getConversations: async (page = 1, limit = 20) => {
    const response = await api.get("/api/chat/admin/conversations", {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get messages for a specific conversation
   * @param {number|string} conversationId - Conversation ID
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Messages per page (default: 50)
   * @returns {Promise<Object>} Messages list with pagination
   */
  getMessages: async (conversationId, page = 1, limit = 50) => {
    const response = await api.get(
      `/api/chat/admin/conversations/${conversationId}/messages`,
      { params: { page, limit } }
    );
    return response.data;
  },

  /**
   * Get conversation by user ID (for admin to access a user's chat)
   * @param {number|string} userId - User ID
   * @returns {Promise<Object>} Conversation data
   */
  getConversationByUser: async (userId) => {
    const response = await api.get(`/api/chat/admin/user/${userId}`);
    return response.data;
  },

  /**
   * Get chat statistics for dashboard
   * @returns {Promise<Object>} Chat statistics
   */
  getStats: async () => {
    const response = await api.get("/api/chat/admin/stats");
    return response.data;
  },

  /**
   * Close a conversation
   * @param {number|string} conversationId - Conversation ID
   * @returns {Promise<Object>} Updated conversation
   */
  closeConversation: async (conversationId) => {
    const response = await api.patch(
      `/api/chat/admin/conversations/${conversationId}/close`
    );
    return response.data;
  },

  /**
   * Reopen a closed conversation
   * @param {number|string} conversationId - Conversation ID
   * @returns {Promise<Object>} Updated conversation
   */
  reopenConversation: async (conversationId) => {
    const response = await api.patch(
      `/api/chat/admin/conversations/${conversationId}/reopen`
    );
    return response.data;
  },

  /**
   * Mark messages as read
   * @param {number|string} conversationId - Conversation ID
   * @returns {Promise<Object>} Result
   */
  markAsRead: async (conversationId) => {
    const response = await api.patch(
      `/api/chat/admin/conversations/${conversationId}/read`
    );
    return response.data;
  },

  /**
   * Send a message to a conversation (REST API)
   * @param {number|string} conversationId - Conversation ID
   * @param {string} content - Message content
   * @returns {Promise<Object>} Created message
   */
  sendMessage: async (conversationId, content) => {
    const response = await api.post(
      `/api/chat/admin/conversations/${conversationId}/message`,
      { content }
    );
    return response.data;
  },
};
