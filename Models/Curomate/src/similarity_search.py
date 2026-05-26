from vectorizer import create_vector
from store_index import doctor_index

def find_similar_filtered(doctor):
    query_vector = create_vector(doctor)

    results = doctor_index.query(
        vector=query_vector, # [2, 1, 7, 3, 4.2, 350, 2] -> score = 0.5604
        top_k=5,
        include_metadata=True,
        filter={
            "specialization": {"$in": doctor["specialization"]},
            "clusterId": {"$eq": doctor["clusterId"]},
            "isActive": {"$eq": True}
        }
    )

    return results["matches"]

