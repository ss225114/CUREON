import os

from dotenv import load_dotenv
from groq import Groq

# LOAD ENV VARIABLES
load_dotenv()

# DEBUG
print("GROQ KEY:", os.getenv("GROQ_API_KEY"))

# CREATE CLIENT
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def detect_intent(message):

    prompt = f"""
Classify the user message.

Return ONLY one word:

medical
doctor_search

Message:
{message}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        max_tokens=10
    )

    intent = (
        response
        .choices[0]
        .message.content
        .strip()
        .lower()
    )

    print("Detected intent:", intent)
    return intent