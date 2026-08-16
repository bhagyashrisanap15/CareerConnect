import React from 'react';

export default function ApplicationStatus({ status }) {
  const getBadgeStyle = (stat) => {
    switch (stat?.toLowerCase()) {
      case 'applied':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'under review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'shortlisted':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'interview':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'selected':
      case 'hired':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'withdrawn':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
      {status || 'Applied'}
    </span>
  );
}
