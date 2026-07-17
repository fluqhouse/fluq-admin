/**
 * ==========================================================================
 * CHAT REACT QUERY HOOKS
 * ==========================================================================
 * React Query hooks for chat data fetching.
 */

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { chatAPI } from "../../services/api/chat.js";
import toast from "react-hot-toast";

const QUERY_KEYS = {
  CHAT: "chat",
  CONVERSATIONS: "conversations",
  MESSAGES: "messages",
  STATS: "stats",
};

/**
 * Hook to fetch all conversations
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {Object} options - Additional query options
 */
export const useConversations = (page = 1, limit = 20, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.CONVERSATIONS, page, limit],
    queryFn: () => chatAPI.getConversations(page, limit),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30000, // Refetch every 30 seconds
    ...options,
  });
};

/**
 * Hook to fetch messages for a conversation with infinite scroll
 * @param {number|string} conversationId - Conversation ID
 * @param {Object} options - Additional query options
 */
export const useConversationMessages = (conversationId, options = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.MESSAGES, conversationId],
    queryFn: ({ pageParam = 1 }) =>
      chatAPI.getMessages(conversationId, pageParam, 50),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data || lastPage;
      if (pagination.page < pagination.totalPages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    enabled: !!conversationId,
    staleTime: 30 * 1000, // 30 seconds
    ...options,
  });
};

/**
 * Hook to fetch messages for a conversation (non-infinite)
 * @param {number|string} conversationId - Conversation ID
 * @param {number} page - Page number
 * @param {number} limit - Messages per page
 * @param {Object} options - Additional query options
 */
export const useMessages = (conversationId, page = 1, limit = 50, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.MESSAGES, conversationId, page, limit],
    queryFn: () => chatAPI.getMessages(conversationId, page, limit),
    enabled: !!conversationId,
    staleTime: 30 * 1000,
    ...options,
  });
};

/**
 * Hook to fetch chat statistics
 * @param {Object} options - Additional query options
 */
export const useChatStats = (options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.STATS],
    queryFn: () => chatAPI.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to close a conversation
 */
export const useCloseConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatAPI.closeConversation,
    onSuccess: (data, conversationId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.CONVERSATIONS],
      });
      toast.success("Conversation closed");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to close conversation";
      toast.error(message);
    },
  });
};

/**
 * Hook to reopen a conversation
 */
export const useReopenConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatAPI.reopenConversation,
    onSuccess: (data, conversationId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.CONVERSATIONS],
      });
      toast.success("Conversation reopened");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to reopen conversation";
      toast.error(message);
    },
  });
};

/**
 * Hook to mark messages as read
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatAPI.markAsRead,
    onSuccess: (data, conversationId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.CONVERSATIONS],
      });
    },
    onError: (error) => {
      console.error("Failed to mark as read:", error);
    },
  });
};

/**
 * Hook to send a message via REST API
 * @param {Object} options - Mutation options
 */
export const useSendMessage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, content }) =>
      chatAPI.sendMessage(conversationId, content),
    onSuccess: (data, variables) => {
      // Add the new message to the cache
      const message = data.data?.message;
      if (message) {
        addMessageToCache(queryClient, variables.conversationId, message);
      }
      // Invalidate conversations to update last_message_preview
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHAT, QUERY_KEYS.CONVERSATIONS],
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.error?.message || "Failed to send message";
      toast.error(message);
    },
    ...options,
  });
};

/**
 * Helper to invalidate all chat queries
 * @param {QueryClient} queryClient - React Query client
 */
export const invalidateChatQueries = (queryClient) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT] });
};

/**
 * Helper to add a new message to the cache optimistically
 * @param {QueryClient} queryClient - React Query client
 * @param {number|string} conversationId - Conversation ID
 * @param {Object} message - New message object
 */
export const addMessageToCache = (queryClient, conversationId, message) => {
  queryClient.setQueryData(
    [QUERY_KEYS.CHAT, QUERY_KEYS.MESSAGES, conversationId],
    (oldData) => {
      if (!oldData) return oldData;

      // For infinite query data structure
      if (oldData.pages) {
        const newPages = [...oldData.pages];
        if (newPages[0]?.data?.messages) {
          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              messages: [message, ...newPages[0].data.messages],
            },
          };
        }
        return { ...oldData, pages: newPages };
      }

      // For regular query data structure
      if (oldData.data?.messages) {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            messages: [message, ...oldData.data.messages],
          },
        };
      }

      return oldData;
    }
  );
};

export { QUERY_KEYS };
