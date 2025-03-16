from fastapi import APIRouter
from models.tts_model import TTSRequest
from services.tts_service import generate_tts

router = APIRouter()

@router.post("/tts/")
async def generate_speech(tts_request: TTSRequest):
    file_path = generate_tts(tts_request.text, tts_request.language)
    return {"message": "Audio generated", "file": file_path}
