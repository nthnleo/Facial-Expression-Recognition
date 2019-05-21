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
    model_id = 'ICN680681802267300851'

    my_path = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(my_path, "../face.jpg")

    with open(file_path, 'rb') as ff:
        content = ff.read()

    expression = get_prediction(content, project_id,  model_id)

    if (expression != None and expression.payload[0] != None and expression.payload[0].display_name):
        return expression.payload[0].display_name
    return None
