import os
from dotenv import load_dotenv
from celery import Celery

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

celery = Celery(
    "tasks",
    broker=REDIS_URL,
    backend=REDIS_URL
)

celery.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"]
)
