import React from 'react';
import SearchBar from '../common/SearchBar';

export default function JobSearch({ onSearch, totalJobs = 0 }) {
  return (
    <div className="w-full py-10 md:py-14 bg-gradient-to-b from-slate-900/60 to-transparent rounded-3xl px-6 border border-slate-800/40 text-center mb-8 space-y-6">
      
      {/* Headings */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Find Your <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Next Career</span> Move
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-medium">
          Discover thousands of job opportunities from top-rated companies worldwide.
        </p>
      </div>

      {/* Search component */}
      <SearchBar onSearch={onSearch} />

      {/* Count Indicator & Quick Tags */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs pt-2">
        <span className="text-indigo-300 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
          {totalJobs} Active Openings
        </span>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Popular searches:</span>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {['React', 'Remote', 'Node.js', 'Product Manager'].map((tag) => (
              <button
                key={tag}
                onClick={() => onSearch && onSearch({ query: tag, location: '' })}
                className="px-2 py-0.5 rounded bg-slate-850 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
