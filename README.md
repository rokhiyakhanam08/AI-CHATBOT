
# Viro AI 🤖
### Your Intelligent AI Companion

Viro AI is a multi-turn conversational AI chatbot powered by Google's Gemini API. It maintains conversation context, supports multiple independent conversations, and provides an interactive React-based chat interface.

## ✨ Features

- AI-powered conversational responses
- Multi-turn conversation memory
- Unique conversation IDs
- Context window management
- React and Vite frontend
- FastAPI backend
- Gemini API integration
- API error handling
- Responsive chat interface

## 🛠️ Technology Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- Uvicorn

**AI Integration**
- Google Gemini API
- Google Gen AI SDK

## 📁 Project Structure

```text
AI CHATBOT/
├── backend/
│   ├── main.py
│   ├── chatbot.py
│   ├── test_gemini.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AI CHATBOT
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Gemini API Key

Create a `.env` file inside the backend folder.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key
```

Get an API key from:

https://aistudio.google.com/

Never upload your actual `.env` file to GitHub.

### 4. Run the Backend

```bash
python -m uvicorn main:app --reload
```

Backend URL:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

### 5. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

http://localhost:5173

## 🧠 Conversation Management

Viro AI uses unique conversation IDs to maintain separate chat sessions.

The backend stores conversation history and sends recent messages to Gemini as context.

The current implementation limits stored context to a maximum of 10 messages.

## 🔐 Security

- API keys are stored in environment variables.
- `.env` is excluded from Git.
- `.env.example` provides a configuration template.
- API errors are handled gracefully.

## 🚀 Future Improvements

- Persistent chat history using a database
- User authentication
- Multiple conversation management
- Improved streaming responses
- Voice interaction
- Deployment to cloud infrastructure

## 👩‍💻 Developer

Developed as an internship project.

**Project:** Viro AI – Your Intelligent AI Companion
