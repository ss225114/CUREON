from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from src.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
from groq import Groq
from src.prompt import *
import os
import re

# App setup
app = Flask(__name__)
CORS(app)
load_dotenv()

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8005, debug=True)
