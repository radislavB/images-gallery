import os
from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "")
MONOG_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)


mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONOG_PASSWORD,
    port=MONGO_PORT,
)

gallery = mongo_client.gallery
images_collection = gallery.images


def get_images():
    ''' get images from mongo'''
    images = images_collection.find({})
    return [img for img in images]


def save_images(image_json):
    '''save images'''
    return images_collection.insert_one(image_json)


def insert_test_document():
    """test method"""
    db = mongo_client.test
    test_collection = db.test_collection
    result = test_collection.insert_one({"name": "radi", "instructor": False})
    print(result)
