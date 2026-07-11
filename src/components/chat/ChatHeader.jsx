/**
 * ==========================================================================
 * CHAT HEADER COMPONENT
 * ==========================================================================
 * Header showing user info, status, and actions for a conversation.
 */

import { ArrowLeft, User, MoreVertical, XCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const ChatHeader = ({
  user,
  status = "open",
  onBack,
  onClose,
  onReopen,
  isConnected = false,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const userName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email
    : "Unknown User";

  const isOpen = status === "open";

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
      {/* Left side - Back button and user info */}
      <div className="flex items-center gap-3">
        {/* Back button */}
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
          title="Back to conversations"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* User avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-slate-300" />
            )}
          </div>
          {/* Online status */}
          <div
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-800
                        ${isOpen ? "bg-green-500" : "bg-slate-500"}`}
          />
        </div>

        {/* User info */}
        <div>
          <h2 className="text-sm font-medium text-slate-100">{userName}</h2>
          <div className="flex items-center gap-2 text-xs">
            <span className={isOpen ? "text-green-400" : "text-slate-500"}>
              {isOpen ? "Active conversation" : "Conversation closed"}
            </span>
            {isConnected ? (
              <span className="flex items-center gap-1 text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Live
              </span>
            ) : (
              <span className="text-yellow-500">Connecting...</span>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-48 bg-slate-700 rounded-lg shadow-xl border border-slate-600 z-20 overflow-hidden">
              {isOpen ? (
                <button
                  onClick={() => {
                    onClose?.();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4 text-red-400" />
                  Close Conversation
                </button>
              ) : (
                <button
                  onClick={() => {
                    onReopen?.();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Reopen Conversation
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
