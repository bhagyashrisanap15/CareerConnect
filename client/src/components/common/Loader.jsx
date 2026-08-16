import React from 'react';

export default function Loader({ fullScreen = false, size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-8 w-full';

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop spinner */}
        <div className={`animate-ping absolute inline-flex rounded-full bg-indigo-500/20 opacity-75 ${
          size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-12 w-12' : 'h-20 w-20'
        }`}></div>
        <div
          className={`animate-spin rounded-full border-t-indigo-500 border-r-transparent border-b-indigo-400 border-l-transparent ${sizeClasses[size]}`}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      {text && (
        <p className="mt-4 text-sm font-medium text-slate-400 animate-pulse tracking-wide uppercase">
          {text}
        </p>
      )}
    </div>
  );
}

// Reusable Skeleton Loader component
export function Skeleton({ type = 'card', count = 1 }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="w-full space-y-4">
        {items.map((_, i) => (
          <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-3 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg bg-slate-700"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-700 rounded"></div>
                  <div className="h-3 w-20 bg-slate-700 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
            </div>
            <div className="h-3 w-full bg-slate-700 rounded"></div>
            <div className="h-3 w-4/5 bg-slate-700 rounded"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
              <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="w-full space-y-2 animate-pulse">
        <div className="h-8 bg-slate-800 rounded-t border-b border-slate-700"></div>
        {items.map((_, i) => (
          <div key={i} className="h-12 bg-slate-800/40 border-b border-slate-700/50 flex items-center justify-between px-4">
            <div className="h-4 w-1/4 bg-slate-700 rounded"></div>
            <div className="h-4 w-1/6 bg-slate-700 rounded"></div>
            <div className="h-4 w-1/6 bg-slate-700 rounded"></div>
            <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-2/3"></div>
      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    </div>
  );
}
