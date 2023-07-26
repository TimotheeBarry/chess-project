
import numpy as np
pieces = ['r', 'n', 'b', 'q', 'k', 'p', 'R', 'N', 'B', 'Q', 'K', 'P']
pieces_dict = {'r': -5, 'n': -2, 'b': -3, 'q': -9, 'k': -100, 'p': -1, 'R': 5, 'N': 2, 'B': 3, 'Q': 9, 'K': 100, 'P': 1}


def convert_fen_row_to_array(fen_row: str, piece: list[str]):
        array = np.zeros(8, dtype=np.int64)
        idx = 0
        for char in fen_row:
            if char.isdigit():
                idx += int(char)
            else:
                array[idx] = pieces_dict[char]
                idx += 1
        return array


def convert_fen_to_array(fen: str):
    # environ 0.3 à 0.4ms par fen
    game = fen.split(' ')[0]
    rows = game.split('/')
    tensor_array = np.zeros((8, 8), dtype=np.int64)
    for row_idx, row in enumerate(rows):
        for piece_idx, piece in enumerate(pieces):
            tensor_array[row_idx, :] = convert_fen_row_to_array(row, piece)
        tensor_array[row_idx, :] = convert_fen_row_to_array(row, piece)
        # add dimension to last axis
    tensor_array = np.expand_dims(tensor_array, axis=-1)
    return tensor_array