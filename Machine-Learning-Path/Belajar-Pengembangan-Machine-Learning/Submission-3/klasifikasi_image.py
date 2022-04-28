# -*- coding: utf-8 -*-
"""Subsmission-Klasifikasi-Image.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1l68iFonMVrCEutjSpmUEuSzNq6unTaoL

# **Data Diri**

---
(Peserta Kampus merdeka - Student Indepentdent)


Nama : Gusti Muhammad Aulia Nur Sulthan

Alamat :  Kabupaten Hulu Sungai Selatan, Kalimantan Selatan

SIB Id : M247R6216

SIB Email : M247R6216@dicoding.org	

SIB Group : M3

### Library
"""

import numpy as np
import pandas as pd
import os
import cv2
import datetime
import matplotlib.pyplot as plt

from tqdm.notebook import tqdm

import tensorflow as tf
from sklearn.utils import class_weight, shuffle
from tensorflow.keras import applications
from tensorflow.keras.optimizers import Adam,SGD
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential, Model, load_model
from tensorflow.keras.layers import Dropout, Flatten, Dense,Conv2D,MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint

"""### Import Dataset from kaggle"""

! pip install kaggle

! mkdir ~/.kaggle

! cp kaggle.json ~/.kaggle/

! chmod 600 ~/.kaggle/kaggle.json

! kaggle datasets download -d ibrahimserouis99/one-piece-image-classifier

# Unzip file
import zipfile
 
zip_ref = zipfile.ZipFile('/content/one-piece-image-classifier.zip','r')
zip_ref.extractall('/content/assets')
zip_ref.close()

os.listdir("/content/assets/Data")

"""### Load data"""

foldernames = os.listdir('/content/assets/Data')
categories = []
files = []
for k, folder in enumerate(foldernames):
    filenames = os.listdir("/content/assets/Data/" + folder);
    for file in filenames:
        files.append("/content/assets/Data/" + folder + "/" + file)
        categories.append(k)
        
df = pd.DataFrame({
    'filename': files,
    'category': categories
})
train_df = pd.DataFrame(columns=['filename', 'category'])

for i in range(3):
    train_df = train_df.append(df[df.category == i].iloc[:700,:])

train_df.head()
train_df = train_df.reset_index(drop=True)
train_df

train_df.shape

! pip install split_folders

x = train_df['filename']
y = train_df['category']

x, y = shuffle(x, y, random_state=8)

"""## Resize Image"""

def centering_image(img):
    size = [256,256]
    
    img_size = img.shape[:2]
    
    # centering
    row = (size[1] - img_size[0]) // 2
    col = (size[0] - img_size[1]) // 2
    resized = np.zeros(list(size) + [img.shape[2]], dtype=np.uint8)
    resized[row:(row + img.shape[0]), col:(col + img.shape[1])] = img

    return resized

images = []
with tqdm(total=len(train_df)) as pbar:
    for i, file_path in enumerate(train_df.filename.values):
        #read image
        img = cv2.imread(file_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        #resize
        if(img.shape[0] > img.shape[1]):
            tile_size = (int(img.shape[1]*256/img.shape[0]),256)
        else:
            tile_size = (256, int(img.shape[0]*256/img.shape[1]))

        #centering
        img = centering_image(cv2.resize(img, dsize=tile_size))

        #out put 224*224px 
        img = img[16:240, 16:240]
        images.append(img)
        pbar.update(1)

images = np.array(images)

"""### Split data"""

data_num = len(y)
random_index = np.random.permutation(data_num)

x_shuffle = []
y_shuffle = []
for i in range(data_num):
    x_shuffle.append(images[random_index[i]])
    y_shuffle.append(y[random_index[i]])
    
x = np.array(x_shuffle) 
y = np.array(y_shuffle)
split_val = int(round(0.2*len(y)))
x_train = x[split_val:]
y_train = y[split_val:]
x_test = x[:split_val]
y_test = y[:split_val]

y_train = to_categorical(y_train)
y_test = to_categorical(y_test)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255

img_rows, img_cols, img_channel = 224, 224, 3

img_shape=(img_rows, img_cols, img_channel)

"""### Model Sequential"""

model = tf.keras.models.Sequential([
      tf.keras.layers.Conv2D(64, (3,3), activation='relu', input_shape=img_shape),
      tf.keras.layers.MaxPool2D(2,2),
      tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
      tf.keras.layers.MaxPool2D(2,2),
      tf.keras.layers.Conv2D(128, (3,3), activation='relu'),
      tf.keras.layers.MaxPool2D(2,2),
      tf.keras.layers.Conv2D(128, (3,3), activation='relu'),
      tf.keras.layers.MaxPool2D(2,2),

      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(512, activation='relu'),
      tf.keras.layers.Dropout(0.4),
      tf.keras.layers.Dense(3, activation='softmax')
])
model.compile(optimizer=Adam(learning_rate=3e-4),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

"""### Parameter fit """

batch_size = 32
epochs = 100

train_datagen = ImageDataGenerator(
        rotation_range=30, 
        width_shift_range=0.1,
        height_shift_range=0.1, 
        horizontal_flip=True)
train_datagen.fit(x_train)

"""### Callback function"""

class myCallback(tf.keras.callbacks.Callback):
  def on_epoch_end(self, epoch, logs={}):
    if(logs.get('val_accuracy')>0.85) and (logs.get('accuracy')>0.85):
      print('\nAkurasi telah mencapai > 85%')
      self.model.stop_training = True
myCallbacks = myCallback()

# Commented out IPython magic to ensure Python compatibility.
# %load_ext tensorboard

log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")

tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1)

"""### Train data"""

history = model.fit(
    train_datagen.flow(x_train, y_train, batch_size=batch_size),
    epochs=epochs,
    validation_data=(x_test, y_test),
    callbacks=[myCallbacks, tensorboard_callback])

"""### PLOT MODEL"""

# plot akurasi model
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Akurasi Model')
plt.ylabel('accuracy')
plt.xlabel('epoch')

plt.show()

# plot loss

plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train','val'])
plt.show()

"""## Convert to TF-life"""

converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with tf.io.gfile.GFile('model.tflite', 'wb') as f:
  f.write(tflite_model)