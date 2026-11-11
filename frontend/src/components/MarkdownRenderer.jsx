import React, { useState } from "react";
import { marked } from "marked";
import { CopyIcon, CheckIcon, TerminalIcon } from "./Icons";
import "./MarkdownRenderer.css";

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Interactive CodeBlock component with copy functionality
 */
export function CodeBlock({ code, language = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayLang = (language || "code").toLowerCase();

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-block-lang">
          <TerminalIcon size={14} className="code-icon" />
          <span>{displayLang}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`code-copy-btn ${copied ? "copied" : ""}`}
          title="Copy code to clipboard"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block-pre">
        <code className={`language-${displayLang}`}>{code}</code>
      </pre>
    </div>
  );
}

/**
 * MarkdownRenderer component
 * Safely renders markdown with interactive code blocks and sleek typography
 */
export default function MarkdownRenderer({ content = "" }) {
  if (!content) return null;

  // Split markdown text into code blocks and normal markdown segments
  // Matches ```language\ncode``` blocks
  const codeBlockRegex = /```([a-zA-Z0-9_\-+]*)\n([\s\S]*?)```/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const textBefore = content.substring(lastIndex, match.index);
    if (textBefore.trim()) {
      const parsedHtml = marked.parse(textBefore);
      elements.push(
        <div
          key={`text-${lastIndex}`}
          className="markdown-prose"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      );
    }

    const language = match[1] || "";
    const code = match[2].replace(/\n$/, ""); // strip trailing newline

    elements.push(
      <CodeBlock
        key={`code-${match.index}`}
        code={code}
        language={language}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  // Trailing text segment
  const textAfter = content.substring(lastIndex);
  if (textAfter.trim()) {
    const parsedHtml = marked.parse(textAfter);
    elements.push(
      <div
        key={`text-${lastIndex}`}
        className="markdown-prose"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />
    );
  }

  // If no code blocks matched and elements is empty, render entire content
  if (elements.length === 0) {
    const parsedHtml = marked.parse(content);
    return (
      <div
        className="markdown-prose"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />
    );
  }

  return <div className="markdown-container">{elements}</div>;
}
