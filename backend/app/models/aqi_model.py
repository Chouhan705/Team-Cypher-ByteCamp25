from pydantic import BaseModel
from typing import Optional

class AQI(BaseModel):
    location: str
    aqi: int
    pollutants: dict
    timestamp: str
