import React, { useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { useSearch } from './SearchContext';
import { useClickOutside } from '../../hooks/useClickOutside';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocus, onBlur }) => {
  const { query, setQuery, isLoading, clearSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    onBlur?.();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl"
    >
      <div className="relative flex items-center w-full bg-light-100 rounded-xl overflow-hidden transition-all duration-300 group focus-within:ring-2 focus-within:ring-accent-500 focus-within:shadow-lg hover:shadow-md">
        <div className="flex items-center justify-center min-w-[44px] h-11">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-light-400 animate-spin" />
          ) : (
            <SearchIcon className="w-5 h-5 text-light-400 group-focus-within:text-accent-500" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => onFocus?.()}
          placeholder="Search events, projects, tickets... (⌘ + /)"
          className="w-full h-11 bg-transparent text-light-900 placeholder-light-500 focus:outline-none"
          aria-label="Search"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="flex items-center justify-center min-w-[44px] h-11 text-light-400 hover:text-light-600"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};