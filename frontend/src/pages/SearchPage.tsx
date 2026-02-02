import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { SearchHistory } from '../components/SearchHistory';
import { ThemeToggle } from '../components/ThemeToggle';
import { useSearch } from '../hooks/useSearch';
import { useSearchHistory } from '../hooks/useSearchHistory';

export function SearchPage() {
  const [currentQuery, setCurrentQuery] = useState('');
  const { data, isLoading, error } = useSearch(currentQuery, !!currentQuery);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    addToHistory(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            UCI ICS Search
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-6">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            <div className="text-xs text-gray-600 dark:text-gray-400 text-center max-w-xl">
              Tip: Use "AND" for exact matches (e.g., "machine AND learning")
            </div>

            <SearchHistory
              history={history}
              onSelectQuery={handleSearch}
              onClear={clearHistory}
            />
          </div>

          {error && (
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              Error: {error instanceof Error ? error.message : 'An error occurred'}
            </div>
          )}

          {isLoading && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2">Searching...</p>
            </div>
          )}

          {data && !isLoading && (
            <SearchResults
              results={data.results}
              query={data.query}
              elapsedMs={data.elapsed_ms}
            />
          )}
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          UCI ICS Search Engine - Built with React, FastAPI, and TF-IDF ranking
        </div>
      </footer>
    </div>
  );
}
