from db import save_message
from ollama_module import ask_ollama


def process_chat(message: str, model: str):
    
    save_message('user', message)
    answer = ask_ollama(message=message, model=model)
    save_message('bot', answer)
    
    return answer