import React from 'react';

export default function ApplicationStatus({ status = 'applied' }) {
  const normalized = status?.toLowerCase() || 'applied';

  const statusConfig = {
    applied: {
      style: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      label: 'Applied'
    },
    shortlisted: {
      style: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      label: 'Shortlisted'
    },
    interview: {
      style: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      label: 'Interview'
    },
    selected: {
      style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      label: 'Selected'
    },
    rejected: {
      style: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      label: 'Rejected'
    },
    withdrawn: {
      style: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
      label: 'Withdrawn'
    }
  };

  const current = statusConfig[normalized] || {
    style: 'bg-slate-800 text-slate-300 border-slate-700',
    label: status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Applied'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${current.style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
      {current.label}
    </span>
  );
}
