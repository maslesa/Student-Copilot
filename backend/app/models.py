from pydantic import BaseModel

class ChatReq(BaseModel):
    text: str
    model: str