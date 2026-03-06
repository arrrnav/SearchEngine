import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { SearchHistory } from '../components/SearchHistory';
import { ThemeToggle } from '../components/ThemeToggle';
import { useSearch } from '../hooks/useSearch';
import { useSearchHistory } from '../hooks/useSearchHistory';

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FooterLinks = () => (
  <div className="flex items-center gap-3">
    <a
      href="https://www.github.com/arrrnav"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
      aria-label="GitHub"
    >
      <GitHubIcon />
    </a>
    <a
      href="https://www.linkedin.com/in/arrrnav"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 transition-colors"
      aria-label="LinkedIn"
    >
      <LinkedInIcon />
    </a>
  </div>
);

export function SearchPage() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showThemeTip, setShowThemeTip] = useState(
    () => !localStorage.getItem('theme-tip-seen')
  );

  const dismissThemeTip = () => {
    localStorage.setItem('theme-tip-seen', '1');
    setShowThemeTip(false);
  };
  const { data, isLoading, error } = useSearch(currentQuery, !!currentQuery);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    addToHistory(query);
    if (!hasSearched) setHasSearched(true);
  };

  const handleLogoClick = () => {
    setHasSearched(false);
    setCurrentQuery('');
  };

  /* ── Landing view ── */
  if (!hasSearched) {
    return (
      <div className="relative min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 flex flex-col overflow-hidden">
        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 38%, rgba(251, 115, 36, 0.04) 0%, transparent 70%)',
          }}
        />

        {/* Top-right controls */}
        <div className="flex justify-end p-5 relative z-10">
          <div className="relative flex items-center gap-2">
            {showThemeTip && (
              <button
                onClick={dismissThemeTip}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-150 animate-fade-in"
              >
                toggle theme
                {/* Arrow pointing right toward the button */}
                <svg className="w-3 h-3 text-stone-400 dark:text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 gap-8 relative z-10">
          {/* Logo */}
          <div className="text-center animate-fade-up">
            <h1 className="font-serif text-7xl font-normal text-stone-900 dark:text-stone-100 tracking-tight leading-none">
              Zotics<span className="text-amber-500">.</span>
            </h1>
            <p className="text-stone-400 dark:text-stone-500 mt-3 text-xs tracking-widest uppercase font-medium">
              UCI ICS Search Engine
            </p>
          </div>

          {/* Search area */}
          <div
            className="w-full max-w-xl flex flex-col items-center gap-4 animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            <p className="text-xs text-stone-400 dark:text-stone-500">
              Boolean search: use{' '}
              <kbd className="px-1.5 py-0.5 rounded font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                AND
              </kbd>{' '}
              between terms
            </p>

            <SearchHistory
              history={history}
              onSelectQuery={handleSearch}
              onClear={clearHistory}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-5 flex items-center justify-center z-10">
          <div className="text-xs text-stone-300 dark:text-stone-700 flex items-center gap-3">
            <span>Built by Arnav</span>
            <FooterLinks />
          </div>
        </footer>
      </div>
    );
  }

  /* ── Results view ── */
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 flex flex-col">
      {/* Sticky compact header */}
      <header className="sticky top-0 z-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 relative flex items-center">
          <button
            onClick={handleLogoClick}
            className="font-serif text-2xl text-stone-900 dark:text-stone-100 shrink-0 hover:text-amber-500 transition-colors duration-150"
            aria-label="Back to home"
          >
            Zotics<span className="text-amber-500">.</span>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md px-2">
            <SearchBar
              key={currentQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
              compact
              initialValue={currentQuery}
            />
          </div>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full animate-fade-in">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl text-sm text-red-600 dark:text-red-400">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-3 py-16 text-stone-400 dark:text-stone-500">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm">Searching...</span>
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-8">
            <SearchResults key={data.query}
              results={data.results}
              query={data.query}
              elapsedMs={data.elapsed_ms}
            />

            {data.results.length > 0 && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
                <p className="text-xs text-amber-700/70 dark:text-amber-300/50 text-center">
                  Web crawl is from data several years ago — some sites may no longer be available.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-5 border-t border-stone-100 dark:border-stone-900 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-xs text-stone-300 dark:text-stone-700 flex items-center justify-between">
          <span>Zotics Engine &mdash; UCI ICS</span>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}
