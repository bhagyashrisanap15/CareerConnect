import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import JobCard from '../../components/common/JobCard';
import { useAuth } from '../../hooks/useAuth';
import studentService from '../../services/studentService';

export default function SavedJobs() {
  const { savedJobs } = useAuth();
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const response = await studentService.getSavedJobs();
        if (isMounted) {
          const jobs = (Array.isArray(response) ? response : [])
            .map((item) => item.job)
            .filter(Boolean);
          setJobsList(jobs);
        }
      } catch (err) {
        console.error('Failed to fetch saved jobs list:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSavedJobs();
    return () => {
      isMounted = false;
    };
  }, [savedJobs]);

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

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
          <span>Loading saved jobs...</span>
        </div>
      ) : jobsList.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
          <p className="text-base font-bold text-white">No saved jobs yet</p>
          <p className="text-xs text-slate-400">Click the heart icon on any job card to bookmark it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobsList.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
