/**
 * ==========================================================================
 * CONVERSATION CARD COMPONENT
 * ==========================================================================
 * Card showing conversation preview in the conversations list.
 */

import { formatDistanceToNow } from "date-fns";
import { MessageCircle, User } from "lucide-react";
import UnreadBadge from "./UnreadBadge";

const ConversationCard = ({
  conversation,
  isActive = false,
  unreadCount = 0,
  onClick,
}) => {
  const { user, last_message_preview, last_message_at, status } = conversation;

  const userName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email
    : "Unknown User";

  const formattedTime = last_message_at
    ? formatDistanceToNow(new Date(last_message_at), { addSuffix: true })
    : "";

  const isOpen = status === "open";

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-start gap-3 text-left transition-colors
                  hover:bg-slate-700/50 border-b border-slate-700/50
                  ${isActive ? "bg-slate-700/70 border-l-2 border-l-blue-500" : ""}`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${isActive ? "bg-blue-600" : "bg-slate-600"}`}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={userName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-slate-300" />
          )}
        </div>

        {/* Online status indicator */}
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800
                      ${isOpen ? "bg-green-500" : "bg-slate-500"}`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-sm font-medium text-slate-100 truncate">
            {userName}
          </h3>
          <span className="text-xs text-slate-500 flex-shrink-0">
            {formattedTime}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-slate-400 truncate flex-1">
            {last_message_preview || (
              <span className="text-slate-500 italic">No messages yet</span>
            )}
          </p>

          {/* Unread badge */}
          {unreadCount > 0 && <UnreadBadge count={unreadCount} />}
        </div>

        {/* Status badge */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                        ${
                          isOpen
                            ? "bg-green-500/20 text-green-400"
                            : "bg-slate-600/50 text-slate-400"
                        }`}
          >
            <MessageCircle className="w-3 h-3" />
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ConversationCard;
