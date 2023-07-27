import chess
import chess.engine
import os
import sys
from utils.random_board import generate_random_board

def stockfish_evaluation(board, depth):
    engine = chess.engine.SimpleEngine.popen_uci("../stockfish/stockfish-windows-x86-64-avx2")
    result = engine.analyse(board, chess.engine.Limit(depth=depth))
    engine.quit()
    return result

def get_score(board, depth = 10):
    result = stockfish_evaluation(board, depth)
    return result["score"].white().score(mate_score=10000)/100

def gest_best_move(board, depth):
    result = stockfish_evaluation(board, depth)
    return result["pv"][0]
