from groq import Groq
from pymongo import MongoClient
import os
import json
from dotenv import load_dotenv

load_dotenv()

# ------------------------------------------------
# GROQ CLIENT
# ------------------------------------------------
groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ------------------------------------------------
# MONGODB CONNECTION
# ------------------------------------------------
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found")

mongo_client = MongoClient(MONGO_URI)

db = mongo_client["Cureon-db"]

collection = db["doctors"]

# ------------------------------------------------
# EXTRACT FILTERS
# ------------------------------------------------
def extract_filters(message):

    prompt = f"""
    Extract doctor search filters.

    Return ONLY valid JSON.

    Format:

    {{
      "specialization": "",
      "location": "",
      "gender": "",
      "max_fee": ""
    }}

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

    content = response.choices[0].message.content.strip()

    # --------------------------------------------
    # REMOVE MARKDOWN
    # --------------------------------------------
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    print("FILTERS:", content)

    try:

        parsed_data = json.loads(content)

        return parsed_data

    except Exception as e:

        print("JSON ERROR:", e)

        return {
            "specialization": "",
            "location": "",
            "gender": "",
            "max_fee": 5000
        }

# ------------------------------------------------
# FETCH ACTIVE DOCTORS
# ------------------------------------------------
def fetch_doctors():

    return list(
        collection.find(
            {"isActive": True}
        )
    )

# ------------------------------------------------
# SEARCH DOCTORS
# ------------------------------------------------
def search_doctors(message):

    filters = extract_filters(message)

    specialization = str(
        filters.get("specialization", "")
    ).strip().lower()

    location = str(
        filters.get("location", "")
    ).strip().lower()

    gender = str(
        filters.get("gender", "")
    ).strip().lower()

    max_fee = filters.get(
        "max_fee",
        5000
    )

    # --------------------------------------------
    # HANDLE EMPTY FEE
    # --------------------------------------------
    if max_fee == "" or max_fee is None:
        max_fee = 5000

    max_fee = int(max_fee)

    doctors_data = fetch_doctors()

    matched_doctors = []

    for doctor in doctors_data:

        # ----------------------------------------
        # SPECIALIZATION FILTER
        # ----------------------------------------
        doctor_specializations = doctor.get(
            "specialization",
            []
        )

        # Handle string specialization also
        if isinstance(
            doctor_specializations,
            str
        ):
            doctor_specializations = [
                doctor_specializations
            ]

        specialization_found = False

        for spec in doctor_specializations:

            if (
                str(spec).strip().lower()
                == specialization
            ):
                specialization_found = True
                break

        if specialization and not specialization_found:
            continue

        # ----------------------------------------
        # LOCATION FILTER
        # ----------------------------------------
        if location:

            doctor_location = str(
                doctor.get("location", "")
            ).lower()

            if location not in doctor_location:
                continue

        # ----------------------------------------
        # GENDER FILTER
        # ----------------------------------------
        if gender:

            doctor_gender = str(
                doctor.get("gender", "")
            ).lower()

            if doctor_gender != gender:
                continue

        # ----------------------------------------
        # CONSULTATION FEE FILTER
        # ----------------------------------------
        consultation_fee = doctor.get(
            "consultationFee",
            0
        )

        try:
            consultation_fee = int(
                consultation_fee
            )

        except:
            consultation_fee = 0

        if consultation_fee > max_fee:
            continue

        # ----------------------------------------
        # APPEND DOCTOR NAME
        # ----------------------------------------
        doctor_name = doctor.get(
            "fullName",
            ""
        )

        if doctor_name:
            matched_doctors.append(
                doctor_name
            )


    if matched_doctors:
        return matched_doctors

    # return "No matching doctors found."