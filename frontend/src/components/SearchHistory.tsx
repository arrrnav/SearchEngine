import type { SearchHistoryItem } from '../types/search';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelectQuery: (query: string) => void;
  onClear: () => void;
}

export const SearchHistory = ({ history, onSelectQuery, onClear }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-2xl animate-fade-in">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {history.slice(0, 7).map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectQuery(item.query)}
            className="px-3 py-1 rounded-full text-xs text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-600 dark:hover:text-amber-400 transition-all duration-150 bg-transparent"
          >
            {item.query}
          </button>
        ))}
        <button
          onClick={onClear}
          className="px-2 py-1 text-xs text-stone-300 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
        >
          clear
        </button>
      </div>
    </div>
  );
};
