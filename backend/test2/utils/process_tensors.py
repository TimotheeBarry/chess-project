import tensorflow as tf


def save_tensor(array, save_path):
    tensor = tf.convert_to_tensor(array)
    tf.io.write_file(save_path, tf.io.serialize_tensor(tensor))

def load_tensor(load_path, out_type=tf.int32):
    tensor = tf.io.read_file(load_path)
    tensor = tf.io.parse_tensor(tensor, out_type=out_type)
    return tensor

def concat_tensors(tensor_list: list, axis=0):
    tensor = tf.concat(tensor_list, axis=axis)
    return tensor

def flatten_tensor(tensor):
    n, l, h, w = tensor.shape
    print(n, l, h, w)
    tensor = tf.reshape(tensor, (n, l*h*w))

def normalize_tensor(tensor, axis = 0):
    maxi = tf.math.reduce_max(tensor, axis=axis, keepdims=True)
    mini = tf.math.reduce_min(tensor, axis=axis, keepdims=True)

    abs_max = tf.math.maximum(tf.math.abs(maxi), tf.math.abs(mini))
    print(abs_max)
    return tf.math.divide(tensor, abs_max)

def transform_square_root_tensor(tensor, max_value=None):
    tensor = tf.math.sqrt(tf.math.abs(tensor))*tf.math.sign(tensor)
    if max_value is not None:
        maxi = tf.math.reduce_max(tf.math.abs(tensor), axis=0, keepdims=True)
        tensor =  tf.math.divide(tensor, maxi) * max_value
    return tensor

def reverse_transform_square_root_tensor(tensor, max_value=None):
    if max_value is not None:
        tensor = tensor * max_value
    tensor = tf.math.pow(tensor, 2)*tf.math.sign(tensor)
    return tensor
    

