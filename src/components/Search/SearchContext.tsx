import React, { createContext, useContext, useState, useCallback } from 'react';
import { searchAPI } from '../../api/searchAPI';
import { debounce } from '../../utils/debounce';

interface SearchResult {
  id: string;
  type: 'event' | 'ticket' | 'metric' | 'project';
  title: string;
  description?: string;
  language?: string;
  date?: string;
  priority?: string;
  status?: string;
}

interface SearchContextType {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  hasMore: boolean;
  currentPage: number;
  setQuery: (query: string) => void;
  loadMore: () => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cache, setCache] = useState<Record<string, SearchResult[]>>({});

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, page: number) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasMore(false);
        return;
      }

      const cacheKey = `${searchQuery}-${page}`;
      if (cache[cacheKey]) {
        setResults(cache[cacheKey]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, hasMore: more } = await searchAPI.search(searchQuery, page);
        setResults(prev => (page === 1 ? data : [...prev, ...data]));
        setHasMore(more);
        setCache(prev => ({ ...prev, [cacheKey]: data }));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [cache]
  );

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
    setCurrentPage(1);
    debouncedSearch(newQuery, 1);
  }, [debouncedSearch]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      debouncedSearch(query, nextPage);
    }
  }, [currentPage, hasMore, isLoading, query, debouncedSearch]);

  const clearSearch = useCallback(() => {
    setQueryState('');
    setResults([]);
    setCurrentPage(1);
    setHasMore(false);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        isLoading,
        hasMore,
        currentPage,
        setQuery,
        loadMore,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};