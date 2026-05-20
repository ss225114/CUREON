import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

model = tf.keras.models.load_model(
    "image_classification_models/Image_classify_v5.keras"
)

class_names = [
    'Acne',
    'Actinic Keratosis',
    'Chromhidrosis',
    'Eruptive Xanthomas',
    'Erythrasma',
    'Impetigo',
    'Keratosis Pilaris',
    'Leprosy',
    'Lupus',
    'Lyme Disease',
    'Measles',
    'Melanoma',
    'Melasma',
    'Otophyma',
    'RingWorm',
    'Scabies2',
    'Shingles',
    'Solar Lentigo',
    'dermatofibroma',
    'eczema',
    'hives',
    'psoriasis',
    'rosacea',
    'scabies'
]


def preprocess_image(image_path):

    img = image.load_img(
        image_path,
        target_size=(180, 180)
    )

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(
        img_array,
        axis=0
    )

    img_array = preprocess_input(img_array)

    return img_array

def predict_disease(image_path):

    img = preprocess_image(image_path)

    predictions = model.predict(img)

    predicted_class = class_names[
        np.argmax(predictions)
    ]

    confidence = float(np.max(predictions))

    return {
        "prediction": predicted_class,
        "confidence": confidence
    }