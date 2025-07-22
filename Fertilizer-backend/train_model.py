import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Load dataset
df = pd.read_csv("fertilizer_recommendation_dataset.csv")

# Rename columns if needed to match consistent naming
df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

# Clean and normalize categorical data
df["crop"] = df["crop"].str.strip().str.lower()
df["soil"] = df["soil"].str.strip().str.lower()
df["fertilizer"] = df["fertilizer"].str.strip().str.lower()
df["remark"] = df["remark"].str.strip().str.lower()

# Initialize encoders
crop_encoder = LabelEncoder()
soil_encoder = LabelEncoder()
fertilizer_encoder = LabelEncoder()
remark_encoder = LabelEncoder()


# Encode categorical columns
df["crop_encoded"] = crop_encoder.fit_transform(df["crop"])
df["soil_encoded"] = soil_encoder.fit_transform(df["soil"])
df["fertilizer_encoded"] = fertilizer_encoder.fit_transform(df["fertilizer"])
df["remark_encoded"] = remark_encoder.fit_transform(df["remark"])

# Select features and target
X = df[["nitrogen", "phosphorous", "potassium", "ph", "moisture", "temperature","rainfall", "soil_encoded", "crop_encoded"]]
#  target
y1 = df["fertilizer_encoded"]
y2 = df["remark_encoded"]

# Train the model
model_fertilizer = RandomForestClassifier()
model_fertilizer.fit(X, y1)
model_remark = RandomForestClassifier()
model_remark.fit(X,y2)



# Ensure model folder exists
os.makedirs("model_fertilizer", exist_ok=True)

# Save the model and encoders
joblib.dump(model_fertilizer, "model/fertilizer_model.pkl")
joblib.dump(crop_encoder, "model/crop_encoder.pkl")
joblib.dump(soil_encoder, "model/soil_encoder.pkl")
joblib.dump(fertilizer_encoder, "model/fertilizer_encoder.pkl")
joblib.dump(remark_encoder, "model/remark_encoder.pkl")
joblib.dump(model_remark, "model/remark_model.pkl")
print(" Model and encoders saved to /model folder.")
