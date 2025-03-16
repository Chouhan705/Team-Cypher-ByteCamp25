from gtts import gTTS
import os
import time

def generate_tts(text: str, lang: str = "hi"):
    file_name = f"tts_{int(time.time())}.mp3"
    file_path = f"tts_audio/{file_name}"

    if not os.path.exists("tts_audio"):
        os.makedirs("tts_audio")

    tts = gTTS(text=text, lang=lang)
    tts.save(file_path)

    return file_path
