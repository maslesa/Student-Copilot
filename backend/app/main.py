from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import init_database, get_all_messages
from models import ChatReq
from chat import process_chat

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_database()

@app.post('/chat')
def chat(req: ChatReq):
    reply = process_chat(message=req.text, model=req.model)
    return {'reply': reply}

@app.get('/fetch-messages')
def fetch_messages():
    messages = get_all_messages()
    return {'messages': messages}