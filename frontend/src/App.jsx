import { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatMessage from "./components/ChatMessage";
import TypingIndicator from "./components/TypingIndicator";
import Composer from "./components/Composer";
import ErrorBanner from "./components/ErrorBanner";
import { ArrowDownIcon } from "./components/Icons";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/chat";
const STORAGE_KEY = "viro_ai_conversations";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 820;
    }
    return true;
  });
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Conversations history stored in localStorage
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error("Failed to save conversations to localStorage:", e);
    }
  }, [conversations]);

  // Smooth auto-scroll to bottom on messages/loading changes
  const scrollToBottom = useCallback((behavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  // Track scroll position for "scroll to bottom" button
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBottom(distanceToBottom > 160);
  };

  // Start fresh conversation
  const startNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setInput("");
    setError("");
    setLastPrompt("");
  }, []);

  // Keyboard shortcut for New Chat (Ctrl+N or Cmd+N)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        startNewChat();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [startNewChat]);

  // Update or insert conversation into history
  const persistConversation = (id, newMessages, initialPrompt) => {
    setConversations((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === id);
      const title =
        existingIndex >= 0
          ? prev[existingIndex].title
          : (initialPrompt || "New Conversation").slice(0, 38).trim() +
            (initialPrompt && initialPrompt.length > 38 ? "..." : "");

      const updated = {
        id,
        title: title || "New Conversation",
        messages: newMessages,
        updatedAt: Date.now(),
      };

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = updated;
        return next;
      }
      return [updated, ...prev];
    });
  };

  // Send message to FastAPI backend
  const sendMessage = async (overridePrompt = null) => {
    const promptToSend = (overridePrompt ?? input).trim();
    if (!promptToSend || loading) return;

    setInput("");
    setError("");
    setLastPrompt(promptToSend);

    const userMessage = {
      role: "user",
      content: promptToSend,
      timestamp: Date.now(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: promptToSend,
          conversation_id: conversationId,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        let errorDetail = data.detail;
        if (response.status === 429) {
          errorDetail =
            data.detail ||
            "Viro AI has reached its usage limit for the moment. Please wait a brief moment while your quota resets, then try again.";
        } else if (response.status === 503) {
          errorDetail =
            data.detail ||
            "Viro AI neural services are temporarily unavailable. Please try again in a few moments.";
        } else if (!errorDetail) {
          errorDetail = `Server error (${response.status}). Please try again.`;
        }
        throw new Error(errorDetail);
      }

      const activeConvId = data.conversation_id || conversationId;
      setConversationId(activeConvId);

      const assistantMessage = {
        role: "assistant",
        content: data.ai_response || "No response received.",
        timestamp: Date.now(),
      };

      const finalMessages = [...nextMessages, assistantMessage];
      setMessages(finalMessages);

      if (activeConvId) {
        persistConversation(activeConvId, finalMessages, promptToSend);
      }
    } catch (err) {
      console.error("Chat error:", err);
      let userFriendlyMessage = err.message;
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        userFriendlyMessage =
          "Cannot reach Viro AI backend. Please verify the FastAPI server is running on http://127.0.0.1:8000.";
      }
      setError(userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  // Regenerate last AI response
  const handleRegenerate = async () => {
    if (loading || messages.length === 0) return;

    // Find the last user message
    let lastUserMsg = null;
    let cutoffIndex = -1;

    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        lastUserMsg = messages[i];
        cutoffIndex = i;
        break;
      }
    }

    if (!lastUserMsg) return;

    // Truncate messages to include up to that user message
    const trimmedMessages = messages.slice(0, cutoffIndex + 1);
    setMessages(trimmedMessages);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: lastUserMsg.content,
          conversation_id: conversationId,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || `Server returned error (${response.status}).`
        );
      }

      const activeConvId = data.conversation_id || conversationId;
      setConversationId(activeConvId);

      const assistantMessage = {
        role: "assistant",
        content: data.ai_response,
        timestamp: Date.now(),
      };

      const finalMessages = [...trimmedMessages, assistantMessage];
      setMessages(finalMessages);

      if (activeConvId) {
        persistConversation(activeConvId, finalMessages, lastUserMsg.content);
      }
    } catch (err) {
      setError(err.message || "Failed to regenerate response.");
    } finally {
      setLoading(false);
    }
  };



  // Load an existing conversation from history
  const handleSelectConversation = (id) => {
    const found = conversations.find((c) => c.id === id);
    if (found) {
      setConversationId(found.id);
      setMessages(found.messages || []);
      setError("");
      setInput("");
      // Auto-close sidebar on mobile
      if (window.innerWidth <= 820) {
        setSidebarOpen(false);
      }
    }
  };

  // Delete a single conversation from history
  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (conversationId === id) {
      startNewChat();
    }
  };

  // Clear all saved conversations
  const handleClearAllConversations = () => {
    if (window.confirm("Clear all conversation history?")) {
      setConversations([]);
      startNewChat();
    }
  };

  // Active chat title for topbar
  const activeConversation = conversations.find((c) => c.id === conversationId);
  const currentTitle = activeConversation ? activeConversation.title : "Viro AI";

  return (
    <div className="viro-app-layout">
      {/* Background Starfield / Celestial Grid */}
      <div className="celestial-background-layer" />
      <div className="ambient-nebula-glow" />

      {/* Collapsible Futuristic Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        conversations={conversations}
        activeId={conversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={startNewChat}
        onDeleteConversation={handleDeleteConversation}
        onClearAll={handleClearAllConversations}
      />

      {/* Main Chat Workspace */}
      <main className="viro-chat-workspace">
        {/* Topbar */}
        <Topbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          currentTitle={currentTitle}
          isLoading={loading}
          onNewChat={startNewChat}
          onClearMessages={startNewChat}
          hasMessages={messages.length > 0}
        />

        {/* Scrollable Message Thread */}
        <section
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="viro-messages-viewport"
        >
          {messages.length === 0 ? (
            <WelcomeScreen
              onSelectSuggestion={(prompt) => sendMessage(prompt)}
              isThinking={loading}
            />
          ) : (
            <div className="message-thread-container">
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={idx}
                  message={msg}
                  isLast={idx === messages.length - 1}
                  isLoading={loading}
                  onRegenerate={handleRegenerate}
                />
              ))}

              {loading && <TypingIndicator />}

              <div ref={bottomRef} className="scroll-anchor" />
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="error-banner-anchor">
              <ErrorBanner
                error={error}
                onRetry={lastPrompt ? () => sendMessage(lastPrompt) : null}
                onDismiss={() => setError("")}
              />
            </div>
          )}
        </section>

        {/* Scroll To Bottom Floating Pill */}
        {showScrollBottom && (
          <button
            type="button"
            className="scroll-bottom-pill"
            onClick={() => scrollToBottom("smooth")}
            aria-label="Scroll to bottom"
            title="Scroll to latest message"
          >
            <ArrowDownIcon size={14} />
            <span>New messages below</span>
          </button>
        )}

        {/* Futuristic Composer Dock */}
        <footer className="viro-composer-dock">
          <Composer
            input={input}
            setInput={setInput}
            onSend={() => sendMessage()}
            isLoading={loading}
          />
        </footer>
      </main>
    </div>
  );
}
