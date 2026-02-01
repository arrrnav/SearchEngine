export interface SearchResult {
  query: string;
  results: string[];
  count: number;
  elapsed_ms: number;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export interface StatsData {
  total_documents: number;
  total_tokens: number;
  index_partitions: number;
}
