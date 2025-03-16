from pydantic import BaseModel

class Weather(BaseModel):
    location: str
    temperature: float
    humidity: int
    wind_speed: float
    timestamp: str
