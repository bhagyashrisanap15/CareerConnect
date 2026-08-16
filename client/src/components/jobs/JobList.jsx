import React from 'react';
import JobCard from './JobCard';
import { Briefcase } from 'lucide-react';

export default function JobList({ jobs = [], onJobClick }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-slate-800 rounded-3xl space-y-4 max-w-xl mx-auto my-6 text-slate-400">
        <div className="inline-flex p-4 bg-slate-800/40 text-slate-500 rounded-full">
          <Briefcase className="h-10 w-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">No jobs found</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            We couldn't find any job matches for your search. Try adjusting your query or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onClick={() => onJobClick && onJobClick(job)}
        />
      ))}
    </div>
  );
}
