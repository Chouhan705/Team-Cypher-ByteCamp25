from fastapi import APIRouter
from models.weather_model import Weather
from config.database import db

router = APIRouter()

@router.get("/weather/{location}")
async def get_weather(location: str):
    data = await db.weather.find_one({"location": location})
    if data:
        return data
    return {"message": "No weather data found"}

@router.post("/weather/")
async def add_weather(weather: Weather):
    await db.weather.insert_one(weather.dict())
    return {"message": "Weather data added"}
