# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import cv2
import base64
from .fermodel import get_expression
from .gcp_api import gcp_api_get_expression
import os.path
import os


# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')


@api_view(['GET', 'POST'])
def extractExpression(request):
    if request.method == 'POST':
        dataString = request.data.get("data", "some random data")
        convertBase64ToJPG(dataString)
        # getFaceFromImage(
        #     '../captured.jpg')
        my_path = os.path.abspath(os.path.dirname(__file__))
        path = os.path.join(my_path, "../captured.jpg")
        noOfFaces = getFaceFromImage(path)

        # predict expression by using data model
        if (noOfFaces == None):
            return Response({"expression": "None", "expressionFromGCP": "None"})

        expression = get_expression()
        expressionFromGCP = gcp_api_get_expression()

        # remove the face.jpg
        os.remove('face.jpg')
        return Response({"expression": expression, "expressionFromGCP": expressionFromGCP})
    return Response({"message": "This is a get"})


def convertBase64ToJPG(dataString):
    requestArray = dataString.split(",")
    base64String = requestArray[1]
    base64Byte = base64String.encode()
    with open("captured.jpg", "wb") as fh:
        fh.write(base64.decodebytes(base64Byte))


def getFaceFromImage(imagePath):
    print({imagePath})
    image = cv2.imread(imagePath)
    #convert in grayscale
    # The .imread() function takes the input image, which is passed as an argument to the script,
    # and converts it to an OpenCV object. Next, OpenCV's .cvtColor() function converts the input image object to a
    # grayscale object.
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cv2.imwrite('gray_image.png', gray)
    # cv2.imshow('image', gray)
    # cv2.waitKey(0)

    '''gray: This specifies the use of the OpenCV grayscale image object that you loaded earlier.
    scaleFactor: This parameter specifies the rate to reduce the image size at each image scale. Your model has a fixed scale during training, so input images can be scaled down for improved detection. This process stops after reaching a threshold limit, defined by maxSize and minSize.
    minNeighbors: This parameter specifies how many neighbors, or detections, each candidate rectangle should have to retain it. A higher value may result in less false positives, but a value too high can eliminate true positives.
    minSize: This allows you to define the minimum possible object size measured in pixels. Objects smaller than this parameter are ignored.
    '''
    faceCascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=3,
        minSize=(30, 30)
    )

    # After generating a list of rectangles, the faces are then counted with the len function.
    # The number of detected faces are then returned as output after running the script.
    print("Found {0} Faces!".format(len(faces)))
    if (len(faces) == 0):
        return None

    '''Next, you will use OpenCV's .rectangle() method to draw a rectangle around the detected faces:
    This code uses a for loop to iterate through the list of pixel locations returned from faceCascade.detectMultiScale method for each detected object. The rectangle method will take four arguments:
    image tells the code to draw rectangles on the original input image.
    (x,y), (x+w, y+h) are the four pixel locations for the detected object. rectangle will use these to locate and draw rectangles around the detected objects in the input image.
    (0, 255, 0) is the color of the shape. This argument gets passed as a tuple for BGR. For example, you would use (255, 0, 0) for blue. We are using green in this case.
    2 is the thickness of the line measured in pixels.'''
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        '''The roi_color object plots the pixel locations from the faces list on the original input image. 
        The x, y, h, and w variables are the pixel locations for each of the objects detected from faceCascade.detectMultiScale 
        method. 
        The code then prints output stating that an object was found and will be saved locally.
        Once that is done, the code saves the plot as a new image using the cv2.imwrite method. 
        It appends the width and height of the plot to the name of the image being written to. 
        This will keep the name unique in case there are multiple faces detected.'''
        roi_color = image[y:y + h, x:x + w]
        print("[INFO] Object found. Saving locally.")
        gray_image = cv2.cvtColor(roi_color, cv2.COLOR_BGR2GRAY)

        cv2.imwrite('face.jpg', gray_image)

    '''Now that you've added the code to draw the rectangles, use OpenCV's .imwrite() method to write the new image 
    to your local filesystem as faces_detected.jpg. 
    This method will return true if the write was successful and false if it wasn't able to write the new image.'''

    status = cv2.imwrite('faces_detected.jpg', image)

    print("Image faces_detected.jpg written to filesystem: ", status)
    return len(faces)
