import tensorflow as tf

def callback_setup(checkpoint_filepath : str = "", monitor : str = 'loss', mode : str = 'min'):
    model_callbacks = []

    if checkpoint_filepath :
        model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
            filepath=checkpoint_filepath,
            save_weights_only=True,
            monitor=monitor,
            mode=mode,
            save_best_only=True,
            )
        model_callbacks.append(model_checkpoint_callback)

    return model_callbacks