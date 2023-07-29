from utils.process_board import convert_board_to_array
from utils.random_board import generate_random_board
from utils.stockfish import get_score
from utils.process_tensors import save_tensor, load_tensor, concat_tensors
import numpy as np
import random
import chess, chess.pgn
import tensorflow as tf

def save_dataset(input_array, output_array, save_dir):
    input_path = save_dir + "input"
    output_path = save_dir + "output"

    input_tensor = tf.convert_to_tensor(input_array)
    output_tensor = tf.convert_to_tensor(output_array)
    try:
        loaded_input = load_tensor(input_path, out_type=tf.int32)
        loaded_output = load_tensor(output_path, out_type=tf.float32)

        input_tensor = concat_tensors([input_tensor, loaded_input], axis=0)
        output_tensor = concat_tensors([output_tensor, loaded_output], axis=0)

    except Exception as e:
        pass
    save_tensor(input_tensor, input_path)
    save_tensor(output_tensor, output_path)


def generate_dataset_from_random_boards(nb_pos:int, save_every:int=100, folder_name='', stockfish_depth=10, board_max_depth = 200, shape=(7, 8, 8)):
    save_dir = f"data/{folder_name}/"
    done = False # to stop multi threading before the end of the generation
    input_array = np.zeros((save_every, shape[0], shape[1], shape[2]), dtype=np.int32)
    output_array = np.zeros((save_every,), dtype=np.float32)
    position_index = 0
    if save_every > nb_pos:
        save_every = nb_pos

    while position_index < nb_pos:
        if done:
            print('done')
            break
        row = position_index%save_every
        board = generate_random_board(board_max_depth)
        input_array[row] = convert_board_to_array(board, shape=shape)
        output_array[row] = get_score(board, stockfish_depth)
        position_index += 1
        if row == save_every-1:
            save_dataset(input_array, output_array, save_dir)
            input_array = np.zeros((save_every, shape[0], shape[1], shape[2]), dtype=np.int32)
            output_array = np.zeros((save_every,), dtype=np.float32)
            print(f'{position_index}/{nb_pos} saved to {save_dir}')

def generate_dataset_from_pgn_file(nb_pos:int, save_every:int=100, p=0.1, file_path='',folder_name='', shape=(8, 8, 8), max_eval=99.99):
    if save_every > nb_pos:
        save_every = nb_pos
    save_dir = f"data/{folder_name}/"
    done = False # to stop multi threading before the end of the generation
    input_array = np.zeros((save_every, shape[0], shape[1], shape[2]), dtype=np.int32)
    output_array = np.zeros((save_every,), dtype=np.float32)
    position_index, nb_games = 0, 0

    with open(file_path) as pgn:
        game = None
        while position_index < nb_pos:
            row_index = position_index % save_every
            if done:
                print('done')
                break
                
            if game is None or game.is_end():
                game = chess.pgn.read_game(pgn)
                nb_games += 1
                continue
            
            game = game.next()
            r = random.random()
            if r > p:
                # skip some positions
                continue
            try: 
                eval = game.eval().white().score(mate_score=10000)/100
                if eval>max_eval or eval<-max_eval:
                    eval = max_eval * np.sign(eval)
            except:
                continue
            board3d = convert_board_to_array(game.board(), shape=shape)
                  
            input_array[row_index] = board3d
            output_array[row_index] = eval
            position_index += 1

            if row_index == save_every-1:
                save_dataset(input_array, output_array, save_dir)
                input_array = np.zeros((save_every, shape[0], shape[1], shape[2]), dtype=np.int32)
                output_array = np.zeros((save_every,), dtype=np.float32)
                print(f'{position_index}/{nb_pos} from {nb_games} games saved to {save_dir}')
    
