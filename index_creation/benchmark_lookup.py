"""
benchmark_lookup.py
-------------------
Measures the average token lookup time via _get_postings() in Searcher.

Usage (from the index_creation/ directory):
    python benchmark_lookup.py [--n 500] [--seed 42]
"""

import json
import random
import time
import argparse
import statistics

from searcher import Searcher


def sample_tokens(searcher: Searcher, n: int, seed: int) -> list[str]:
    """Collect up to n tokens across all positional index partitions."""
    all_tokens = []
    for partition in searcher.positional_indexes.values():
        all_tokens.extend(partition.keys())

    rng = random.Random(seed)
    if len(all_tokens) <= n:
        return all_tokens
    return rng.sample(all_tokens, n)


def benchmark(n: int = 500, seed: int = 42, pos_path: str = "./data/positional_indexes", split_path: str = "./data/alphabetized_indexes", stats_path: str = "./data/stats"):
    print("Loading Searcher (this may take a moment)...")
    searcher = Searcher(pos_indexes_path=pos_path, split_path=split_path, stats_path=stats_path)

    tokens = sample_tokens(searcher, n, seed)
    print(f"\nBenchmarking {len(tokens)} random token lookups...\n")

    latencies_ms = []
    misses = 0

    for token in tokens:
        t0 = time.perf_counter()
        result = searcher._get_postings(token)
        t1 = time.perf_counter()

        latencies_ms.append((t1 - t0) * 1000)
        if result is None:
            misses += 1

    # Stats
    avg   = statistics.mean(latencies_ms)
    med   = statistics.median(latencies_ms)
    mn    = min(latencies_ms)
    mx    = max(latencies_ms)
    p95   = sorted(latencies_ms)[int(len(latencies_ms) * 0.95)]
    stdev = statistics.stdev(latencies_ms) if len(latencies_ms) > 1 else 0.0

    print(f"{'Metric':<12} {'Value':>12}")
    print("-" * 26)
    print(f"{'Samples':<12} {len(latencies_ms):>11}")
    print(f"{'Misses':<12} {misses:>11}")
    print(f"{'Min':<12} {mn:>10.4f} ms")
    print(f"{'Median':<12} {med:>10.4f} ms")
    print(f"{'Average':<12} {avg:>10.4f} ms")
    print(f"{'Stdev':<12} {stdev:>10.4f} ms")
    print(f"{'p95':<12} {p95:>10.4f} ms")
    print(f"{'Max':<12} {mx:>10.4f} ms")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Benchmark _get_postings() lookup time")
    parser.add_argument("--n",          type=int, default=500,                          help="Number of tokens to sample (default: 500)")
    parser.add_argument("--seed",       type=int, default=42,                           help="Random seed for reproducibility (default: 42)")
    parser.add_argument("--pos_path",   type=str, default="./data/positional_indexes",  help="Path to positional indexes directory")
    parser.add_argument("--split_path", type=str, default="./data/alphabetized_indexes",help="Path to alphabetized indexes directory")
    parser.add_argument("--stats_path", type=str, default="./data/stats",               help="Path to stats directory")
    args = parser.parse_args()

    benchmark(n=args.n, seed=args.seed, pos_path=args.pos_path, split_path=args.split_path, stats_path=args.stats_path)
