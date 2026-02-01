import os

class Config:
    # Paths relative to backend/
    POSITIONAL_INDEXES_PATH = os.getenv("POSITIONAL_INDEXES_PATH", "../positional_indexes")
    ALPHABETIZED_INDEXES_PATH = os.getenv("ALPHABETIZED_INDEXES_PATH", "../alphabetized_indexes")
    STATS_PATH = os.getenv("STATS_PATH", "../stats")

    # Server
    PORT = int(os.getenv("PORT", 8000))
    HOST = os.getenv("HOST", "0.0.0.0")
