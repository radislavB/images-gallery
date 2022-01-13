from crypt import methods
import os
import json
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import mongo_client

load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"

UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
if not UNSPLASH_KEY:
    raise EnvironmentError("access key is missing in .env file")

DEBUG = bool(os.environ.get("DEBUG", False))

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG


@app.route("/")
def root_message():
    """welcome message"""
    return "Hello from API app"


@app.route("/new_image")
def new_image():
    """get new random image data"""
    word = request.args.get("query")
    params = {"query": word}
    headers = {"Authorization": "Client-ID " + UNSPLASH_KEY, "Accept-Version": "v1"}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        return jsonify(mongo_client.get_images())
    elif request.method == "POST":
        print("post images")
        image = request.get_json()
        image["_id"] = image["id"]

        result = mongo_client.save_images(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<id>", methods=["DELETE"])
def delete_image(id):
    result = mongo_client.delete_image(id)
    if result.deleted_count:
        return {"deleted_id": id}
    else:
        return {"error": "Image not found"}, 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
