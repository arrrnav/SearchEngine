import sys
import os

# Add parent directory to Python path to import searcher
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from searcher import Searcher
from config import Config

class SearchService:
    def __init__(self):
        print("Initializing SearchService...")
        self.searcher = Searcher(
            pos_indexes_path=Config.POSITIONAL_INDEXES_PATH,
            split_path=Config.ALPHABETIZED_INDEXES_PATH,
            stats_path=Config.STATS_PATH
        )
        self.total_docs = self.searcher.total_docs
        self.total_tokens = len(self.searcher.document_freqs)
        print(f"SearchService initialized: {self.total_docs} docs, {self.total_tokens} tokens")

    def search(self, query: str, limit: int = 5) -> list[str]:
        results = self.searcher.search(query)
        return results[:limit]

    def get_stats(self):
        return {
            "total_documents": self.total_docs,
            "total_tokens": self.total_tokens,
            "index_partitions": 6
        }
