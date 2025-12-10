# system_prompt = (
#     "You are an Mediacl assistant for question-answering tasks. "
#     "Use the following pieces of retrieved ontext to answer "
#     "the question. if you odn't know the answer, say that you "
#     "don't know. Use three sentences maximum and keep the "
#     "answer concise."
#     "\n\n"
#     "{context}"
# )
from langchain_core.prompts import ChatPromptTemplate

system_prompt = ChatPromptTemplate.from_template("""
Use the pieces of information provided in the context to answer the user's question.
If you don't know the answer, just say you don't know. Do not make up an answer.
Do not provide anything outside the given context. If the question points to the previous context then answer 
the question directly or else use the new context to answer the question.

Context: {context}
Question: {question}

Start the answer directly. No small talk.
""")

question_rewriter_prompt = ChatPromptTemplate.from_template("""
You are a question reformulation assistant.

Given the past conversation and the new user question,
rewrite the question so that it is self-contained and clear in isolation.

Keep the meaning the same, but include necessary context.

Conversation history:
{chat_history}

User question:
{new_query}

Rewritten standalone question:
""")