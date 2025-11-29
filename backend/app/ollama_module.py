import ollama

client = ollama.Client()

def ask_ollama(message, model):
    return client.generate(model=model, prompt=message).response

