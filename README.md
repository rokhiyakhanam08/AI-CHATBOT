
# Viro AI ✦
### Your Intelligent AI Companion — Futuristic Next-Gen UI

Viro AI is a futuristic, next-generation conversational AI experience powered by Google's Gemini API and an ultra-modern React + Vite interface with FastAPI backend. It features the signature **VIRO CORE** holographic AI sphere, full conversation history, rich markdown & syntax-highlighted code rendering with one-click copy, dynamic regeneration, and multi-turn context memory.

---

## ✨ Features

- **Signature Feature — VIRO CORE**: An interactive, animated holographic 3D AI sphere with gyroscopic orbital rings, multi-stop plasma corona, and real-time state transitions (`idle`, `thinking`, `responding`).
- **Cinematic Futuristic Aesthetics**: Deep midnight black and navy palette (`#06070b`, `#090c15`), electric violet (`#8b5cf6`), neon cyan (`#22d3ee`), ambient starlight grid, and glassmorphic panels.
- **Persistent Conversation History**: Multi-session management with sidebar history, auto-saved in `localStorage`, session switching, individual deletion, and clean state resets.
- **Interactive Markdown & Code Blocks**: High-fidelity formatting with language detection, custom monospace styling (`JetBrains Mono`), and one-click "Copy Code" with instant feedback.
- **Response Actions**: Single-click "Copy Response" for full messages and "Regenerate Response" to re-synthesize thoughts.
- **Auto-Resizing Composer**: Modern input dock that expands smoothly with multiline input, supporting `Enter` to send and `Shift+Enter` for newlines.
- **Contextual Suggestions**: 4 interactive launch cards for Architecture, Quantum Physics, AI Startups, and Neural Memory.
- **Multi-Turn Neural Memory**: Unique conversation IDs preserve conversational continuity across turns within an active context window.
- **Intelligent Error Shield**: Clear, helpful feedback for HTTP 429 quota exhaustion and HTTP 503 service updates, with a one-click Retry button.
- **Responsive Architecture**: Pixel-perfect layout across desktop, laptop, tablet, and mobile with a collapsible drawer sidebar.
- **Zero API Key Leakage**: Gemini API keys remain strictly server-side in backend environment variables.

---

## 🛠️ Technology Stack

**Frontend**
- React 19 + Vite 8
- Marked (Lightweight Markdown AST Parser)
- Space Grotesk, Inter, and JetBrains Mono Typography
- Pure GPU-accelerated CSS3 & SVG Holographic Animations

**Backend**
- Python 3.13 + FastAPI
- Uvicorn ASGI Server
- Google GenAI SDK (`gemini-3.5-flash`)
- Pydantic v2 + Python-Dotenv

---

## 📁 Project Structure

```text
AI CHATBOT/
├── backend/
│   ├── main.py              # FastAPI server, CORS, conversation manager, error handlers
│   ├── chatbot.py           # Gemini GenAI client & Viro companion system prompt
│   ├── test_gemini.py       # API connection verification script
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   └── .env                 # API keys (never committed to git)
├── frontend/
│   ├── public/
│   │   └── favicon.svg      # Holographic Viro Core glowing SVG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── ViroCore.jsx         # Holographic 3D AI sphere & orbital rings
│   │   │   ├── ViroCore.css         # Breathing, thinking & responding animations
│   │   │   ├── MarkdownRenderer.jsx # Code block copy, syntax, headers, lists
│   │   │   ├── MarkdownRenderer.css # Dark futuristic markdown theme
│   │   │   ├── Sidebar.jsx          # Collapsible history drawer & status
│   │   │   ├── Sidebar.css          # Glassmorphic sidebar styles
│   │   │   ├── Topbar.jsx           # Header bar, title, neural link pill
│   │   │   ├── Topbar.css           # Frosted glass top navigation
│   │   │   ├── WelcomeScreen.jsx    # Cinematic greeting, suggestions & Viro Core
│   │   │   ├── WelcomeScreen.css    # Ambient glow and suggestion card grid
│   │   │   ├── ChatMessage.jsx      # Message bubbles, copy & regenerate
│   │   │   ├── ChatMessage.css      # User violet glow & assistant glass cards
│   │   │   ├── TypingIndicator.jsx  # Pulsing wave equalizer & thinking state
│   │   │   ├── TypingIndicator.css  # Holographic wave styling
│   │   │   ├── Composer.jsx         # Auto-resizing textarea dock
│   │   │   ├── Composer.css         # Glowing focus states & send button
│   │   │   ├── ErrorBanner.jsx      # Futuristic alert with retry action
│   │   │   ├── ErrorBanner.css      # Rose-tinted glassmorphic alert
│   │   │   └── Icons.jsx            # Handcrafted crisp SVG icon suite
│   │   ├── App.jsx          # State, history sync, auto-scroll & API calls
│   │   ├── App.css          # Celestial grid, ambient nebula, master layout
│   │   ├── index.css        # Global CSS variables, scrollbars & typography
│   │   └── main.jsx         # React application root
│   ├── index.html           # Fonts preconnect & meta configuration
│   ├── package.json         # NPM scripts and dependencies
│   └── vite.config.js       # Vite configuration
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows PowerShell
pip install -r requirements.txt
```

Ensure your `.env` contains:
```env
GEMINI_API_KEY=your_actual_api_key
```

Run the backend server:
```bash
python main.py
```
*Backend runs on `http://127.0.0.1:8000` with interactive Swagger docs at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## ⌨️ Shortcuts & Controls

- **Enter**: Send message
- **Shift + Enter**: Newline in composer
- **Ctrl + N / Cmd + N**: Start a new chat exploration
- **Sidebar Toggle**: Click top-left menu icon to expand or collapse history
