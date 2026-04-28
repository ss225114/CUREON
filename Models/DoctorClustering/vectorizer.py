def create_vector(doctor):
    import numpy as np

    vector = np.array([
        # doctor.get("experienceYears", 0) / 40,
        doctor.get("consultationFee", 100) / 5000,
        doctor.get("rating", 0) / 5,
        # doctor.get("reviewCount", 0) / 1000
    ], dtype=np.float32)

    return vector.tolist()