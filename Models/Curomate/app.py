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

load_dotenv()

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

<<<<<<< HEAD
@app.route("/get", methods=["POST"])
=======
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
>>>>>>> a2f25b3c95572cb5a19de3d246836bedcdff7860
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
            "response": response
        })

    # DOCTOR SEARCH
    # elif intent == "doctor_search":

    #     print("Detected doctor search intent.")

    #     doctors = search_doctors(msg)

    #     # Convert list to single string
        
    #     doctors_string = ", ".join(doctors)

    #     return jsonify({
    #         "type": "doctor_search",
    #         "response": doctors_string
    #     })

    elif intent == "doctor_search":

        print("Detected doctor search intent.")

        doctors = search_doctors(msg)

        if not doctors:

            doctors_string = "No such doctors found."

        else:

            doctors_string = ", ".join(doctors)

        return jsonify({
            "type": "doctor_search",
            "response": doctors_string
        })

    return jsonify({
        "response": "Could not understand request."
    })

# @app.route("/predict", methods=["POST"])
# def predict():

#     if "image" not in request.files:

#         return jsonify({
#             "error": "No image uploaded"
#         }), 400

#     file = request.files["image"]

#     filepath = os.path.join(
#         UPLOAD_FOLDER,
#         file.filename
#     )

#     file.save(filepath)

#     result = predict_disease(filepath)

#     return jsonify(result)

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


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8005,
        debug=True
    )