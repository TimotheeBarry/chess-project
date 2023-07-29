import chess
import random
import numpy as np
import tensorflow as tf

# def convert_board_to_array(board: chess.Board):
#     board3d = np.zeros((7, 8, 8), dtype=np.int32) #(piece and attacks, row, col)
#     for piece in chess.PIECE_TYPES:
#         piece_index = piece - 1
#         for square in board.pieces(piece, chess.WHITE):
#             board3d[piece_index][square // 8][square % 8] = 1
#         for square in board.pieces(piece, chess.BLACK):
#             board3d[piece_index][square // 8][square % 8] = -1
#     legal_moves_value = 1 if board.turn == chess.WHITE else -1
#     for move in board.legal_moves:
#         square = move.to_square
#         board3d[6][square // 8][square % 8] = legal_moves_value
#     return board3d

# def convert_board_to_tensor(board: chess.Board, expand_dims=True):
#     board3d = convert_board_to_array(board)
#     tf_board = tf.convert_to_tensor(board3d, dtype=tf.float32)
#     if expand_dims:
#         tf_board = tf.expand_dims(tf_board, 0)
#     return tf_board

# def convert_board_to_array_2(board: chess.Board):
#     board3d = np.zeros((8, 8, 8), dtype=np.int32) 
#     #first 8 dims: 6 for pieces, 1 for attacks, 1 for under attacks
#     for piece in chess.PIECE_TYPES:
#         piece_index = piece - 1
#         for square in board.pieces(piece, chess.WHITE):
#             board3d[piece_index][square // 8][square % 8] = 1
#         for square in board.pieces(piece, chess.BLACK):
#             board3d[piece_index][square // 8][square % 8] = -1

#     player_value = 1 if board.turn == chess.WHITE else -1
#     for square in chess.SQUARES:
#         attackers_list = list(board.attackers(board.turn, square))
#         under_attacks_list = list(board.attackers(not board.turn, square))
    
#         if len(attackers_list) > 0:
#             col, row = square % 8, square // 8
#             board3d[6][row][col] = player_value
        
#         if len(under_attacks_list) > 0:
#             col, row = square % 8, square // 8
#             board3d[7][row][col] = - player_value
    
#     return board3d

def convert_board_to_array(board: chess.Board, shape:(7,8,8)):
    board3d = np.zeros(shape, dtype=np.int32)
    for piece in chess.PIECE_TYPES:
        piece_index = piece - 1
        for square in board.pieces(piece, chess.WHITE):
            board3d[piece_index][square // 8][square % 8] = 1
        for square in board.pieces(piece, chess.BLACK):
            board3d[piece_index][square // 8][square % 8] = -1
    # shape (7,8,8)
    if shape[0] == 7:
        legal_moves_value = 1 if board.turn == chess.WHITE else -1
        for move in board.legal_moves:
            square = move.to_square
            board3d[6][square // 8][square % 8] = legal_moves_value
    # shape (8,8,8)
    elif shape[0] == 8:
        player_value = 1 if board.turn == chess.WHITE else -1
        for square in chess.SQUARES:
            attackers_list = list(board.attackers(board.turn, square))
            under_attacks_list = list(board.attackers(not board.turn, square))
        
            if len(attackers_list) > 0:
                col, row = square % 8, square // 8
                board3d[6][row][col] = player_value
            
            if len(under_attacks_list) > 0:
                col, row = square % 8, square // 8
                board3d[7][row][col] = - player_value
    
    else:
        raise ValueError("Invalid shape")
    return board3d

def get_board_from_tensor(tensor):
    board = chess.Board()
    board.clear()
    for piece in chess.PIECE_TYPES:
        piece_index = piece - 1
        for square in chess.SQUARES:
            if tensor[piece_index][square // 8][square % 8] == 1:
                board.set_piece_at(square, chess.Piece(piece, chess.WHITE))
            elif tensor[piece_index][square // 8][square % 8] == -1:
                board.set_piece_at(square, chess.Piece(piece, chess.BLACK))
    return board
