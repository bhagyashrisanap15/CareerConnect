import React from 'react';

export default function ApplicationStatus({ status = 'pending' }) {
  const styles = {
    pending: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    shortlisted: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
    interview: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
    accepted: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    rejected: 'bg-rose-500/10 border-rose-500/20 text-rose-300'
  };

  const label = {
    pending: 'Pending Review',
    shortlisted: 'Shortlisted',
    interview: 'Interview Scheduled',
    accepted: 'Offer Accepted',
    rejected: 'Declined'
  };

  const currentStyle = styles[status.toLowerCase()] || styles.pending;
  const currentLabel = label[status.toLowerCase()] || status;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${currentStyle}`}>
      {currentLabel}
    </span>
  );
}
