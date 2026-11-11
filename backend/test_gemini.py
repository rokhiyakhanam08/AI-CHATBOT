
from chatbot import get_ai_response

try:
    reply = get_ai_response(
        "Hello! Introduce yourself in two sentences."
    )

    print("\nGemini response:")
    print(reply)

except Exception as error:
    print("\nAPI connection failed:")
    print(error)
