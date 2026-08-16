import React from 'react';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';

export default function ErrorMessage({ message, onRetry, title = 'Something went wrong' }) {
  return (
    <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5 text-rose-200 max-w-xl mx-auto my-6 shadow-lg shadow-rose-950/20 animate-in fade-in duration-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-6 w-6 text-rose-400 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            {title}
          </h3>
          <p className="text-xs text-rose-300/90 leading-relaxed">
            {message || "We encountered an unexpected error. Please check your network connection or try again."}
          </p>
          {onRetry && (
            <div className="pt-3">
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold tracking-wide border border-rose-500/30 hover:border-rose-500/40 transition-all hover:scale-[1.01]"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function InlineError({ message }) {
  if (!message) return null;
  return (
    <span className="flex items-center gap-1 mt-1 text-xs text-rose-400 font-medium animate-in slide-in-from-top-1 duration-150">
      <XCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </span>
  );
}
