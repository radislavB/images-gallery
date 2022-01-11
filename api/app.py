import os
import requests
from flask import Flask,request
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"

UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY","")
if not UNSPLASH_KEY :
    raise EnvironmentError("access key is missing in .env file")

DEBUG = bool(os.environ.get("DEBUG", False))

app = Flask(__name__)
CORS(app)
app.config["DEBUG"]=DEBUG



@app.route("/new_image")
def new_image():
    word = request.args.get("query")
    params = {"query" : word}
    headers = {
        "Authorization": "Client-ID " + UNSPLASH_KEY,
        "Accept-Version" : "v1"
        }
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    #print (response,response.json())
    return data

if __name__=="__main__" :
    app.run(port=5050)