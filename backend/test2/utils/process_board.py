import chess
import random
import numpy as np

def convert_board_to_array(board: chess.Board):
    board3d = np.zeros((7, 8, 8), dtype=np.int32) #(piece and attacks, row, col)
    for piece in chess.PIECE_TYPES:
        piece_index = piece - 1
        for square in board.pieces(piece, chess.WHITE):
            board3d[piece_index][square // 8][square % 8] = 1
        for square in board.pieces(piece, chess.BLACK):
            board3d[piece_index][square // 8][square % 8] = -1
    legal_moves_value = 1 if board.turn == chess.WHITE else -1
    for move in board.legal_moves:
        square = move.to_square
        board3d[6][square // 8][square % 8] = legal_moves_value
    return board3d