import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = 'Search jobs, companies, skills...', initialQuery = '', initialLocation = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query, location });
    }
  };

  const handleClear = () => {
    setQuery('');
    setLocation('');
    if (onSearch) {
      onSearch({ query: '', location: '' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-2 flex flex-col md:flex-row items-stretch gap-2 transition-all focus-within:border-indigo-500/50">
        
        {/* Keywords input */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-800/40 rounded-xl">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Location input */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-800/40 rounded-xl">
          <MapPin className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state, or Remote..."
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 min-h-[44px]">
          {(query || location) && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="flex-1 md:flex-initial px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all hover:scale-[1.02] shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20"
          >
            Find Jobs
          </button>
        </div>
      </form>
    </div>
  );
}
