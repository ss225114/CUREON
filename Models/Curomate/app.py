from flask import Flask, jsonify, request
from flask_cors import CORS
from src.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
# from huggingface_hub import InferenceClient
from openai import OpenAI
from dotenv import load_dotenv
from src.prompt import *
import os
import re

app = Flask(__name__, static_folder=None)
CORS(app)

load_dotenv()

# API keys
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
# OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
# os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# Embeddings & vector store
embeddings = download_embeddings()
index_name = "med-assist"
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k":3})

# HuggingFace client
HF_TOKEN = os.getenv("LLM_API_TOKEN")
# HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"
# client = InferenceClient(model=HUGGINGFACE_REPO_ID, token=HF_TOKEN)
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_TOKEN,
)

chat_history = []

# Function to rewrite query
def rewrite_query(chat_history, new_query):
    history_text = "\n".join([f"{m['role']}: {m['content']}" for m in chat_history])
    formatted_prompt = question_rewriter_prompt.format(
        chat_history=history_text, new_query=new_query
    )
    response = client.chat.completions.create(
        model="HuggingFaceTB/SmolLM3-3B:hf-inference",  # replace with any supported HF chat model
        messages=[
            {"role": "system", "content": "You rewrite follow-up questions into full standalone queries."},
            {"role": "user", "content": formatted_prompt},
        ],
        temperature=0.3,
        max_tokens=128
    )

    # Extract rewritten question
    rewritten = response.choices[0].message.content.strip()
    return rewritten

# Main retrieval chain
def retrieval_chain(query: str) -> str:
    rewritten_query = rewrite_query(chat_history, query)
    docs = retriever.invoke(rewritten_query)
    context = "\n\n".join(d.page_content for d in docs)
    history_text = "\n".join([f"{m['role']}: {m['content']}" for m in chat_history])
    full_context = history_text + "\n\n" + context
    chat_history.clear()

    formatted_prompt = system_prompt.format(context=full_context, question=query)
    response = client.chat.completions.create(
        model="HuggingFaceTB/SmolLM3-3B:hf-inference",  # same as above
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": formatted_prompt},
        ],
        temperature=0.5,
        max_tokens=512
    )

    answer = response.choices[0].message.content.strip()

    cleaned = re.sub(r"<think>.*?</think>\n", "", answer, flags=re.DOTALL)
    
    chat_history.append({"role": "user", "content": query})
    chat_history.append({"role": "assistant", "content": cleaned})
    return cleaned

# Route supporting both POST and GET
@app.route("/get", methods=["POST", "GET"])
def chat():
    if request.method == "POST":
        data = request.get_json() or {}
        msg = data.get("msg", "")
    else:  # GET request
        msg = request.args.get("msg", "")
    
    if not msg:
        return jsonify({"error": "No message provided"}), 400

    response = retrieval_chain(msg)
    return jsonify({"response": response})

if __name__ == '__main__':
    print(app.url_map)
    app.run(host="0.0.0.0", port=8005, debug=True)


