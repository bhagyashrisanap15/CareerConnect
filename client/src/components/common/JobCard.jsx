import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Heart, Calendar, ArrowRight, Building2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { formatRelativeTime } from '../../utils/formatDate';

export default function JobCard({ job, onJobClick }) {
  const { isJobSaved, toggleSaveJob, user } = useAuth();
  if (!job) return null;

  const jobId = job.id || job._id;
  const isSaved = isJobSaved(jobId);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleSaveJob(jobId);
  };

  const skillsList = Array.isArray(job.skills)
    ? job.skills
    : (typeof job.skills === 'string' ? job.skills.split(',').map(s => s.trim()) : []);

  const companyName = job.company?.name || job.companyName || job.company || 'Company';

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between">
      <div>
        {/* Top Header: Logo & Save Bookmark */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform overflow-hidden">
              {job.companyLogo || job.company?.logo ? (
                <img
                  src={job.companyLogo || job.company?.logo}
                  alt={companyName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="flex items-center justify-center w-full h-full font-bold text-lg text-indigo-400">
                {companyName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm text-slate-400 flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                {companyName}
              </p>
            </div>
          </div>

          <button
            onClick={handleHeartClick}
            aria-label="Save job"
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:text-rose-400 hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location, Job Type, Salary */}
        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-300 my-4 py-2 border-y border-slate-800/60">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>{job.location || 'Remote'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>{job.type || job.jobType || job.workMode || 'Full Time'}</span>
          </div>
          <div className="font-semibold text-emerald-400 ml-auto">
            {job.salary || (job.salaryMin ? `₹${job.salaryMin} - ₹${job.salaryMax} LPA` : 'Competitive')}
          </div>
        </div>

        {/* Skills Tag Pills */}
        {skillsList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skillsList.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-800/80 text-slate-300 rounded-md border border-slate-750"
              >
                {skill}
              </span>
            ))}
            {skillsList.length > 4 && (
              <span className="px-2 py-1 text-[11px] text-slate-400">
                +{skillsList.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: Posted Date & Details Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/50 text-xs text-slate-400 mt-2">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          Posted {formatRelativeTime(job.posted || job.createdAt || job.postedDate)}
        </span>
        
        {onJobClick ? (
          <button
            onClick={() => onJobClick(job)}
            className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 hover:translate-x-0.5 transition-all"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            to={`/jobs/${jobId}`}
            className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 hover:translate-x-0.5 transition-all"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
