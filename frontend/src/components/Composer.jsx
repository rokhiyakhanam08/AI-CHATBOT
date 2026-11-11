import React, { useRef, useEffect } from "react";
import { ArrowUpIcon, SparklesIcon } from "./Icons";
import "./Composer.css";

export default function Composer({
  input,
  setInput,
  onSend,
  isLoading,
  placeholder = "Message Viro AI... (Shift + Enter for new line)",
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea to fit content smoothly up to max height
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const nextHeight = Math.min(el.scrollHeight, 160);
    el.style.height = `${Math.max(nextHeight, 26)}px`;
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSend();
      }
    }
  };

  const canSend = Boolean(input.trim()) && !isLoading;

  return (
    <div className="viro-composer-container">
      <div className={`composer-input-card ${isLoading ? "loading" : ""}`}>
        {/* Left spark indicator */}
        <div className="composer-spark-wrap" title="Neural Input Ready">
          <SparklesIcon size={18} className="composer-spark-icon" />
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          className="composer-textarea"
          aria-label="Message Viro AI"
        />

        {/* Action Group */}
        <div className="composer-action-group">
          <button
            type="button"
            className="composer-send-btn"
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send message"
            title={canSend ? "Send message (Enter)" : "Enter a message"}
          >
            <ArrowUpIcon size={18} />
          </button>
        </div>
      </div>

      <div className="composer-footer-text">
        <span>Viro AI may produce inaccurate info. Verify critical outputs. Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for newline.</span>
      </div>
    </div>
  );
}
