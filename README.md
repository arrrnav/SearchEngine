# UCI ICS Web Search Engine

A full-stack search engine that indexes and searches 42,645+ UCI ICS web pages using TF-IDF ranking with HTML tag weighting, Boolean queries, and Porter stemming. Built with React, TypeScript, FastAPI, and Python.

![Tech Stack](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.11%2B-green)
![Search](https://img.shields.io/badge/Search-TF--IDF%20%7C%20O(1)%20Lookup-orange)

---

## Quick Start

See **[QUICKSTART.md](docs/QUICKSTART.md)** for detailed setup instructions.

```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** to search!

---

## Key Features

- **TF-IDF Ranking** with HTML tag importance (titles weighted 20x vs body text)
- **Boolean AND Queries** for multi-term searches
- **Porter Stemming** to match word variations
- **Positional Indexing** for O(1) token lookup (~30ms search time)
- **Dark Mode**, search history, and responsive UI

---

## Architecture

```
React + TypeScript Frontend (Vercel)
           ↓ REST API
FastAPI Backend (Render)
           ↓
Search Engine: Indexer → Merger → Searcher
           ↓
166MB Index (6 partitioned files, 143K tokens, 42K docs)
```

### 3-Stage Pipeline

1. **Indexer**: Parses HTML corpus, extracts tokens with tag weights, builds inverted index
2. **Merger**: K-way merges partial indexes, splits into 6 alphabet partitions (A-D, E-H, I-M, N-R, S-T, U-Z), generates positional indexes
3. **Searcher**: Loads positional indexes, uses `file.seek()` for O(1) lookup, computes TF-IDF scores

---

## Tech Stack

**Frontend**: React 19, TypeScript 5, Vite 7, Tailwind CSS 4, TanStack Query, Axios  
**Backend**: FastAPI, Uvicorn, NLTK (Porter stemmer), BeautifulSoup4, Pydantic  
**Infrastructure**: Docker, Vercel, Render  

---

## Project Structure

```
SearchEngine/
├── backend/                    # FastAPI server
│   ├── main.py                 # API endpoints (/search, /stats, /health)
│   └── search_service.py       # Searcher wrapper
├── frontend/                   # React app
│   └── src/
│       ├── components/         # SearchBar, Results, History, ThemeToggle
│       ├── hooks/              # useSearch, useSearchHistory
│       └── lib/api.ts          # Axios client
├── index_creation/             # Index pipeline
│   ├── indexer.py              # Stage 1: Build indexes
│   ├── merger.py               # Stage 2: Merge & partition
│   └── searcher.py             # Stage 3: CLI search
├── data/                       # Generated indexes
│   ├── alphabetized_indexes/   # 6 JSONL files
│   ├── positional_indexes/     # Byte-offset maps
│   └── stats/                  # URL mappings
└── docs/                       # Documentation
```

---

## How It Works

### TF-IDF Scoring
```
score = (1 + log(term_freq)) × log(total_docs/docs_with_term) × tag_weight
```

| HTML Tag | Weight |
|----------|--------|
| `<title>` | 20 |
| `<h1>` | 18 |
| `<h2>` | 16 |
| `<strong>` | 12 |
| Body text | 10 |

### Positional Indexing
Instead of scanning files linearly, each token maps to a byte offset:

```python
{"algorithm": 15234, "data": 18942}  # Byte positions in JSONL
```

Search uses `file.seek(offset)` for direct access → O(1) lookup → ~30ms response time.

### Query Processing
1. Tokenize → 2. Remove stop words → 3. Stem with Porter → 4. Boolean AND (if present) → 5. TF-IDF scoring → 6. Return top 5 results

---

## API Reference

Visit **http://localhost:8000/docs** for interactive Swagger UI.

**Endpoints**:
- `GET /search?q={query}&limit={num}` - Search with optional result limit
- `GET /stats` - Index statistics (42K docs, 143K tokens)
- `GET /health` - Service status

---

## Development

**Rebuild Indexes**:
```bash
python index_creation/indexer.py  # Build partials
python index_creation/merger.py   # Merge & partition
```

**Production Build**:
```bash
cd frontend && npm run build      # Vite build
cd backend && docker build .      # Docker image
```

**Deploy**: See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for Vercel + Render setup ($0/month).

---

## Performance

- **Search**: ~30ms (warm), ~300ms (cold start)
- **Index Load**: ~10 seconds at startup
- **Index Size**: 166MB across 6 files
- **Memory**: ~100MB (only loads positional indexes)
