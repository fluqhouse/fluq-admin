/**
 * ==========================================================================
 * CHAT INPUT COMPONENT
 * ==========================================================================
 * Text input with send button for composing messages.
 */

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

const ChatInput = ({ onSend, disabled = false, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4 bg-slate-800 border-t border-slate-700"
    >
      {/* Attachment button (placeholder for future) */}
      <button
        type="button"
        className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
        title="Attach file (coming soon)"
        disabled
      >
        <Paperclip className="w-5 h-5" />
      </button>

      {/* Message input */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full px-4 py-2.5 bg-slate-700 text-slate-100 placeholder-slate-400
                     rounded-xl border border-slate-600 focus:border-blue-500 focus:ring-1
                     focus:ring-blue-500 outline-none resize-none transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: "44px", maxHeight: "120px" }}
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;
