from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

# client = MongoClient("mongodb://localhost:27017/")
db = client["fertilizer_db"]
users = db["users"]
predictions = db["predictions"]

def save_prediction(data, result, user):
    entry = {
        "user": user,
        "crop": data["crop"],
        "N": data["N"],
        "P": data["P"],
        "K": data["K"],
        "pH": data["pH"],
        "moisture": data["moisture"],
        "recommended_fertilizer": result,
        "timestamp": datetime.now()
    }
    predictions.insert_one(entry)
