import { useState } from 'react';
import type { SearchHistoryItem } from '../types/search';

const HISTORY_KEY = 'search_history';
const MAX_HISTORY = 10;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const addToHistory = (query: string) => {
    const newItem: SearchHistoryItem = {
      query,
      timestamp: Date.now()
    };

    const updated = [
      newItem,
      ...history.filter(item => item.query !== query)
    ].slice(0, MAX_HISTORY);

    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, addToHistory, clearHistory };
};
