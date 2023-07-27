import tensorflow as tf

def build_model(nb_filters, nb_layers, shape=(7, 8, 8)):
    model = tf.keras.Sequential()
    for _ in range(nb_layers):
        model.add(tf.keras.layers.Conv2D(nb_filters, (3, 3), activation='relu', padding='same', input_shape=shape))
        model.add(tf.keras.layers.Dropout(0.2))
    
    model.add(tf.keras.layers.Flatten())
    model.add(tf.keras.layers.Dense(64, activation='relu'))
    model.add(tf.keras.layers.Dense(1, activation='tanh'))
    
    return model

def build_model_2(nb_filters, nb_layers, shape=(7, 8, 8)):
    board3d = tf.keras.layers.Input(shape=shape)

    x = board3d
    for _ in range(nb_layers):
        x = tf.keras.layers.Conv2D(nb_filters, (3, 3), activation='relu', padding='same')(x)
    
    x = tf.keras.layers.Flatten()(x)
    x = tf.keras.layers.Dense(64, activation='relu')(x)
    x = tf.keras.layers.Dense(1, activation='tanh')(x)

    model = tf.keras.Model(inputs=board3d, outputs=x)
    return model

# if __name__ == '__main__':
    # model = build_model(32, 2)
    # model.summary()

    # model_2 = build_model_2(32, 2)
    # model_2.summary()