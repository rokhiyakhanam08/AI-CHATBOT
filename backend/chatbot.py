
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv(Path(__file__).parent / ".env")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("Gemini API key not found!")

client = genai.Client(api_key=api_key)

# Our chatbot's personality
SYSTEM_PROMPT = """
You are Viro, an intelligent, thoughtful, and friendly AI companion.
Brand: Viro AI — Your Intelligent AI Companion.

Your responsibilities:
- Converse naturally with warm, engaging, and articulate responses.
- Provide clear, accurate, and insightful answers across coding, technology, science, creativity, and everyday questions.
- Maintain context and remember information shared throughout the conversation.
- Use clean, well-structured markdown formatting with clear headings, lists, and syntax-highlighted code blocks where appropriate.
- Be honest and transparent if something is uncertain or unknown.
- Avoid robotic, cold, or repetitive phrases. Be genuinely helpful, conversational, and inspiring.
"""

def get_ai_response(history):
    # Support both a string input and a list of message dicts
    if isinstance(history, str):
        history = [{"role": "user", "content": history}]

    # Convert stored history into Gemini format
    contents = [
        types.Content(
            role=message["role"],
            parts=[types.Part.from_text(text=message["content"])]
        )
        for message in history
    ]

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.7
        )
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response.")

    return response.text
