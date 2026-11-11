import React from "react";
import "./ViroCore.css";

/**
 * ViroCore — The signature holographic AI sphere of Viro AI
 * 
 * @param {'sm' | 'md' | 'lg'} size - sm (36px), md (72px), lg (220px)
 * @param {'idle' | 'thinking' | 'responding'} state - current AI state
 * @param {boolean} showRings - whether to render 3D orbital rings
 * @param {string} className - extra CSS classes
 */
export default function ViroCore({
  size = "lg",
  state = "idle",
  showRings = true,
  className = "",
}) {
  const isSm = size === "sm";
  const isMd = size === "md";
  const isLg = size === "lg";

  // Derive pixel dimensions for viewBox and scaling
  const dim = isSm ? 40 : isMd ? 76 : 240;

  return (
    <div
      className={`viro-core-wrapper size-${size} state-${state} ${className}`}
      style={{ width: `${dim}px`, height: `${dim}px` }}
      aria-label={`Viro Core (${state})`}
    >
      {/* Ambient background volumetric glow */}
      <div className="viro-core-ambient" />

      {/* SVG-based 3D Orbital Rings & Holographic Flux */}
      <svg
        className="viro-core-svg"
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient for the central plasma orb */}
          <radialGradient
            id={`plasmaGrad-${size}`}
            cx="45%"
            cy="45%"
            r="60%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="72%" stopColor="#8b5cf6" stopOpacity="0.75" />
            <stop offset="92%" stopColor="#4c1d95" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.9" />
          </radialGradient>

          {/* Internal energy corona */}
          <radialGradient
            id={`coronaGrad-${size}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          {/* Linear gradients for orbital rings */}
          <linearGradient
            id={`ringGrad1-${size}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient
            id={`ringGrad2-${size}`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient
            id={`ringGrad3-${size}`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
          </linearGradient>

          {/* Glow filter */}
          <filter id={`coreGlow-${size}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isSm ? 1.5 : isMd ? 3 : 6} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbit Ring 1 - Outer Tilted Cyan Orbit */}
        {showRings && (
          <g className="orbit-group ring-1">
            <ellipse
              cx={dim / 2}
              cy={dim / 2}
              rx={dim * 0.44}
              ry={dim * 0.16}
              stroke={`url(#ringGrad1-${size})`}
              strokeWidth={isSm ? 1 : 1.5}
              strokeDasharray={isSm ? "none" : "6 4"}
              className="ring-path"
            />
            {/* Orbital bead */}
            {!isSm && (
              <circle
                cx={dim / 2 + dim * 0.44}
                cy={dim / 2}
                r={isMd ? 2 : 3}
                fill="#22d3ee"
                filter={`url(#coreGlow-${size})`}
                className="orbit-bead bead-1"
              />
            )}
          </g>
        )}

        {/* Orbit Ring 2 - Counter-rotating Violet Orbit */}
        {showRings && (
          <g className="orbit-group ring-2">
            <ellipse
              cx={dim / 2}
              cy={dim / 2}
              rx={dim * 0.40}
              ry={dim * 0.17}
              stroke={`url(#ringGrad2-${size})`}
              strokeWidth={isSm ? 1 : 1.5}
              className="ring-path"
            />
            {!isSm && (
              <circle
                cx={dim / 2 - dim * 0.40}
                cy={dim / 2}
                r={isMd ? 2 : 2.5}
                fill="#c084fc"
                filter={`url(#coreGlow-${size})`}
                className="orbit-bead bead-2"
              />
            )}
          </g>
        )}

        {/* Orbit Ring 3 - Equatorial Precision Ring (large only) */}
        {showRings && isLg && (
          <g className="orbit-group ring-3">
            <ellipse
              cx={dim / 2}
              cy={dim / 2}
              rx={dim * 0.35}
              ry={dim * 0.35}
              stroke={`url(#ringGrad3-${size})`}
              strokeWidth="1"
              strokeDasharray="2 6"
              className="ring-path"
            />
          </g>
        )}

        {/* Outer Plasma Energy Corona */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={dim * 0.28}
          fill={`url(#coronaGrad-${size})`}
          className="corona-circle"
        />

        {/* Central Core Holographic Sphere */}
        <g className="core-orb-group">
          {/* Energy ripple 1 */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={dim * 0.22}
            className="energy-ripple ripple-1"
            stroke="#22d3ee"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Energy ripple 2 */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={dim * 0.25}
            className="energy-ripple ripple-2"
            stroke="#8b5cf6"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Main Plasma Body */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={dim * 0.21}
            fill={`url(#plasmaGrad-${size})`}
            filter={`url(#coreGlow-${size})`}
            className="plasma-body"
          />

          {/* Inner Quantum Spark (Hot luminous center) */}
          <circle
            cx={dim / 2 - dim * 0.02}
            cy={dim / 2 - dim * 0.02}
            r={dim * 0.06}
            fill="#ffffff"
            className="inner-spark"
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={dim * 0.09}
            fill="#a5f3fc"
            opacity="0.75"
            className="spark-halo"
          />
        </g>
      </svg>
    </div>
  );
}
