import React, { useState } from "react";
import ViroCore from "./ViroCore";
import MarkdownRenderer from "./MarkdownRenderer";
import { CopyIcon, CheckIcon, RefreshIcon, UserIcon, SparklesIcon } from "./Icons";
import "./ChatMessage.css";

export default function ChatMessage({
  message,
  isLast,
  isLoading,
  onRegenerate,
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = message.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`chat-message-row ${isUser ? "user-row" : "assistant-row"}`}>
      {/* Avatar */}
      <div className="message-avatar-wrap">
        {isUser ? (
          <div className="user-avatar-badge" title="You">
            <UserIcon size={16} />
          </div>
        ) : (
          <div className="assistant-avatar-badge" title="Viro AI">
            <ViroCore size="sm" state={isLoading && isLast ? "thinking" : "idle"} showRings={false} />
          </div>
        )}
      </div>

      {/* Message Body */}
      <div className="message-content-container">
        {/* Header Metadata */}
        <div className="message-meta-header">
          <span className="message-sender-name">
            {isUser ? "You" : "Viro AI"}
          </span>
          {!isUser && (
            <span className="assistant-role-tag">
              <SparklesIcon size={11} className="sparkle-icon" />
              Companion
            </span>
          )}
          {formattedTime && (
            <span className="message-timestamp">{formattedTime}</span>
          )}
        </div>

        {/* Message Bubble / Card */}
        <div className={`message-bubble-body ${isUser ? "user-bubble" : "assistant-bubble"}`}>
          {isUser ? (
            <div className="user-text-content">{message.content}</div>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {/* Action Bar for Assistant Messages */}
        {!isUser && (
          <div className="message-action-bar">
            {/* Copy Button */}
            <button
              type="button"
              className={`msg-action-btn ${copied ? "active" : ""}`}
              onClick={handleCopyMessage}
              title="Copy response to clipboard"
            >
              {copied ? (
                <>
                  <CheckIcon size={13} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Regenerate Button (available on last assistant message when not loading) */}
            {isLast && onRegenerate && (
              <button
                type="button"
                className="msg-action-btn"
                onClick={onRegenerate}
                disabled={isLoading}
                title="Regenerate this response"
              >
                <RefreshIcon size={13} className={isLoading ? "spin" : ""} />
                <span>Regenerate</span>
              </button>
            )}

            <div className="model-chip">
              <span>Gemini 3.5 Flash</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
