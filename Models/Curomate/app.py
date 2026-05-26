from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from dotenv import load_dotenv
import os

from src.intent import detect_intent
from src.rag import retrieval_chain
from src.doctor_search import search_doctors
from src.image_analysis import predict_disease
from src.book_appointment import doctor_query
from src.similarity_search import find_similar_filtered

load_dotenv()

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/get", methods=["POST"])
def chat():

    data = request.json

    msg = data.get("msg", "")

    chat_history = data.get(
        "chat_history",
        []
    )

    if not msg:

        return jsonify({
            "error": "No message provided"
        }), 400

    intent = detect_intent(msg)

 # MEDICAL RAG
    if intent == "medical":

        print("Detected medical query intent.")
        response = retrieval_chain(
            msg,
            chat_history
        )

        return jsonify({
            "type": "medical_response",
            "response": response,
            "redirect": False,
        })

    elif intent == "doctor_search":

        print("Detected doctor search intent.")

        doctors = search_doctors(msg)

        if not doctors:

            doctors_string = "No such doctors found."

        else:

            doctors_string = ", ".join(doctors)

        return jsonify({
            "type": "doctor_search",
            "response": doctors_string,
            "redirect": False,
        })
    
    elif intent == "book_appointment":
        doctor_query_payload = doctor_query(msg)
        return jsonify({
            "url": "http://localhost:5173/find-doctors",
            "payload": doctor_query_payload,
            "redirect": True,
        })

    return jsonify({
        "response": "Could not understand request."
    })

@app.route("/predict", methods=["POST"])
def predict():

    try:

        print("REQUEST RECEIVED")

        # -----------------------------------
        # GET JSON DATA
        # -----------------------------------
        data = request.get_json()

        print("DATA:", data)

        if not data:

            return jsonify({
                "success": False,
                "error": "No JSON data received"
            }), 400

        # -----------------------------------
        # GET IMAGE PATH
        # -----------------------------------
        filepath = data.get("image_path")

        if not filepath:

            return jsonify({
                "success": False,
                "error": "No image path provided"
            }), 400

        print("IMAGE PATH:", filepath)

        # -----------------------------------
        # CHECK FILE EXISTS
        # -----------------------------------
        if not os.path.exists(filepath):

            return jsonify({
                "success": False,
                "error": "Image file does not exist"
            }), 400

        # -----------------------------------
        # PREDICT DISEASE
        # -----------------------------------
        result = predict_disease(filepath)

        print("PREDICTION:", result)

        # -----------------------------------
        # RETURN RESULT
        # -----------------------------------
        return jsonify({
            "success": True,
            "prediction": result
        })

    except Exception as e:

        print("PREDICT ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/similar", methods=["POST"])
def similar():
    doctor = request.json

    results = find_similar_filtered(doctor)

    return jsonify([
        {
            "id": match["id"],
            "score": match["score"]
        }
        for match in results
    ])

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8005,
        debug=True
    )