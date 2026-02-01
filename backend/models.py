from pydantic import BaseModel

class SearchResponse(BaseModel):
    query: str
    results: list[str]
    count: int
    elapsed_ms: float

class StatsResponse(BaseModel):
    total_documents: int
    total_tokens: int
    index_partitions: int
