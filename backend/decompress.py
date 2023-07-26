import zstandard as zstd
dctx = zstd.ZstdDecompressor()
submission_path_read = './data/zst/data_2014_07.zst'
submission_path_save = './data/raw_pgn/data_2014_07.pgn'
with open(submission_path_read, 'rb') as ifh, open(submission_path_save, 'wb') as ofh:
    dctx.copy_stream(ifh, ofh, write_size=65536)