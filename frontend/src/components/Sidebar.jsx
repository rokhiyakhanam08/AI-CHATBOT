import React from "react";
import ViroCore from "./ViroCore";
import { PlusIcon, TrashIcon, MessageSquareIcon, ChevronLeftIcon, ZapIcon } from "./Icons";
import "./Sidebar.css";

export default function Sidebar({
  isOpen,
  onToggle,
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onClearAll,
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`sidebar-backdrop ${isOpen ? "active" : ""}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <aside className={`viro-sidebar ${isOpen ? "expanded" : "collapsed"}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-wrapper">
          <div className="sidebar-brand" onClick={onNewChat} title="Viro AI Home">
            <ViroCore size="sm" showRings={true} state="idle" />
            <div className="brand-text-group">
              <div className="brand-title-row">
                <span className="brand-title">Viro AI</span>
                <span className="brand-badge">PRO</span>
              </div>
              <span className="brand-tagline">Intelligent Companion</span>
            </div>
          </div>

          {/* Close button for mobile / collapse toggle */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onToggle}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            <ChevronLeftIcon size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="new-chat-container">
          <button
            type="button"
            className="new-chat-button"
            onClick={onNewChat}
            title="Start fresh conversation (Ctrl+N)"
          >
            <span className="new-chat-icon-wrap">
              <PlusIcon size={18} />
            </span>
            <span className="new-chat-label">New Exploration</span>
            <span className="new-chat-shortcut">⌘N</span>
          </button>
        </div>

        {/* Conversation History Section */}
        <div className="conversations-section">
          <div className="conversations-header">
            <span className="conversations-title">Recent Chats</span>
            {conversations && conversations.length > 0 && (
              <button
                type="button"
                className="clear-all-btn"
                onClick={onClearAll}
                title="Clear all saved history"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="conversations-list">
            {(!conversations || conversations.length === 0) ? (
              <div className="empty-history">
                <div className="empty-history-icon">
                  <MessageSquareIcon size={24} />
                </div>
                <p>No previous conversations.</p>
                <span>Ask Viro anything to start saving history.</span>
              </div>
            ) : (
              conversations.map((conv) => {
                const isActive = conv.id === activeId;
                return (
                  <div
                    key={conv.id}
                    className={`conversation-item ${isActive ? "active" : ""}`}
                    onClick={() => onSelectConversation(conv.id)}
                  >
                    <MessageSquareIcon size={16} className="conv-icon" />
                    <span className="conv-title" title={conv.title}>
                      {conv.title || "Untitled Conversation"}
                    </span>
                    <button
                      type="button"
                      className="delete-conv-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                      title="Delete conversation"
                      aria-label="Delete conversation"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Footer info */}
        <div className="sidebar-footer">
          <div className="status-indicator-card">
            <div className="status-ping-wrap">
              <span className="status-dot"></span>
              <span className="status-ping"></span>
            </div>
            <div className="status-details">
              <div className="status-headline">
                <span>Neural Core Active</span>
                <ZapIcon size={13} className="zap-icon" />
              </div>
              <span className="status-sub">Gemini 3.5 Flash Engine</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
