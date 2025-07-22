from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from db import users
from bson.binary import Binary
import bcrypt

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if users.find_one({"email": data["email"]}):
        return jsonify({"msg": "User already exists"}), 400

    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())
    users.insert_one({
        "email": data["email"],
        "name" : data["name"],
        "password": Binary(hashed)  # ✅ Make sure to wrap in Binary!
    })

    return jsonify({"msg": "Registration successful"}), 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    email = data["email"]
    password = data["password"]

    user = users.find_one({"email": email})
    if not user:
        return jsonify({"msg": "User not found"}), 401

    stored_pw = user["password"]

    try:
        # Case 1: Password is Binary (correctly hashed)
        if isinstance(stored_pw, Binary):
            if bcrypt.checkpw(password.encode(), bytes(stored_pw)):
                token = create_access_token(identity={"email":email, "name": name})
                return jsonify(access_token=token)

        # Case 2: Password is already bytes (should rarely happen)
        elif isinstance(stored_pw, bytes):
            if bcrypt.checkpw(password.encode(), stored_pw):
                token = create_access_token(identity=email)
                return jsonify(access_token=token)

        # Case 3: Password is plaintext (old user)
        elif isinstance(stored_pw, str):
            if password == stored_pw:
                # Hash and update password in DB now
                hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
                users.update_one(
                    { "email": email },
                    { "$set": { "password": Binary(hashed) } }
                )
                token = create_access_token(identity={
                    "email": user_doc["email"],
                    "name": user_doc.get("name", "")
                })
                return jsonify(access_token=token)

        return jsonify({"msg": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"msg": f"Login error: {str(e)}"}), 500
