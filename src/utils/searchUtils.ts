import Fuse from 'fuse.js';

// Fuzzy search options
export const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.5 },
    { name: 'language', weight: 0.3 }
  ]
};

// Highlight matching text in search results
export const highlightMatch = (text: string, query: string): JSX.Element => {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.trim()})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <mark key={i} className="bg-accent-100 text-accent-900 rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </>
  );
};