# UCI ICS Search Engine

A full-stack web search engine for UCI ICS web pages, built with React, FastAPI, and TF-IDF ranking.

## Features

- **Fast Search**: Sub-second search response times using inverted index with positional lookups
- **TF-IDF Ranking**: Relevance-based scoring with HTML tag importance weighting
- **Boolean AND Queries**: Exact match searches with AND operator
- **Search History**: Persistent search history in browser localStorage
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern Stack**: React 18, TypeScript, FastAPI, and Python 3.11+

## Architecture

### Backend (FastAPI)
- RESTful API with `/search` and `/stats` endpoints
- Loads 166MB inverted index on startup (~10 seconds)
- Uses Porter stemming and stop word filtering
- Returns top 5 results by default with TF-IDF scoring

### Frontend (React + TypeScript)
- Vite build system for fast development
- Tailwind CSS for styling
- React Query for API state management
- LocalStorage for search history persistence

### Search Engine Core
- **Indexer**: Processes 42,645 HTML documents into inverted index
- **Merger**: Combines partial indexes into 6 alphabet-partitioned files
- **Searcher**: O(1) token lookup using positional indexes with byte offsets

## Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   python -m pip install -r requirements.txt

   # Frontend
   cd ../frontend
   npm install
   ```

2. **Start Backend**
   ```bash
   cd backend
   python main.py
   ```
   Backend runs on http://localhost:8000

3. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

4. **Test the App**
   - Open http://localhost:5173 in your browser
   - Try searching for "machine learning" or "data structures"
   - Test Boolean AND: "information AND retrieval"

### API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

## Project Structure

```
SearchEngine/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── search_service.py    # Search engine wrapper
│   ├── models.py            # Pydantic models
│   ├── config.py            # Configuration
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Container config
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities and API client
│   │   ├── types/           # TypeScript interfaces
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   └── vite.config.ts
├── positional_indexes/      # Byte offset indexes (6 files)
├── alphabetized_indexes/    # Partitioned inverted indexes (6 JSONL files)
├── stats/                   # Document ID mappings
├── searcher.py              # Core search implementation
├── indexer.py               # Index builder
├── merger.py                # Index merger
└── DEPLOYMENT.md            # Production deployment guide
```

## API Endpoints

### GET /search
Search for documents matching a query.

**Parameters:**
- `q` (string, required): Search query
- `limit` (int, optional): Maximum results (default: 5, max: 20)

**Example:**
```bash
curl "http://localhost:8000/search?q=machine+learning&limit=3"
```

**Response:**
```json
{
  "query": "machine learning",
  "results": [
    "https://cml.ics.uci.edu/category/aiml/",
    "https://www.ics.uci.edu/~pazzani/Publications/"
  ],
  "count": 2,
  "elapsed_ms": 28.5
}
```

### GET /stats
Get search engine statistics.

**Example:**
```bash
curl "http://localhost:8000/stats"
```

**Response:**
```json
{
  "total_documents": 42645,
  "total_tokens": 143475,
  "index_partitions": 6
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "indexes_loaded": true
}
```

## Search Features

### Basic Search
```
machine learning
```
Returns documents containing "machine" OR "learning" ranked by TF-IDF.

### Boolean AND
```
machine AND learning
```
Returns only documents containing BOTH "machine" AND "learning".

### HTML Tag Importance
Search scoring considers HTML tag importance:
- `<title>`: 20x weight
- `<h1>`: 18x weight
- `<h2>`: 16x weight
- `<h3>`: 14x weight
- `<strong>`, `<b>`: 12x weight
- Default: 10x weight

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed production deployment instructions.

**Quick Summary:**
- Backend → Render (free tier)
- Frontend → Vercel (free tier)
- Total Cost: $0/month

## Data Pipeline

### 1. Indexer (`indexer.py`)
Processes HTML documents from `developer/DEV/` or `analyst/ANALYST/`:
- Parses HTML with BeautifulSoup
- Tokenizes and stems with Porter stemmer
- Builds inverted index with term frequencies
- Writes partial indexes every 5000 documents

### 2. Merger (`merger.py`)
Combines partial indexes:
- K-way merge using streaming (ijson)
- Splits into 6 alphabet-partitioned files
- Generates positional indexes for O(1) lookup

### 3. Searcher (`searcher.py`)
Performs queries:
- Stems query tokens
- Seeks to token positions using positional index
- Computes TF-IDF scores
- Returns top-K ranked results

## Technologies

**Backend:**
- FastAPI 0.115.0
- Uvicorn (ASGI server)
- NLTK (Porter stemming)
- BeautifulSoup4 (HTML parsing)
- Python 3.11+

**Frontend:**
- React 18
- TypeScript 5
- Vite 7
- Tailwind CSS 3
- React Query (TanStack Query)
- Axios

## Performance

- **Index Size**: 166MB (compressed)
- **Total Documents**: 42,645
- **Unique Tokens**: 143,475
- **Search Latency**: <300ms (after backend warm-up)
- **Index Load Time**: ~10 seconds (startup)

## Contributing

This is a course project for CS 121 at UCI. Not accepting contributions.

## License

Academic project - UCI ICS CS 121 Spring 2025

## Acknowledgments

- Course: CS 121 - Information Retrieval
- Institution: University of California, Irvine
- Department: Donald Bren School of Information and Computer Sciences
