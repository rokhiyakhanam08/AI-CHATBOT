
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from uuid import uuid4

from chatbot import get_ai_response


# Initialize FastAPI
app = FastAPI(
    title="Viro AI Chatbot API",
    description="A conversational AI chatbot powered by Gemini",
    version="2.0.0"
)


# Allow React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:[0-9]+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Store conversations
conversations = {}

# Maximum conversation history
MAX_HISTORY = 10


# Request model
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Viro AI Chatbot API is running!"
    }


# Chat endpoint
@app.post("/chat")
def chat(request: ChatRequest):

    # Validate empty messages
    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty."
        )

    # Generate conversation ID
    conversation_id = request.conversation_id or str(uuid4())

    # Initialize conversation
    if conversation_id not in conversations:
        conversations[conversation_id] = []

    history = conversations[conversation_id]

    # Add user message
    updated_history = history + [
        {
            "role": "user",
            "content": request.message
        }
    ]

    # Manage context window
    context = updated_history[-MAX_HISTORY:]

    # Ensure context starts with user message
    if context and context[0]["role"] == "model":
        context = context[1:]

    try:

        # Get Gemini response
        reply = get_ai_response(context)

        if not reply:
            raise HTTPException(
                status_code=502,
                detail="AI returned an empty response."
            )

        # Add AI response to history
        final_history = context + [
            {
                "role": "model",
                "content": reply
            }
        ]

        # Enforce history limit
        final_history = final_history[-MAX_HISTORY:]

        # Ensure valid starting role
        if final_history and final_history[0]["role"] == "model":
            final_history = final_history[1:]

        # Save conversation
        conversations[conversation_id] = final_history

        return {
            "conversation_id": conversation_id,
            "user_message": request.message,
            "ai_response": reply,
            "messages_in_context": len(final_history)
        }

    except HTTPException:
        raise

    except Exception as e:

        # Print actual Gemini error in backend terminal
        error_message = str(e)

        print("GEMINI ERROR:", repr(e))

        # Handle API quota errors
        if (
            "429" in error_message
            or "RESOURCE_EXHAUSTED" in error_message
        ):
            raise HTTPException(
                status_code=429,
                detail=(
                    "Viro AI has reached its usage limit for the moment. "
                    "Please wait a brief moment while your quota resets, then try again."
                )
            )

        # Handle other AI service errors
        raise HTTPException(
            status_code=503,
            detail=(
                "Viro AI is temporarily unavailable. "
                "The neural connection is reconnecting, please try again in a moment."
            )
        )


if __name__ == "__main__":
    import socket
    import uvicorn

    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.bind(("127.0.0.1", 8000))
        sock.listen(5)
        server = uvicorn.Server(uvicorn.Config(app=app, log_level="info"))
        server.run(sockets=[sock])
    except Exception:
        uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

