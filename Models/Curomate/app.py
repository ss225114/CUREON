from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from src.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
from groq import Groq
from src.prompt import *
from store_index import doctor_index
from vectorizer import create_vector
# from vectorizer_v2 import create_vector
import os
import re
import numpy as np

# App setup
app = Flask(__name__)
CORS(app)
load_dotenv()

import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input


model = tf.keras.models.load_model(
    "image_classification_models/Image_classify_v5.keras",
    # compile=False,
)

class_names = ['Acne',
 'Actinic Keratosis',
 'Chromhidrosis',
 'Eruptive Xanthomas',
 'Erythrasma',
 'Impetigo',
 'Keratosis Pilaris',
 'Leprosy',
 'Lupus',
 'Lyme Disease',
 'Measles',
 'Melanoma',
 'Melasma',
 'Otophyma',
 'RingWorm',
 'Scabies2',
 'Shingles',
 'Solar Lentigo',
 'dermatofibroma',
 'eczema',
 'hives',
 'psoriasis',
 'rosacea',
 'scabies']

# API keys
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Embeddings & vector store
embeddings = download_embeddings()
index_name ="cureon"

docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriever = docsearch.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}
)

# chat_history = []

# def rewrite_query(context, new_query):
#     """
#     Rewrites follow-up questions into standalone questions
#     using previous conversation context.
#     """

#     if not context:
#         return new_query

#     prompt = question_rewriter_prompt.format(
#         chat_history=context,
#         new_query=new_query
#     )

#     response = client.chat.completions.create(
#         model="llama-3.3-70b-versatile",
#         # "meta-llama/llama-4-maverick-17b-128e-instruct",
#         messages=[
#             {
#                 "role": "system",
#                 "content": (
#                     "You rewrite follow-up questions into "
#                     "standalone complete questions."
#                 )
#             },
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ],
#         temperature=0.3,
#         max_tokens=128
#     )

#     rewritten = response.choices[0].message.content.strip()

#     return rewritten

def rewrite_query(chat_history, new_query):
    """
    Rewrites follow-up questions into standalone questions
    using previous conversation context.
    """

    history_text = "\n".join(
        [f"{m['role']}: {m['content']}" for m in chat_history]
    )

    prompt = question_rewriter_prompt.format(
        chat_history=history_text,
        new_query=new_query
    )

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You rewrite follow-up questions into standalone complete questions."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=128
    )

    return response.choices[0].message.content.strip()

# def retrieval_chain(query: str, context: str = "") -> str:

#     # Rewrite follow-up question
#     rewritten_query = rewrite_query(context, query)

#     # Retrieve relevant docs
#     docs = retriever.invoke(rewritten_query)

#     context_docs = "\n\n".join(
#         d.page_content for d in docs
#     )

#     formatted_prompt = system_prompt.format(
#         context=context_docs,
#         question=query
#     )

#     response = client.chat.completions.create(
#         model="llama-3.3-70b-versatile",
#         # "meta-llama/llama-4-maverick-17b-128e-instruct",
#         messages=[
#             {
#                 "role": "system",
#                 "content": "You are a helpful medical assistant."
#             },
#             {
#                 "role": "user",
#                 "content": formatted_prompt
#             }
#         ],
#         temperature=0.5,
#         max_tokens=512
#     )

#     answer = response.choices[0].message.content.strip()

#     cleaned = re.sub(
#         r"<think>.*?</think>",
#         "",
#         answer,
#         flags=re.DOTALL
#     )

#     return cleaned

def retrieval_chain(query: str, chat_history) -> str:
    if len(chat_history) == 0:
        rewritten_query = query
    else:
        rewritten_query = rewrite_query(chat_history, query)

    docs = retriever.invoke(rewritten_query)
    context = "\n\n".join(d.page_content for d in docs)

    formatted_prompt = system_prompt.format(
        context=context,
        question=query
    )

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": formatted_prompt
            }
        ],
        temperature=0.5,
        max_tokens=512
    )

    answer = response.choices[0].message.content.strip()

    cleaned = re.sub(
        r"<think>.*?</think>",
        "",
        answer,
        flags=re.DOTALL
    )

    return cleaned

def preprocess_image(image_path):

    img = image.load_img(image_path, target_size=(180, 180))

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = preprocess_input(img_array)

    return img_array

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

# APIs
# @app.route("/get", methods=["GET", "POST"])
# def chat():

#     if request.method == "POST":
#         data = request.get_json()

#         msg = data.get("msg", "")
#         context = data.get("context", "")

#     else:
#         msg = request.args.get("msg", "")
#         context = request.args.get("context", "")

#     if not msg:
#         return jsonify({
#             "error": "No message provided"
#         }), 400

#     response = retrieval_chain(msg, context)

#     return jsonify({
#         "response": response
#     })

@app.route("/get", methods=["GET", "POST"])
def chat():
    data = request.json

    msg = data.get("msg", "")
    chat_history = data.get("chat_history", [])

    if not msg:
        return jsonify({"error": "No message provided"}), 400

    response = retrieval_chain(msg, chat_history)

    return jsonify({
        "response": response
    })

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    image_path = data["image_path"]

    img = preprocess_image(image_path)

    predictions = model.predict(img)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = float(np.max(predictions))

    return jsonify({
        "prediction": predicted_class,
        "confidence": confidence
    })

@app.route("/rank", methods=["POST"])
def rank_doctors():
    data = request.json
    doctors = data["doctors"]

    if not doctors:
        return jsonify([])

    # 🔹 Use first doctor as query (or ideal profile later)
    query_vector = create_vector(doctors[0])

    results = doctor_index.query(
        vector=query_vector,
        top_k=5,
        include_metadata=True,
        filter={
            "specialization": {"$in": data["specialization"]},
            # "cluster": {"$eq": doctors[0]["cluster"]},
            "isActive": {"$eq": True}
        }
    )

    return jsonify([
        {
            "id": match["id"],
            "score": match["score"]
        }
        for match in results["matches"]
    ])

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
    # print(tf.__version__)
    app.run(host="0.0.0.0", port=8005, debug=True)



# @app.route("/similar", methods=["POST"])
# def similar_doctors():
#     doctor = request.json

#     vector = create_vector(doctor)

#     results = doctor_index.query(
#         vector=vector,
#         top_k=10,
#         include_metadata=True,
#         filter={
#             "specialization": {
#                 "$in": doctor["specialization"]
#             },
#             "isActive": {
#                 "$eq": True
#             }
#         }
#     )

#     formatted = []

#     for match in results["matches"]:
#         formatted.append({
#             "id": match["id"],
#             "score": match["score"],
#             "metadata": match["metadata"]
#         })

#     return jsonify(formatted)
