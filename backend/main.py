from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from search_service import SearchService
from models import SearchResponse, StatsResponse
import time

app = FastAPI(
    title="Zotics Engine API",
    description="Zotics Engine — search engine for UCI ICS web pages with TF-IDF ranking",
    version="1.0.0"
)

# CORS for Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with actual Vercel domain in production
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

search_service = None

@app.on_event("startup")
async def startup_event():
    global search_service
    print("Starting up - loading search indexes...")
    search_service = SearchService()
    print("Search service ready!")

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "indexes_loaded": search_service is not None
    }

@app.get("/search", response_model=SearchResponse)
async def search(
    q: str = Query(..., description="Search query", min_length=1),
    limit: int = Query(10, description="Maximum number of results", ge=1, le=50)
):
    if not q or len(q.strip()) == 0:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    if search_service is None:
        raise HTTPException(status_code=503, detail="Search service not initialized")

    start = time.time()
    results = search_service.search(q, limit)
    elapsed_ms = (time.time() - start) * 1000

    return SearchResponse(
        query=q,
        results=results,
        count=len(results),
        elapsed_ms=round(elapsed_ms, 2)
    )

@app.get("/stats", response_model=StatsResponse)
async def stats():
    if search_service is None:
        raise HTTPException(status_code=503, detail="Search service not initialized")

    stats_data = search_service.get_stats()
    return StatsResponse(**stats_data)

if __name__ == "__main__":
    import uvicorn
    from config import Config
    uvicorn.run(app, host=Config.HOST, port=Config.PORT)
