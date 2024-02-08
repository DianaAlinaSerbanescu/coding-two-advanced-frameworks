import tensorflow as tf
from PIL import Image, ImageTk
import tkinter as tk
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
import numpy as np
import requests
from io import BytesIO

# Load the MobileNetV2 model
mobilenet = MobileNetV2(weights='imagenet', include_top=True)



# Load a local image
puffin = Image.open('/Users/oyymm/Desktop/msc/coding_2/week_4/homework/homework_4_2feb2024/images/deer.jpeg')  # Update this path to your local image path
puffin = puffin.resize((224, 224))  # Resize the image for MobileNetV2

# Load an image on internet
# response = requests.get('https://example.com/images/rabbit.jpeg')
# puffin = Image.open(BytesIO(response.content))
# puffin = puffin.resize((224, 224))  # Resize the image for MobileNetV2

# Preprocess the image and make predictions
def predict_image(image):
    image_array = np.array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = preprocess_input(image_array)
    predictions = mobilenet.predict(image_array)
    label = decode_predictions(predictions, top=1)[0][0][1]
    confidence = np.round(predictions[0][np.argmax(predictions)], 2)
    return label, confidence

label, confidence = predict_image(puffin)

# GUI setup using tkinter
root = tk.Tk()
root.title("Image classification")

# Display the image
tk_image = ImageTk.PhotoImage(puffin)
label_image = tk.Label(root, image=tk_image)
label_image.pack()

# Display the classification results
label_text = tk.Label(root, text=f'Label: {label}')
label_text.pack()
confidence_text = tk.Label(root, text=f'Confidence: {confidence}')
confidence_text.pack()

root.mainloop()
