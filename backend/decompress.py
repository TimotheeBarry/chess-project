import zstandard as zstd
dctx = zstd.ZstdDecompressor()
submission_path_read = 'lichess_db_standard_rated_2013-09.pgn.zst'
submission_path_save = 'lichess_db_standard_rated_2013-09.pgn'
with open(submission_path_read, 'rb') as ifh, open(submission_path_save, 'wb') as ofh:
    dctx.copy_stream(ifh, ofh, write_size=65536)