import React from "react";
import ViroCore from "./ViroCore";
import "./TypingIndicator.css";

export default function TypingIndicator() {
  return (
    <div className="viro-typing-indicator-row">
      <div className="typing-avatar-wrap">
        <ViroCore size="sm" state="thinking" showRings={false} />
      </div>

      <div className="typing-bubble">
        <div className="typing-waveform">
          <span className="wave-bar bar-1"></span>
          <span className="wave-bar bar-2"></span>
          <span className="wave-bar bar-3"></span>
          <span className="wave-bar bar-4"></span>
          <span className="wave-bar bar-5"></span>
        </div>
        <span className="typing-label">Viro is synthesizing response...</span>
      </div>
    </div>
  );
}
