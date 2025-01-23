import React from 'react';
import { Calendar, Ticket, BarChart2, FolderGit2 } from 'lucide-react';
import { useSearch } from './SearchContext';
import { highlightMatch } from '../../utils/searchUtils';

const SearchResults: React.FC = () => {
  const { results, isLoading, query, hasMore, loadMore } = useSearch();

  if (isLoading && !results.length) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-light-200 p-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-light-500">Searching...</div>
        </div>
      </div>
    );
  }

  if (!isLoading && query && !results.length) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-light-200 p-4">
        <div className="text-center py-8">
          <p className="text-light-600 mb-2">No results found for "{query}"</p>
          <p className="text-sm text-light-500">
            Try adjusting your search or browse through categories
          </p>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5" />;
      case 'ticket':
        return <Ticket className="w-5 h-5" />;
      case 'metric':
        return <BarChart2 className="w-5 h-5" />;
      case 'project':
        return <FolderGit2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-light-200 max-h-[60vh] overflow-y-auto">
      <div className="p-2">
        {results.map((result) => (
          <div
            key={result.id}
            className="p-3 hover:bg-light-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                result.type === 'event' ? 'bg-blue-100 text-blue-600' :
                result.type === 'ticket' ? 'bg-purple-100 text-purple-600' :
                result.type === 'metric' ? 'bg-green-100 text-green-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {getIcon(result.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-light-900">
                  {highlightMatch(result.title, query)}
                </h4>
                {result.description && (
                  <p className="text-sm text-light-600 mt-1">
                    {highlightMatch(result.description, query)}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  {result.language && (
                    <span className="text-xs px-2 py-1 bg-light-100 rounded-full">
                      {result.language}
                    </span>
                  )}
                  {result.status && (
                    <span className="text-xs px-2 py-1 bg-light-100 rounded-full">
                      {result.status}
                    </span>
                  )}
                  {result.date && (
                    <span className="text-xs text-light-500">
                      {new Date(result.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="p-2 border-t border-light-200">
          <button
            onClick={loadMore}
            className="w-full py-2 text-sm text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
          >
            Load more results
          </button>
        </div>
      )}
    </div>
  );
};