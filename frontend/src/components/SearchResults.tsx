import { useState } from 'react';

const PAGE_SIZE = 10;

interface SearchResultsProps {
  results: string[];
  query: string;
  elapsedMs: number;
}

const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const getFaviconUrl = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return '';
  }
};

const formatElapsed = (ms: number): string =>
  ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;

export const SearchResults = ({ results, query, elapsedMs }: SearchResultsProps) => {
  const [page, setPage] = useState(1);

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-400 dark:text-stone-500 text-lg">
          No results for{' '}
          <span className="font-serif italic text-stone-600 dark:text-stone-300">"{query}"</span>
        </p>
        <p className="text-stone-300 dark:text-stone-600 text-sm mt-2">
          Try different keywords or use{' '}
          <span className="font-mono text-amber-500">AND</span> for boolean search
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-1">
      <p className="text-xs text-stone-400 dark:text-stone-500 mb-6 font-medium tracking-widest uppercase">
        {results.length} results &mdash; {formatElapsed(elapsedMs)}
      </p>

      {pageResults.map((url, index) => {
        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 border border-transparent hover:border-stone-200 dark:hover:border-stone-800 transition-all duration-150"
          >
            <img
              src={getFaviconUrl(url)}
              alt=""
              width={16}
              height={16}
              className="w-4 h-4 rounded-sm shrink-0 opacity-75"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            <div className="flex-1 min-w-0">
              <div className="text-base font-medium text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-150 truncate">
                {getDomain(url)}
              </div>
              <div className="text-sm text-stone-400 dark:text-stone-500 truncate mt-0.5">
                {url}
              </div>
            </div>

            <svg
              className="w-3.5 h-3.5 text-stone-300 dark:text-stone-700 group-hover:text-amber-400 transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-8">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-150 ${
                p === page
                  ? 'bg-amber-500 text-stone-950 font-medium'
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
