import tensorflow as tf
import numpy as np

pieces = ['r', 'n', 'b', 'q', 'k', 'p', 'R', 'N', 'B', 'Q', 'K', 'P']

def convert_fen_row_to_array(fen_row: str, piece: list[str]):
        array = np.zeros(8, dtype=np.uint8)
        idx = 0
        for char in fen_row:
            if char.isdigit():
                idx += int(char)
            elif char == piece:
                array[idx] = 1
                idx += 1
            else:
                idx += 1
        return array

def convert_fen_to_tensor(fen: str):
    # environ 0.3 à 0.4ms par fen
    game = fen.split(' ')[0]
    rows = game.split('/')
    tensor_array = np.zeros((12, 8, 8), dtype=np.uint8)
    for piece_idx, piece in enumerate(pieces):
        for row_idx, row in enumerate(rows):
            tensor_array[piece_idx, row_idx, :] = convert_fen_row_to_array(row, piece)
  
    return tf.convert_to_tensor(tensor_array)