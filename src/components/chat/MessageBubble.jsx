/**
 * ==========================================================================
 * MESSAGE BUBBLE COMPONENT
 * ==========================================================================
 * Displays individual chat messages with different styling for user/admin.
 */

import { formatDistanceToNow } from "date-fns";

const MessageBubble = ({ message, isAdmin = false }) => {
  const { content, sender_type, createdAt, is_read } = message;

  const isFromAdmin = sender_type === "admin";
  const formattedTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "";

  return (
    <div
      className={`flex ${isFromAdmin ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
          isFromAdmin
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-slate-700 text-slate-100 rounded-bl-md"
        }`}
      >
        {/* Sender label */}
        <div
          className={`text-xs mb-1 font-medium ${
            isFromAdmin ? "text-blue-200" : "text-slate-400"
          }`}
        >
          {isFromAdmin ? "Support" : "User"}
        </div>

        {/* Message content */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </p>

        {/* Timestamp and read status */}
        <div
          className={`flex items-center justify-end gap-1.5 mt-1 text-xs ${
            isFromAdmin ? "text-blue-200" : "text-slate-500"
          }`}
        >
          <span>{formattedTime}</span>
          {isFromAdmin && (
            <span className="flex items-center">
              {is_read ? (
                <svg
                  className="w-3.5 h-3.5 text-blue-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-blue-300/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
