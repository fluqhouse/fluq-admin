/**
 * ==========================================================================
 * SUPPORT DASHBOARD PAGE
 * ==========================================================================
 * Overview dashboard for support admins showing stats and recent conversations.
 */

import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Layout from "../../components/dashboard/layouts/Layout";
import PageHeader from "../../components/dashboard/reuseables/PageHeader";
import { useConversations } from "../../hooks/queries/useChatQueries";
import useChat from "../../hooks/useChat";
import { ConversationCard } from "../../components/chat";

const SupportDashboard = () => {
  const navigate = useNavigate();

  // Fetch conversations
  const { data: conversationsData, isLoading } = useConversations(1, 10);

  // Get real-time alerts
  const { newMessageAlerts, unreadCounts, isConnected, clearAlert } = useChat();

  const conversations = conversationsData?.data?.conversations || [];

  // Calculate stats
  const totalConversations = conversations.length;
  const openConversations = conversations.filter(
    (c) => c.status === "open"
  ).length;
  const closedConversations = totalConversations - openConversations;
  const totalUnread = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const stats = [
    {
      label: "Total Conversations",
      value: totalConversations,
      icon: MessageCircle,
      color: "blue",
    },
    {
      label: "Open Conversations",
      value: openConversations,
      icon: Clock,
      color: "green",
    },
    {
      label: "Closed",
      value: closedConversations,
      icon: CheckCircle,
      color: "slate",
    },
    {
      label: "Unread Messages",
      value: totalUnread,
      icon: AlertCircle,
      color: "red",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    slate: "bg-slate-500/20 text-slate-400",
    red: "bg-red-500/20 text-red-400",
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Support Dashboard"
          description="Manage customer conversations and support requests"
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
          {isConnected
            ? "Connected to real-time chat"
            : "Connecting to chat server..."}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-100 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${colorClasses[stat.color]}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Message Alerts */}
        {newMessageAlerts.length > 0 && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">
                New Message Alerts
              </h2>
              <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                {newMessageAlerts.length} new
              </span>
            </div>
            <div className="divide-y divide-slate-700/50">
              {newMessageAlerts.slice(0, 5).map((alert, index) => (
                <div
                  key={index}
                  className="px-5 py-3 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                      <Users className="w-4 h-4 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-200">
                        New message from User #{alert.conversationUserId}
                      </p>
                      <p className="text-xs text-slate-500 truncate max-w-xs">
                        {alert.message?.content}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/support/conversations/${alert.conversationUserId}`);
                      clearAlert(index);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Conversations */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">
              Recent Conversations
            </h2>
            <button
              onClick={() => navigate("/support/conversations")}
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-400">
              Loading conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No conversations yet</p>
              <p className="text-sm text-slate-500">
                When users start chatting, conversations will appear here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {conversations.slice(0, 5).map((conversation) => (
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
      </div>
    </Layout>
  );
};

export default SupportDashboard;
