import React, { useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { useSearch } from './Search/SearchContext';
import { useClickOutside } from '../hooks/useClickOutside';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onClose?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClose, autoFocus }) => {
  const { query, setQuery, isLoading, clearSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
      if (e.key === '/' && e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 animate-slide-down">
      <div className="relative flex items-center">
        <div className="flex items-center justify-center min-w-[44px] h-11">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-light-400 animate-spin" />
          ) : (
            <SearchIcon className="w-5 h-5 text-light-400" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, projects, tickets... (⌘ + /)"
          className="w-full h-11 bg-transparent text-light-900 placeholder-light-500 focus:outline-none"
          aria-label="Search"
        />

        <div className="flex items-center gap-2">
          {query && (
            <button
              onClick={clearSearch}
              className="p-2 text-light-400 hover:text-light-600"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-light-400 hover:text-light-600"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;