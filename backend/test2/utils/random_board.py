import chess
import random

def generate_random_board(max_depth= 200):
    board = chess.Board()
    depth = random.randrange(1, max_depth)
    for d in range(depth):
        move = random.choice(list(board.legal_moves))
        board.push(move)
        if board.is_game_over():
            board.pop()
            depth = d - 1
            break
    return board

