from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from src.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
from groq import Groq
from src.prompt import *
import os
import re
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# App setup
app = Flask(__name__)
CORS(app)
load_dotenv()

model = tf.keras.models.load_model("image_classification_models/Image_classify_v3.keras")

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
    search_kwargs={"k": 3}
)

chat_history = []

def rewrite_query(chat_history, new_query):
    history_text = "\n".join(
        [f"{m['role']}: {m['content']}" for m in chat_history]
    )

    prompt = question_rewriter_prompt.format(
        chat_history=history_text,
        new_query=new_query
    )

    response = client.chat.completions.create(
    # model="llama-3.1-8b-instant",
    model="meta-llama/llama-4-maverick-17b-128e-instruct",
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

def retrieval_chain(query: str) -> str:
    rewritten_query = rewrite_query(chat_history, query)

    docs = retriever.invoke(rewritten_query)
    context = "\n\n".join(d.page_content for d in docs)

    formatted_prompt = system_prompt.format(
        context=context,
        question=query
    )

    response = client.chat.completions.create(
    # model="llama-3.1-8b-instant",
    model="meta-llama/llama-4-maverick-17b-128e-instruct",
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
    cleaned = re.sub(r"<think>.*?</think>", "", answer, flags=re.DOTALL)

    chat_history.append({"role": "user", "content": query})
    chat_history.append({"role": "assistant", "content": cleaned})

    return cleaned

def preprocess_image(image_path):

    img = image.load_img(image_path, target_size=(180, 180))

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)

    return img_array

@app.route("/get", methods=["GET", "POST"])
def chat():
    if request.method == "POST":
        msg = request.json.get("msg", "")
    else:
        msg = request.args.get("msg", "")

    if not msg:
        return jsonify({"error": "No message provided"}), 400

    response = retrieval_chain(msg)
    return jsonify({"response": response})

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8005, debug=True)
