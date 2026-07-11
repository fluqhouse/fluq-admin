/**
 * ==========================================================================
 * CONVERSATION LIST PAGE
 * ==========================================================================
 * Lists all conversations with search and filter capabilities.
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MessageCircle, RefreshCw } from "lucide-react";
import Layout from "../../components/dashboard/layouts/Layout";
import PageHeader from "../../components/dashboard/reuseables/PageHeader";
import { useConversations } from "../../hooks/queries/useChatQueries";
import useChat from "../../hooks/useChat";
import { ConversationCard } from "../../components/chat";

const ConversationList = () => {
  const navigate = useNavigate();

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, open, closed
  const [page, setPage] = useState(1);

  // Fetch conversations
  const {
    data: conversationsData,
    isLoading,
    refetch,
    isFetching,
  } = useConversations(page, 50);

  // Get real-time unread counts
  const { unreadCounts, isConnected } = useChat();

  const conversations = conversationsData?.data?.conversations || [];
  const pagination = conversationsData?.data?.pagination || {};

  // Filter conversations
  const filteredConversations = useMemo(() => {
    let filtered = conversations;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        const userName = c.user
          ? `${c.user.first_name || ""} ${c.user.last_name || ""} ${c.user.email || ""}`
              .toLowerCase()
          : "";
        return (
          userName.includes(query) ||
          c.last_message_preview?.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [conversations, statusFilter, searchQuery]);

  // Stats
  const openCount = conversations.filter((c) => c.status === "open").length;
  const closedCount = conversations.filter((c) => c.status === "closed").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Conversations"
          description="View and manage all customer support conversations"
        />

        {/* Connection Status */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
            isConnected
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-400 animate-pulse" : "bg-yellow-400"
            }`}
          />
          {isConnected ? "Real-time updates active" : "Connecting..."}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 text-slate-100 placeholder-slate-400
                         rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-1
                         focus:ring-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-slate-800 text-slate-100 rounded-lg border border-slate-700
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="all">All ({conversations.length})</option>
              <option value="open">Open ({openCount})</option>
              <option value="closed">Closed ({closedCount})</option>
            </select>
          </div>

          {/* Refresh button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="px-4 py-2.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600
                       disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Conversations List */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-slate-500" />
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">
                {searchQuery || statusFilter !== "all"
                  ? "No conversations match your filters"
                  : "No conversations yet"}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Conversations will appear here when users start chatting"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {filteredConversations.map((conversation) => (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  unreadCount={unreadCounts[conversation.user_id] || 0}
                  onClick={() =>
                    navigate(`/support/conversations/${conversation.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4">
            <p className="text-sm text-slate-400">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total}{" "}
              conversations)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ConversationList;
