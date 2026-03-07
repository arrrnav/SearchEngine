import { useState } from 'react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  compact?: boolean;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, isLoading, compact, initialValue = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={cn(
          'flex items-center gap-2 w-full',
          'bg-white dark:bg-stone-900',
          'border border-stone-200 dark:border-stone-700',
          'rounded-full',
          'focus-within:border-amber-400 dark:focus-within:border-amber-500',
          'focus-within:ring-3 focus-within:ring-amber-400/15 dark:focus-within:ring-amber-500/15',
          'transition-all duration-200 shadow-sm',
          compact ? 'px-3 py-1.5' : 'px-5 py-3.5'
        )}
      >
        {/* Search icon */}
        <svg
          className={cn(
            'shrink-0 text-stone-400 dark:text-stone-500',
            compact ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={compact ? 'Search...' : 'Search UCI ICS pages...'}
          className={cn(
            'flex-1 bg-transparent outline-none',
            'text-stone-900 dark:text-stone-100',
            'placeholder:text-stone-400 dark:placeholder:text-stone-500',
            'disabled:opacity-50',
            compact ? 'text-sm' : 'text-base'
          )}
          disabled={isLoading}
          autoFocus={!compact}
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={cn(
            'shrink-0 rounded-full font-medium',
            'bg-amber-500 hover:bg-amber-400 active:bg-amber-600',
            'text-stone-950',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'transition-all duration-150',
            compact ? 'px-3 py-1 text-xs' : 'px-5 py-1.5 text-sm'
          )}
        >
          {isLoading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : compact ? (
            'Go'
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};
