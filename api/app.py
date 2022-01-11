import requests
from flask import Flask,request

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_ACCESS_KEY = "w9AOgPhRvkSeUNud_iTIMeXvMJTPnTxGplxMQJrYKDM"
app = Flask(__name__)

@app.route("/new_image")
def new_image():
    word = request.args.get("query")
    params = {"query" : word}
    headers = {
        "Authorization": "Client-ID " + UNSPLASH_ACCESS_KEY,
        "Accept-Version" : "v1"
        }
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    #print (response,response.json())
    return data

if __name__=="__main__" :
    app.run(port=5050)