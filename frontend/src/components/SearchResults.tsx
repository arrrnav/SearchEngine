interface SearchResultsProps {
  results: string[];
  query: string;
  elapsedMs: number;
}

export const SearchResults = ({ results, query, elapsedMs }: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Found {results.length} results in {elapsedMs}ms
      </p>

      {results.map((url, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 group"
          >
            <div className="flex-1">
              <div className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline break-all">
                {url}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Rank #{index + 1}
              </div>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};
