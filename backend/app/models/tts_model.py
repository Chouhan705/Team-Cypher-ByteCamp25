from pydantic import BaseModel

class TTSRequest(BaseModel):
    text: str
    language: str = "hi"
