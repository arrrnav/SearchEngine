import type { SearchHistoryItem } from '../types/search';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelectQuery: (query: string) => void;
  onClear: () => void;
}

export const SearchHistory = ({ history, onSelectQuery, onClear }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="space-y-2 w-full max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Recent searches</p>
        <button
          onClick={onClear}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectQuery(item.query)}
            className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {item.query}
          </button>
        ))}
      </div>
    </div>
  );
};
