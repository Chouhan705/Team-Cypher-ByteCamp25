from fastapi import APIRouter
from models.aqi_model import AQI
from config.database import db

router = APIRouter()

@router.get("/aqi/{location}")
async def get_aqi(location: str):
    data = await db.aqi.find_one({"location": location})
    if data:
        return data
    return {"message": "No AQI data found"}

@router.post("/aqi/")
async def add_aqi(aqi: AQI):
    await db.aqi.insert_one(aqi.dict())
    return {"message": "AQI data added"}
