import cv2
import sys
import json
# Load the cascade
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# Read the input image
filepath=sys.argv[1]
img = cv2.imread(filepath)
# Convert into grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Detect faces
faces = face_cascade.detectMultiScale(gray, 1.13, 5)
# Draw rectangle around the faces
num=0
for (x, y, w, h) in faces:
    num+=1
    #cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
# Display the output
print(num)
# cv2.imshow('img', img)
# cv2.waitKey()