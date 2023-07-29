import tensorflow as tf
from utils.build_model import build_model

def load_model(checkpoint_dir:str, optimizer='adam', metrics=['mse', 'mae', 'msle']):
    try:
        file_name = checkpoint_dir.split('/')[-2]
        loss, nb_layers, nb_filters, _ , _ = file_name.split('_')
        model = build_model(nb_layers=int(nb_layers), nb_filters=int(nb_filters))
        model.compile(optimizer=optimizer, loss=loss, metrics=metrics)
        model.load_weights(checkpoint_dir)
        return model
    except Exception as e:
        print(e)
        return None