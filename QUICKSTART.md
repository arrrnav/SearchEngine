# Quick Start Guide

Get the UCI ICS Search Engine running locally in 3 minutes!

## Prerequisites

- Python 3.11+ installed
- Node.js 20+ installed
- Git repository cloned

## Step 1: Start Backend (Terminal 1)

```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```

**Wait for:** `"Search service ready!"` message

Backend will be available at **http://localhost:8000**

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at **http://localhost:5173**

## Step 3: Test It Out

1. Open **http://localhost:5173** in your browser
2. Try these searches:
   - `machine learning`
   - `data structures`
   - `information AND retrieval` (Boolean AND)
3. Toggle dark mode (moon/sun icon in header)
4. Check search history persists

## Verify Backend API

Visit **http://localhost:8000/docs** for interactive API documentation.

Test endpoints directly:
```bash
# Health check
curl http://localhost:8000/health

# Search
curl "http://localhost:8000/search?q=machine+learning"

# Stats
curl http://localhost:8000/stats
```

## Troubleshooting

### Backend won't start

**Error: `ModuleNotFoundError: No module named 'fastapi'`**
```bash
# Make sure you're in the backend directory
cd backend
python -m pip install -r requirements.txt
```

**Error: `FileNotFoundError: positional_indexes/index_1.json`**
```bash
# Backend expects indexes in parent directory
# Make sure you run from backend/ not from root
```

### Frontend won't start

**Error: `Cannot find module`**
```bash
cd frontend
npm install
```

**Error: Node version warning**
- Warnings about Node 22.8.0 are safe to ignore
- Frontend still works

### Frontend can't connect to backend

**Error: Network Error or CORS**
1. Verify backend is running on http://localhost:8000
2. Check `frontend/.env.local` has `VITE_API_URL=http://localhost:8000`
3. Restart frontend dev server

## Next Steps

- **Read the full docs**: See `README_FULLSTACK.md`
- **Deploy to production**: See `DEPLOYMENT.md`
- **Review implementation**: See `IMPLEMENTATION_SUMMARY.md`

## File Structure Overview

```
SearchEngine/
├── backend/           # FastAPI backend
│   ├── main.py       # Run this to start backend
│   └── ...
├── frontend/         # React frontend
│   ├── src/         # Source code
│   └── package.json
├── positional_indexes/  # Search index files
├── alphabetized_indexes/
└── stats/
```

## Common Commands

```bash
# Backend
cd backend
python main.py                    # Start server
curl http://localhost:8000/health # Test health

# Frontend
cd frontend
npm run dev                       # Start dev server
npm run build                     # Build for production
npm run preview                   # Preview production build

# Both (in separate terminals)
cd backend && python main.py      # Terminal 1
cd frontend && npm run dev        # Terminal 2
```

## Features to Try

1. **Basic Search**: Type "machine learning" and press Enter
2. **Boolean AND**: Search "information AND retrieval"
3. **Search History**: Your last 10 searches appear below search bar
4. **Dark Mode**: Click moon/sun icon in header
5. **Result Ranking**: Results sorted by TF-IDF relevance score

## Performance Notes

- **First search**: ~30-50ms (indexes already loaded)
- **Subsequent searches**: ~20-30ms (cached data structures)
- **Index load time**: ~10 seconds (happens on backend startup)

## Support

Having issues? Check:
1. Are both servers running? (Check terminal outputs)
2. Is port 8000 already in use? (Change in `backend/config.py`)
3. Is port 5173 already in use? (Vite will auto-increment to 5174)

---

**That's it!** You now have a fully functional search engine running locally. 🚀
