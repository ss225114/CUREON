import os
import numpy as np

from dotenv import load_dotenv
from pymongo import MongoClient
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from vectorizer_v2 import create_vector
from vectorizer_v2 import calculate_experience
from pinecone_client import index

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["Cureon-db"]

doctor_collection = db["doctors"]

profile_collection = db["doctorprofiles"]


def fetch_doctors():
    doctors = list(
        doctor_collection.find({
            "isActive": True
        })
    )

    combined = []

    for doctor in doctors:

        profile = profile_collection.find_one({
            "docId": doctor["_id"]
        })

        combined.append({
            "doctor": doctor,
            "profile": profile
        })

    return combined

def build_feature_matrix(data):
    matrix = []

    for item in data:

        vector = create_vector(
            item["doctor"],
            item["profile"]
        )

        matrix.append(vector)

    return np.array(matrix)

def run_clustering(doctors): 
    matrix = build_feature_matrix(doctors)

    scaler = StandardScaler()

    scaled = scaler.fit_transform(matrix)

    k = min(8, max(2, len(doctors) // 2))

    model = KMeans(
        n_clusters=k, 
        random_state=42,
        n_init=10
    )

    labels = model.fit_predict(scaled) 

    return labels 

def update_cluster_ids(doctors, labels):
    for i, item in enumerate(doctors):

        doctor = item["doctor"]

        doctor_collection.update_one(
            {"_id": doctor["_id"]},
            {
                "$set": {
                    "clusterId": int(labels[i])
                }
            }
        )

def sync_to_pinecone(doctors, labels):
    vectors = []

    for i, item in enumerate(doctors):

        doctor = item["doctor"]
        profile = item["profile"]

        vector = create_vector(
            doctor=doctor,
            profile=profile
        )

        vectors.append({
            "id": str(doctor["_id"]),
            "values": vector,
            "metadata": {

                # Core Search Metadata
                "clusterId": int(labels[i]),
                "specialization": doctor.get(
                    "specialization",
                    []
                ),
                "degree": doctor.get(
                    "degree",
                    "UNKNOWN"
                ),

                # Ranking Metadata
                "rating": float(
                    doctor.get("rating", 0)
                ),

                "ratingCount": int(
                    doctor.get("ratingCount", 0)
                ),

                "consultationFee": float(
                    doctor.get("consultationFee", 100)
                ),

                # Demographic Metadata
                "gender": doctor.get(
                    "gender",
                    ""
                ),

                "location": doctor.get(
                    "location",
                    ""
                ),

                "hospital": doctor.get(
                    "hospital",
                    ""
                ),

                # Professional Metadata
                "experienceYears": calculate_experience(
                    profile.get("experience", [])
                ),

                "educationCount": len(
                    profile.get("education", [])
                ),

                "certificationsCount": len(
                    profile.get("certifications", [])
                ),

                "languages": profile.get(
                    "professionalInfo",
                    {}
                ).get("languages", []),

                # Status
                "isActive": doctor.get(
                    "isActive",
                    True
                )
            }
        })

    # Batch upload
    batch_size = 100

    for i in range(0, len(vectors), batch_size):
        index.upsert(
            vectors=vectors[i:i + batch_size]
        )


def main():
    doctors = fetch_doctors()

    if not doctors:
        print("No doctors found")
        return

    labels = run_clustering(doctors)

    update_cluster_ids(doctors, labels)

    sync_to_pinecone(doctors, labels)

    print("Pipeline completed")


if __name__ == "__main__":
    main()