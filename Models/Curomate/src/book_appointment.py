from groq import Groq
from pymongo import MongoClient
import os
import json
from dotenv import load_dotenv

load_dotenv()

groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found")

mongo_client = MongoClient(MONGO_URI)

db = mongo_client["Cureon-db"]

collection = db["doctors"]

def extract_doctor_name(message):

    prompt = f"""
    Extract doctor name and just return the name the way it is in the message.

    Query:
    {message}
    """

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    name = (
        response
        .choices[0]
        .message.content
        .strip()
        .lower()
    )

    print("Detected doctor name:", name)
    return name

def doctor_query(message):
    name = extract_doctor_name(message)

    capitalized = ".".join(part.title() for part in name.split("."))

    return {
      "gender": "",
      "minFee": 100,
      "maxFee": "",
      "minRating": "",
      "location": "",
      "name": capitalized,
      "specialization": "",
      "useSimilarity": True,
    }
