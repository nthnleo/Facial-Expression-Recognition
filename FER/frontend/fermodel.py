from keras.preprocessing.image import load_img, img_to_array
from .constants import EMOTIONS_LIST, TRAINED_MODEL_PATH, IMAGE_SIZE
import numpy as np
import pickle
import os.path


def load_model(model_file):
    with open(model_file, "rb") as file:
        loaded_model = pickle.load(file)
    return loaded_model


def predict_emotion(face_images, model_file=TRAINED_MODEL_PATH):
    loaded_model = load_model(model_file)
    predictions = loaded_model.predict(face_images)
    return EMOTIONS_LIST[np.argmax(predictions)]


def get_expression():
    images = []
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(my_path, "../face.jpg")
    image = load_img(path,
                     target_size=(IMAGE_SIZE, IMAGE_SIZE), color_mode='grayscale')
    image = img_to_array(image)
    print(image)
    image = np.resize(image, (1, 48, 48, 1))
    images.append(image)
    result = predict_emotion(face_images=images)
    print(result)
