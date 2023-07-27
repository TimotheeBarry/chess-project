import pandas as pd
import os
import tensorflow as tf
import numpy as np
from utils.converter import convert_fen_to_array

def build_dataset(file_path, num_samples, batch_size)->tuple[tf.data.Dataset, list[np.ndarray], list[float], pd.DataFrame]:
    df = pd.read_csv(file_path)
    df = df.sample(n=num_samples)
    
    x = list(df['fen'].map(convert_fen_to_array))
    y = list(df['eval'])

    dataset = tf.data.Dataset.from_tensor_slices((x, y))
    dataset = dataset.batch(batch_size)
    dataset = dataset.prefetch(1)

    return dataset, x, y, df

def split_dataset(dataset: tf.data.Dataset, train_ratio: float):
    train_size = int(len(dataset) * train_ratio)
    train_dataset = dataset.take(train_size)
    test_dataset = dataset.skip(train_size)
    return train_dataset, test_dataset



