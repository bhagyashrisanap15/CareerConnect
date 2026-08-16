import React from 'react';
import { Bookmark } from 'lucide-react';
import JobCard from '../../components/common/JobCard';
import { useAuth } from '../../hooks/useAuth';

export default function SavedJobs() {
  const { savedJobs } = useAuth();

  const savedJobsList = [
    {
      id: 'job-1',
      title: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '₹15 - ₹22 LPA',
      type: 'Full Time',
      posted: '1 day ago',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
      id: 'job-3',
      title: 'UI/UX Design Lead',
      company: 'Linear',
      location: 'New York, NY',
      salary: '₹12 - ₹18 LPA',
      type: 'Full Time',
      posted: '3 days ago',
      skills: ['Figma', 'Prototyping', 'CSS Grid', 'Tailwind']
    }
  ].filter((j) => savedJobs.includes(j.id));

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-indigo-400" /> My Saved Jobs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review roles you've bookmarked to apply later.
        </p>
      </div>

      {savedJobsList.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
          <p className="text-base font-bold text-white">No saved jobs yet</p>
          <p className="text-xs text-slate-400">Click the heart icon on any job card to bookmark it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobsList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
