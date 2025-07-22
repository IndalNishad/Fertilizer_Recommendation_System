from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from auth import auth
from db import db  #  import database
import joblib
from datetime import datetime  # import datetime
from dotenv import load_dotenv
import os
import requests
from flask import request, jsonify

load_dotenv()

WEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")  # set in Render env


app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "default_secret")  # Use environment variable in production
jwt = JWTManager(app)

app.register_blueprint(auth)

# Load models
model_fertilizer = joblib.load("model/fertilizer_model.pkl")
model_remark = joblib.load("model/remark_model.pkl")
crop_encoder = joblib.load("model/crop_encoder.pkl")
soil_encoder = joblib.load("model/soil_encoder.pkl")
remark_encoder = joblib.load("model/remark_encoder.pkl")
fertilizer_encoder = joblib.load("model/fertilizer_encoder.pkl")

@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    user = get_jwt_identity()
    data = request.get_json()

    try:
        # Clean and validate inputs
        crop_raw = data.get("crop", "").strip().lower()
        soil_raw = data.get("soil", "").strip().lower()
        print("ok1")
        required_fields = ["nitrogen", "phosphorous", "potassium", "ph", "moisture", "temperature","rainfall"]
        for field in required_fields:
            if data.get(field) in [None, ""]:
                print(field)
                return jsonify({"error": f"{field} is required."}), 400

        if not crop_raw or not soil_raw:
            print("ok2")
            return jsonify({"error": "Crop, Soil, and Fertilizer are required."}), 400

        # Encode categorical values
        try:
            print("ok3")
            crop = crop_encoder.transform([crop_raw])[0]
            print("ok4")
            soil = soil_encoder.transform([soil_raw])[0]
            print("ok5")
        except ValueError as ve:
            print("ok6")
            return jsonify({"error": f"Unrecognized category: {ve}"}), 400

        features = [[
            float(data["nitrogen"]),
            float(data["phosphorous"]),
            float(data["potassium"]),
            float(data["ph"]),
            float(data["moisture"]),
            float(data["temperature"]),
            float(data["rainfall"]),
            soil,
            crop
        ]]

        print("🔍 Incoming data:", data)

        prediction_fert = model_fertilizer.predict(features)[0]
        print("ok8 ",prediction_fert)
        prediction_remark = model_remark.predict(features)[0]
        print("ok9 ",prediction_remark)
        result = fertilizer_encoder.inverse_transform([prediction_fert])[0]
        print("ok10 ",result)
        predicted_remark = remark_encoder.inverse_transform([prediction_remark])[0]
        print("ok11", predicted_remark)

        db.predictions.insert_one({
            "user": user,
            "input": data,
            "result": result,
            "predicted_remark": predicted_remark,
            "timestamp": datetime.now()
        })
        print("data saved to db")
        return jsonify({
            "recommended_fertilizer": result,
            "predicted_remark": predicted_remark
        })

    except Exception as e:
        print(" yaha se error aa raha hai!")
        print("❌ Prediction error:", e)
        # traceback.print_exc()
        return jsonify({"error": str(e)}), 400


@app.route("/stats", methods=["GET"])
@jwt_required()
def stats():
    user = get_jwt_identity()

    pipeline = [
        { "$match": { "user": user } },
        { "$group": { "_id": "$result", "count": { "$sum": 1 } } },
        { "$sort": { "count": -1 } }
    ]

    stats_data = list(db.predictions.aggregate(pipeline))
    return jsonify(stats_data)

@app.route("/allowed-values", methods=["GET"])
def get_allowed_values():
    try:
        crops = list(crop_encoder.classes_)
        soils = list(soil_encoder.classes_)
        return jsonify({
            "crops": crops,
            "soils": soils
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    identity = get_jwt_identity()   # may be dict OR email string

    name = "User"
    email = None

    if isinstance(identity, dict):
        # Tokens created like: create_access_token(identity={"name":..., "email":...})
        name = identity.get("name") or User
        email = identity.get("email")
    else:
        # Tokens created like: create_access_token(identity=email_string)
        email = identity

    # If we only got an email, fetch the user from DB
    if email:
        doc = db.users.find_one({"email": email})
        if doc:
            # prefer DB name if present
            name = doc.get("name") or name

    return jsonify({"name": name, "email": email}), 200





@app.route("/weather", methods=["GET"])
def get_weather():
    """
    Return weather metrics needed for fertilizer form.
    Query params:
      ?city=Delhi
    or
      ?lat=28.6&lon=77.2
    Response:
      { "temperature": 32.1, "moisture": 58, "rainfall": 0 }
    """
    if not WEATHER_API_KEY:
        return jsonify({"error": "Weather API key not configured."}), 500

    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if city:
        url = (
            "https://api.openweathermap.org/data/2.5/weather"
            f"?q={city}&units=metric&appid={WEATHER_API_KEY}"
        )
    elif lat and lon:
        url = (
            "https://api.openweathermap.org/data/2.5/weather"
            f"?lat={lat}&lon={lon}&units=metric&appid={WEATHER_API_KEY}"
        )
    else:
        return jsonify({"error": "city or lat/lon required."}), 400

    try:
        r = requests.get(url, timeout=10)
        data = r.json()
    except Exception as e:
        return jsonify({"error": f"Weather request failed: {e}"}), 502

    if r.status_code != 200:
        return jsonify({"error": data.get("message", "Weather fetch failed.")}), r.status_code

    temp = _safe_num(data.get("main", {}).get("temp"))
    humidity = _safe_num(data.get("main", {}).get("humidity"))  # proxy for moisture %
    rain = data.get("rain", {})
    rain_val = _safe_num(rain.get("1h"))
    if rain_val is None:
        rain_val = _safe_num(rain.get("3h"))
    if rain_val is None:
        rain_val = 0

    return jsonify({
        "temperature": temp,
        "moisture": humidity,
        "rainfall": rain_val,
        "source_city": data.get("name")
    }), 200


def _safe_num(v):
    try:
        return round(float(v), 2)
    except (TypeError, ValueError):
        return None



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

