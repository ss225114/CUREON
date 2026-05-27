import numpy as np

SPECIALIZATION_MAP = {
    "GENERAL_PHYSICIAN": 1,
    "INTERNAL_MEDICINE": 2,
    "PEDIATRICS": 3,
    "GYNECOLOGY": 4,
    "CARDIOLOGY": 5,
    "DERMATOLOGY": 6,
    "ORTHOPEDICS": 7,
    "NEUROLOGY": 8,
    "PSYCHIATRY": 9,
    "ENT": 10,
    "OPHTHALMOLOGY": 11,
    "ONCOLOGY": 12,
    "DENTISTRY": 13,
    "AYURVEDA": 14,
    "HOMEOPATHY": 15,
    "OTHER": 99
}

DEGREE_MAP = {
    "MD": 1,
    "DO": 2,
    "PHD": 3,
    "DDS": 4,
    "DMD": 5,
    "DNP": 6,
    "PHARMD": 7,
    "UNKNOWN": 0
}

GENDER_MAP = {
    "male": 1,
    "female": 2,
    "other": 3
}


def calculate_experience(experience_list):
    total = 0

    for exp in experience_list:
        start = exp.get("startYear")
        end = exp.get("endYear")

        try:
            start = int(start)

            if str(end).lower() == "present":
                end = 2026
            else:
                end = int(end)

            total += max(0, end - start)

        except:
            continue

    return total

def create_vector(doctor, profile=None):
    profile = profile or {}

    specialization_list = doctor.get("specialization", ["OTHER"])

    specialization_encoded = SPECIALIZATION_MAP.get(
        specialization_list[0],
        99
    ) 

    degree_encoded = DEGREE_MAP.get(
        doctor.get("degree", "UNKNOWN"),
        0
    ) 

    gender_encoded = GENDER_MAP.get(
        doctor.get("gender", "other"),
        3
    ) 

    experience_years = calculate_experience(
        profile.get("experience", [])
    ) 

    education_count = len(profile.get("education", [])) 

    certifications_count = len(
        profile.get("certifications", [])
    ) 

    languages_count = len(
        profile.get("professionalInfo", {})
        .get("languages", [])
    ) 

    rating = float(doctor.get("rating", 0)) 

    rating_count = float(doctor.get("ratingCount", 0)) 

    consultation_fee = float(
        doctor.get("consultationFee", 100) 
    ) 

    cluster_id = float(doctor.get("clusterId", 0)) 


    vector = np.array([
        specialization_encoded,
        degree_encoded,
        gender_encoded,
        experience_years,
        education_count,
        certifications_count,
        languages_count,
        rating,
        rating_count,
        consultation_fee,
        cluster_id
    ])

    return vector.tolist()