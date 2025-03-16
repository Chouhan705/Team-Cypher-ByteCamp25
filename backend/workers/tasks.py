from config.settings import celery
import requests
import os
from config.database import db
from datetime import datetime

@celery.task
def fetch_aqi(location):
    API_KEY = os.getenv("AQI_API_KEY")
    response = requests.get(f"https://api.example.com/aqi?city={location}&key={API_KEY}")
    
    if response.status_code == 200:
        data = response.json()
        db.aqi.insert_one({
            "location": location,
            "aqi": data["aqi"],
            "pollutants": data["pollutants"],
            "timestamp": str(datetime.utcnow())
        })

@celery.task
def fetch_weather(location):
    API_KEY = os.getenv("WEATHER_API_KEY")
    response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}")

    if response.status_code == 200:
        data = response.json()
        db.weather.insert_one({
            "location": location,
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "timestamp": str(datetime.utcnow())
        })
