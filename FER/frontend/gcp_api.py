import sys
import os
from google.cloud import automl_v1beta1


def get_prediction(content, project_id, model_id):
    prediction_client = automl_v1beta1.PredictionServiceClient()

    name = 'projects/{}/locations/us-central1/models/{}'.format(
        project_id, model_id)
    payload = {'image': {'image_bytes': content}}
    params = {}
    request = prediction_client.predict(name, payload, params)
    return request  # waits till request is returned


def gcp_api_get_expression():
    project_id = 'fer-project-241205'
    model_id = 'ICN5907511835162082476'

    my_path = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(my_path, "../face.jpg")

    with open(file_path, 'rb') as ff:
        content = ff.read()

    expression = get_prediction(content, project_id,  model_id)
    print(expression)
    return expression