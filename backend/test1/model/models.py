import tensorflow as tf
from keras import layers, models

class ChessModel():
    def __init__(self, nb_filters = 32, activation = 'tanh', input_shape = (8, 8, 6)):
        self.model = models.Sequential()
        # Convolutional layers
        self.model.add(layers.Conv2D(nb_filters, (3, 3), activation=activation, input_shape=input_shape))
        self.model.add(layers.Conv2D(2*nb_filters, (3, 3), activation=activation))
        self.model.add(layers.Conv2D(2*nb_filters, (3, 3), activation=activation))

        # Flatten the output before feeding into the dense layers
        self.model.add(layers.Flatten())

        # Dense layers
        self.model.add(layers.Dense(2*nb_filters, activation=activation))
        self.model.add(layers.Dense(1), )  # Output layer



# if __name__ == '__main__':
#     model = ChessModel(nb_filters=16, activation= 'tanh', input_shape=(8,8,6)).model
#     model.summary()