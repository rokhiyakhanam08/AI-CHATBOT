
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
You are Nova, a friendly and intelligent AI chatbot.

Your responsibilities:
- Answer questions clearly and accurately.
- Remember information from the current conversation.
- Be friendly, helpful and conversational.
- If you don't know something, say so honestly.
- Give simple explanations when users are learning.
"""

def get_ai_response(history: list):
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
