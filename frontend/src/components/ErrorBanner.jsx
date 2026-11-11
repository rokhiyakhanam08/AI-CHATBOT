import React from "react";
import { AlertTriangleIcon, RefreshIcon, CloseIcon } from "./Icons";
import "./ErrorBanner.css";

export default function ErrorBanner({ error, onRetry, onDismiss }) {
  if (!error) return null;

  return (
    <div className="viro-error-banner" role="alert">
      <div className="error-icon-box">
        <AlertTriangleIcon size={18} />
      </div>

      <div className="error-content">
        <span className="error-title">Neural Communication Alert</span>
        <p className="error-message-text">{error}</p>
      </div>

      <div className="error-actions">
        {onRetry && (
          <button
            type="button"
            className="error-retry-btn"
            onClick={onRetry}
            title="Retry last request"
          >
            <RefreshIcon size={13} />
            <span>Retry</span>
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            className="error-dismiss-btn"
            onClick={onDismiss}
            aria-label="Dismiss error"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
