import { useState, FormEvent } from 'react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search UCI ICS pages..."
        className={cn(
          "flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600",
          "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className={cn(
          "px-6 py-3 rounded-lg font-medium",
          "bg-blue-600 hover:bg-blue-700 text-white",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors duration-200"
        )}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};
