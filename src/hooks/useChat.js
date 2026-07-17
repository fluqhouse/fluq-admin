/**
 * ==========================================================================
 * CHAT HOOK
 * ==========================================================================
 * Combines WebSocket and REST API for complete chat functionality.
 * Handles real-time messaging, conversation management, and alerts.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "./useWebSocket";
import {
  useConversations,
  useConversationMessages,
  useMarkAsRead,
  useSendMessage,
  addMessageToCache,
  QUERY_KEYS,
} from "./queries/useChatQueries";
import useAuth from "./useAuth";

/**
 * Chat hook for admin chat functionality
 * @param {number|string} activeConversationId - Currently active conversation ID
 * @param {number|string} activeUserId - User ID of the active conversation
 * @returns {Object} Chat state and methods
 */
const useChat = (activeConversationId = null, activeUserId = null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Local state
  const [messages, setMessages] = useState([]);
  const [newMessageAlerts, setNewMessageAlerts] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const currentRoomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // WebSocket connection
  const {
    isConnected,
    isConnecting,
    error: wsError,
    subscribe,
    unsubscribe,
    emit,
  } = useWebSocket({ autoConnect: true });

  // REST API queries
  const {
    data: conversationsData,
    isLoading: isLoadingConversations,
    refetch: refetchConversations,
  } = useConversations(1, 50);

  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useConversationMessages(activeConversationId);

  // Mutations
  const markAsReadMutation = useMarkAsRead();
  const sendMessageMutation = useSendMessage();

  // Join admin global room for alerts
  useEffect(() => {
    if (isConnected) {
      emit("join_admin_global");
    }
  }, [isConnected, emit]);

  // Handle joining a specific conversation room
  const joinConversation = useCallback(
    (userId) => {
      if (!isConnected || !userId) return;

      // Leave previous room
      if (currentRoomRef.current && currentRoomRef.current !== userId) {
        // Socket.io handles room leaving automatically when joining new room
      }

      emit("join_room", { conversationUserId: userId });
      currentRoomRef.current = userId;
    },
    [isConnected, emit]
  );

  // Auto-join room when activeUserId changes
  useEffect(() => {
    if (activeUserId && isConnected) {
      joinConversation(activeUserId);
    }
  }, [activeUserId, isConnected, joinConversation]);

  // Handle incoming messages
  useEffect(() => {
    if (!isConnected) return;

    const handleReceiveMessage = (message) => {
      // Add message to local state immediately for instant UI update
      setMessages((prev) => {
        // Avoid duplicates
        if (prev.some((m) => m.id === message.id)) return prev;
        return [message, ...prev];
      });

      // Update cache
      if (activeConversationId) {
        addMessageToCache(queryClient, activeConversationId, message);
      }

      // Refetch conversations to update last message preview
      refetchConversations();
    };

    subscribe("receive_message", handleReceiveMessage);

    return () => {
      unsubscribe("receive_message", handleReceiveMessage);
    };
  }, [
    isConnected,
    subscribe,
    unsubscribe,
    activeConversationId,
    queryClient,
    refetchConversations,
  ]);

  // Handle admin global alerts (new messages from users)
  useEffect(() => {
    if (!isConnected) return;

    const handleNewMessageAlert = (alert) => {
      const { conversationUserId, message } = alert;

      // Don't alert for messages from the current conversation
      if (currentRoomRef.current === conversationUserId) return;

      // Add to alerts
      setNewMessageAlerts((prev) => {
        // Keep last 10 alerts
        const newAlerts = [alert, ...prev].slice(0, 10);
        return newAlerts;
      });

      // Update unread counts
      setUnreadCounts((prev) => ({
        ...prev,
        [conversationUserId]: (prev[conversationUserId] || 0) + 1,
      }));

      // Refetch conversations list
      refetchConversations();
    };

    subscribe("admin_new_message_alert", handleNewMessageAlert);

    return () => {
      unsubscribe("admin_new_message_alert", handleNewMessageAlert);
    };
  }, [isConnected, subscribe, unsubscribe, refetchConversations]);

  // Handle errors
  useEffect(() => {
    if (!isConnected) return;

    const handleError = (error) => {
      console.error("[Chat] Socket error:", error);
    };

    subscribe("error", handleError);

    return () => {
      unsubscribe("error", handleError);
    };
  }, [isConnected, subscribe, unsubscribe]);

  // Sync messages from REST API
  useEffect(() => {
    if (messagesData?.pages) {
      const allMessages = messagesData.pages.flatMap(
        (page) => page.data?.messages || page.messages || []
      );
      setMessages(allMessages);
    }
  }, [messagesData]);

  // Send a message (with REST fallback)
  const sendMessage = useCallback(
    async (content) => {
      if (!activeUserId || !activeConversationId || !content.trim()) {
        return false;
      }

      const trimmedContent = content.trim();

      // Try WebSocket first if connected
      if (isConnected) {
        try {
          emit("send_message", {
            conversationUserId: activeUserId,
            content: trimmedContent,
          });
          return true;
        } catch (wsError) {
          console.warn("[Chat] WebSocket send failed, falling back to REST:", wsError);
        }
      }

      // Fall back to REST API
      try {
        await sendMessageMutation.mutateAsync({
          conversationId: activeConversationId,
          content: trimmedContent,
        });
        return true;
      } catch (restError) {
        console.error("[Chat] REST send failed:", restError);
        return false;
      }
    },
    [isConnected, activeUserId, activeConversationId, emit, sendMessageMutation]
  );

  // Expose mutation state for UI feedback
  const isSendingMessage = sendMessageMutation.isPending;

  // Mark conversation as read
  const markAsRead = useCallback(
    (conversationId) => {
      if (conversationId) {
        markAsReadMutation.mutate(conversationId);

        // Clear unread count locally
        setUnreadCounts((prev) => {
          const newCounts = { ...prev };
          delete newCounts[conversationId];
          return newCounts;
        });
      }
    },
    [markAsReadMutation]
  );

  // Clear a specific alert
  const clearAlert = useCallback((alertIndex) => {
    setNewMessageAlerts((prev) => prev.filter((_, i) => i !== alertIndex));
  }, []);

  // Clear all alerts
  const clearAllAlerts = useCallback(() => {
    setNewMessageAlerts([]);
  }, []);

  // Load more messages (for infinite scroll)
  const loadMoreMessages = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Get conversations list
  const conversations = conversationsData?.data?.conversations || [];
  const conversationsPagination = conversationsData?.data?.pagination || {};

  return {
    // Connection state
    isConnected,
    isConnecting,
    wsError,

    // Messages
    messages,
    isLoadingMessages,
    isSendingMessage,
    loadMoreMessages,
    hasMoreMessages: hasNextPage,
    isLoadingMoreMessages: isFetchingNextPage,

    // Conversations
    conversations,
    conversationsPagination,
    isLoadingConversations,
    refetchConversations,

    // Alerts
    newMessageAlerts,
    unreadCounts,
    clearAlert,
    clearAllAlerts,

    // Actions
    sendMessage,
    joinConversation,
    markAsRead,

    // Typing indicator (placeholder for future implementation)
    isTyping,
  };
};

export default useChat;
