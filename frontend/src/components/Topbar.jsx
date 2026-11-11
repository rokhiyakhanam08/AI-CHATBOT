import React from "react";
import { MenuIcon, PlusIcon, TrashIcon } from "./Icons";
import "./Topbar.css";

export default function Topbar({
  sidebarOpen,
  onToggleSidebar,
  currentTitle,
  isLoading,
  onNewChat,
  onClearMessages,
  hasMessages,
}) {
  return (
    <header className="viro-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-menu-btn"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <MenuIcon size={19} />
        </button>

        <div className="topbar-info">
          <div className="topbar-title-row">
            <h1 className="topbar-title">
              {currentTitle || "Viro AI"}
            </h1>
            <span className="topbar-version-pill">v2.0</span>
          </div>
          <span className="topbar-subtitle">
            {isLoading ? "Synthesizing response..." : "Your Intelligent AI Companion"}
          </span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Status Pill */}
        <div className={`topbar-status-pill ${isLoading ? "busy" : "ready"}`}>
          <span className="status-orb" />
          <span className="status-text">
            {isLoading ? "Thinking" : "Neural Link Active"}
          </span>
        </div>

        {/* Quick Clear Messages if active messages exist */}
        {hasMessages && (
          <button
            type="button"
            className="topbar-action-btn"
            onClick={onClearMessages}
            title="Reset this chat"
          >
            <TrashIcon size={15} />
            <span className="action-btn-text">Reset</span>
          </button>
        )}

        {/* New Chat quick button */}
        <button
          type="button"
          className="topbar-newchat-btn"
          onClick={onNewChat}
          title="New Chat"
        >
          <PlusIcon size={16} />
          <span className="action-btn-text">New Chat</span>
        </button>
      </div>
    </header>
  );
}
