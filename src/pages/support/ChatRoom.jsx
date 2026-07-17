/**
 * ==========================================================================
 * CHAT ROOM PAGE
 * ==========================================================================
 * Full chat interface for a single conversation.
 */

import { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, AlertCircle } from "lucide-react";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useMessages,
  useCloseConversation,
  useReopenConversation,
} from "../../hooks/queries/useChatQueries";
import useChat from "../../hooks/useChat";
import {
  MessageBubble,
  ChatInput,
  ChatHeader,
} from "../../components/chat";

const ChatRoom = () => {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Fetch conversation messages
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
  } = useMessages(conversationId, 1, 100);

  // Get conversation details from the response
  const conversationDetails = messagesData?.data?.conversation;
  const apiMessages = messagesData?.data?.messages || [];

  // Extract user ID from conversation
  const userId = conversationDetails?.user_id;

  // Use chat hook for real-time messaging
  const {
    messages: realtimeMessages,
    sendMessage,
    joinConversation,
    markAsRead,
    isConnected,
    isSendingMessage,
  } = useChat(conversationId, userId);

  // Mutations
  const closeConversation = useCloseConversation();
  const reopenConversation = useReopenConversation();

  // Join conversation room when userId is available
  useEffect(() => {
    if (userId && isConnected) {
      joinConversation(userId);
      markAsRead(conversationId);
    }
  }, [userId, isConnected, conversationId, joinConversation, markAsRead]);

  // Combine API messages with real-time messages (avoid duplicates)
  const allMessages = useCallback(() => {
    const messageMap = new Map();

    // Add API messages first
    apiMessages.forEach((msg) => {
      messageMap.set(msg.id, msg);
    });

    // Override/add real-time messages
    realtimeMessages.forEach((msg) => {
      messageMap.set(msg.id, msg);
    });

    // Sort by createdAt (oldest first for display)
    return Array.from(messageMap.values()).sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }, [apiMessages, realtimeMessages]);

  const displayMessages = allMessages();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayMessages.length]);

  // Handle sending message
  const handleSendMessage = (content) => {
    if (sendMessage(content)) {
      // Scroll to bottom after sending
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Handle closing conversation
  const handleClose = () => {
    closeConversation.mutate(conversationId);
  };

  // Handle reopening conversation
  const handleReopen = () => {
    reopenConversation.mutate(conversationId);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/support/conversations");
  };

  // Build user object for header
  const user = conversationDetails?.user || null;
  const status = conversationDetails?.status || "open";

  return (
    <Layout noPadding>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Chat Header */}
        <ChatHeader
          user={user}
          status={status}
          onBack={handleBack}
          onClose={handleClose}
          onReopen={handleReopen}
          isConnected={isConnected}
        />

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-1 bg-slate-900"
        >
          {isLoadingMessages ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-slate-400">
                <MessageCircle className="w-8 h-8 animate-pulse mx-auto mb-2" />
                <p>Loading messages...</p>
              </div>
            </div>
          ) : displayMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-slate-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm text-slate-500 mt-1">
                  Start the conversation by sending a message
                </p>
              </div>
            </div>
          ) : (
            <>
              {displayMessages.map((message) => (
                <MessageBubble key={message.id} message={message} isAdmin />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Connection Warning */}
        {!isConnected && (
          <div className="px-4 py-2 bg-yellow-500/10 border-t border-yellow-500/20 flex items-center gap-2 text-sm text-yellow-400">
            <AlertCircle className="w-4 h-4" />
            <span>
              Connecting to chat server... You can still send messages.
            </span>
          </div>
        )}

        {/* Chat Input */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={status === "closed" || isSendingMessage}
          placeholder={
            status === "closed"
              ? "Conversation is closed. Reopen to send messages."
              : isSendingMessage
              ? "Sending..."
              : "Type a message..."
          }
        />
      </div>
    </Layout>
  );
};

export default ChatRoom;
