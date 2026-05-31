# cluster_job.py

import os
from pymongo import MongoClient
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from dotenv import load_dotenv

from vectorizer import create_vector
from pinecone_client import index

load_dotenv()

# 🔹 Load Mongo URI from environment
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in environment variables")


# MongoDB connection
client = MongoClient(MONGO_URI)

db = client["Cureon-db"]

collection = db["doctors"]


def fetch_doctors():
    return list(collection.find({"isActive": True}))


def build_feature_matrix(doctors):
    return np.array([
        [
            # d.get("experienceYears", 0),
            d.get("consultationFee", 100),
            d.get("rating", 0),
        ]
        for d in doctors
    ])


def run_clustering(doctors):
    features = build_feature_matrix(doctors)

    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    # Dynamic cluster size (better than fixed 3)
    k = min(5, max(2, len(doctors) // 5))

    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = kmeans.fit_predict(scaled)

    return labels


def update_mongo(doctors, labels):
    bulk_ops = []

    for i, doc in enumerate(doctors):
        bulk_ops.append({
            "update_one": {
                "filter": {"_id": doc["_id"]},
                "update": {"$set": {"clusterId": int(labels[i])}}
            }
        })

    if bulk_ops:
        collection.bulk_write([
            # Convert dict to pymongo operations
            __import__("pymongo").UpdateOne(
                op["update_one"]["filter"],
                op["update_one"]["update"]
            )
            for op in bulk_ops
        ])


def upsert_pinecone(doctors, labels):
    vectors = []

    for i, doc in enumerate(doctors):
        vector = create_vector(doc)

        vectors.append({
            "id": str(doc["_id"]),
            "values": vector,
            "metadata": {
                "clusterId": int(labels[i]),
                "specialization": doc.get("specialization", []),
                "isActive": doc.get("isActive", True)
            }
        })

    # Batch upsert (important for scaling)
    batch_size = 100

    for i in range(0, len(vectors), batch_size):
        index.upsert(vectors=vectors[i:i + batch_size])


def main():
    print("Fetching doctors...")
    doctors = fetch_doctors()

    if not doctors:
        print("No doctors found")
        return

    print(f"Found {len(doctors)} doctors")

    print("Running clustering...")
    labels = run_clustering(doctors)

    print("Updating MongoDB...")
    update_mongo(doctors, labels)

    print("Syncing with Pinecone...")
    upsert_pinecone(doctors, labels)

    print("Clustering pipeline completed!")


if __name__ == "__main__":
    main()