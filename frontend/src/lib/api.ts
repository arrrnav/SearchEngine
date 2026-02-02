import axios from 'axios';
import type { SearchResult, StatsData } from '../types/search';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const searchAPI = {
  search: async (query: string, limit = 5): Promise<SearchResult> => {
    const { data } = await api.get<SearchResult>('/search', {
      params: { q: query, limit }
    });
    return data;
  },

  getStats: async (): Promise<StatsData> => {
    const { data } = await api.get<StatsData>('/stats');
    return data;
  }
};
