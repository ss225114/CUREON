from langchain_pinecone import PineconeVectorStore
from src.helper import download_embeddings
from src.prompt import system_prompt
from src.prompt import question_rewriter_prompt
from groq import Groq
import os
import re

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

embeddings = download_embeddings()

index_name = "cureon"


docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriever = docsearch.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}
)


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


def retrieval_chain(query: str, chat_history) -> str:
    rewritten_query = ""
    if len(chat_history) == 0:
        rewritten_query = query
    else:
        rewritten_query = rewrite_query(chat_history, query)
    
    print(rewritten_query)

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
