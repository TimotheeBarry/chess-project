import datetime
import tensorflow as tf

def create_checkpoint_name(loss, nb_layers, nb_filters, batchsize, shape, try_nb = 0):

    shape_str = f"{shape[0]}{shape[1]}{shape[2]}"
    return f"loss={loss}-layers={nb_layers}-filters={nb_filters}-batchsize={batchsize}-shape={shape_str}-try={str(try_nb).zfill(2)}/"

def callback_setup(checkpoint_dir : str = "", logs_dir:str='', monitor : str = 'loss', mode : str = 'min'):
    model_callbacks = []

    if checkpoint_dir :
        model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
            filepath=checkpoint_dir,
            save_weights_only=True,
            monitor=monitor,
            mode=mode,
            save_best_only=True,
            )
        model_callbacks.append(model_checkpoint_callback)

    """=== LOGS ==="""
    if logs_dir:
        # log_dir = logs_dir + datetime.datetime.now().strftime(
        #     "%Y_%m_%d-%H_%M_%S"
        # )
        tensorboard_callback = tf.keras.callbacks.TensorBoard(
            log_dir=logs_dir, histogram_freq=1, write_graph=True, write_images=False
        )
        model_callbacks.append(tensorboard_callback)

    return model_callbacks

# if __name__ == "__main__":
#     print(create_checkpoint_name('mae', 3, 32, 32, (8, 8, 8)))
