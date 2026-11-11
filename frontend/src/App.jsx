
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) return;

    setInput("");
    setError("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: message }
    ]);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message,
          conversation_id: conversationId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Something went wrong. Please try again."
        );
      }

      setConversationId(data.conversation_id);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.ai_response }
      ]);

    } catch (err) {
      setError(err.message || "Unable to connect to the server.");

    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setConversationId(null);
    setInput("");
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <h2>Viro AI</h2>
        </div>

        <button className="new-chat-btn" onClick={newChat}>
          + New Chat
        </button>

        <div className="sidebar-info">
          <p>Your Intelligent AI Companion</p>
          <span>Powered by Gemini</span>
        </div>

        <div className="sidebar-footer">
          <span className="online-dot"></span>
          AI Assistant Online
        </div>
      </aside>

      {/* Main Chat */}
      <main className="chat-area">

        <header className="topbar">
          <div>
            <h3>Viro AI</h3>
            <span>Your personal AI assistant</span>
          </div>
          <span className="status">● Online</span>
        </header>

        <section className="messages-area">

          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-icon">✦</div>
              <h1>Hello, I'm Viro.</h1>
              <p>
                Your intelligent AI companion.
                Ask me anything and let's explore ideas together.
              </p>

              <div className="suggestions">
                <button onClick={() => setInput("Explain artificial intelligence simply.")}>
                  Explain AI
                </button>

                <button onClick={() => setInput("Give me some project ideas.")}>
                  Project ideas
                </button>

                <button onClick={() => setInput("Help me learn Python.")}>
                  Learn Python
                </button>
              </div>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-row ${msg.role}`}
                >
                  <div className="message-avatar">
                    {msg.role === "user" ? "You" : "✦"}
                  </div>

                  <div className="message-content">
                    <span className="message-name">
                      {msg.role === "user" ? "You" : "Viro AI"}
                    </span>
                    <div className="message-bubble">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                  Viro is thinking...
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

        </section>

        <footer className="input-area">
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Viro AI..."
              rows="1"
              disabled={loading}
            />

            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              ↑
            </button>
          </div>

          <p>Viro AI can make mistakes. Verify important information.</p>
        </footer>

      </main>
    </div>
  );
}

export default App;
