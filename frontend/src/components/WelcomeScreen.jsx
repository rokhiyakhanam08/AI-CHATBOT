import React from "react";
import ViroCore from "./ViroCore";
import { CodeIcon, BrainIcon, SparklesIcon, CompassIcon, ZapIcon } from "./Icons";
import "./WelcomeScreen.css";

const SUGGESTIONS = [
  {
    icon: <CodeIcon size={20} />,
    tag: "Coding & Design",
    title: "FastAPI & Microservices Architecture",
    prompt: "Design a clean, modular Python FastAPI architecture with dependency injection and error handling.",
  },
  {
    icon: <BrainIcon size={20} />,
    tag: "Deep Concepts",
    title: "Quantum Entanglement & Physics",
    prompt: "Explain quantum entanglement in clear, vivid real-world analogies that anyone can understand.",
  },
  {
    icon: <SparklesIcon size={20} />,
    tag: "Creative Vision",
    title: "Next-Gen AI Startup Innovations",
    prompt: "Brainstorm 4 high-impact AI agent applications tackling real-world workflow automation.",
  },
  {
    icon: <CompassIcon size={20} />,
    tag: "Exploration",
    title: "Context Windows & Neural Memory",
    prompt: "How do modern LLMs manage context windows and multi-turn conversations under the hood?",
  },
];

export default function WelcomeScreen({ onSelectSuggestion, isThinking = false }) {
  return (
    <div className="viro-welcome-screen">
      {/* Background radial ambient aura */}
      <div className="welcome-ambient-glow" />

      {/* Signature Feature: VIRO CORE Holographic Sphere */}
      <div className="welcome-core-container">
        <ViroCore size="lg" state={isThinking ? "thinking" : "idle"} showRings={true} />
      </div>

      {/* Warm, Engaging Brand Greeting */}
      <div className="welcome-header">
        <div className="welcome-badge">
          <ZapIcon size={13} className="welcome-badge-icon" />
          <span>NEURAL COMPANION v2.0</span>
        </div>
        <h2 className="welcome-headline">
          Hey, welcome to <span className="text-gradient">Viro</span>.
        </h2>
        <p className="welcome-tagline">
          What are we exploring today?
        </p>
        <p className="welcome-subtext">
          I'm your intelligent companion for deep reasoning, creative synthesis, and full-stack engineering.
        </p>
      </div>

      {/* Contextual Suggestion Cards */}
      <div className="welcome-suggestions-grid">
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="suggestion-card"
            onClick={() => onSelectSuggestion(item.prompt)}
          >
            <div className="suggestion-card-top">
              <div className="suggestion-icon-wrap">{item.icon}</div>
              <span className="suggestion-tag">{item.tag}</span>
            </div>
            <div className="suggestion-body">
              <span className="suggestion-title">{item.title}</span>
              <p className="suggestion-prompt">"{item.prompt}"</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
