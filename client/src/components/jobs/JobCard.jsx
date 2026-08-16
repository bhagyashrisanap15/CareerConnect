import React from 'react';
import { MapPin, DollarSign, Clock, ArrowUpRight, Building } from 'lucide-react';

export default function JobCard({ job, onClick }) {
  const {
    title = 'Software Engineer',
    company = 'TechCorp',
    location = 'San Francisco, CA (Hybrid)',
    salary = '$120k - $150k',
    type = 'Full-time',
    posted = '2 days ago',
    logo = '',
    description = 'We are looking for a skilled React Developer to join our growing engineering team...'
  } = job || {};

  return (
    <div
      onClick={onClick}
      className="group bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-indigo-950/10 cursor-pointer flex flex-col justify-between hover:scale-[1.01]"
    >
      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-3 items-center">
            {logo ? (
              <img src={logo} alt={company} className="w-12 h-12 rounded-xl object-cover border border-slate-800 bg-slate-900" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
                {company.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-white tracking-wide group-hover:text-indigo-400 transition-colors">
                {title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Building className="h-3 w-3" />
                {company}
              </p>
            </div>
          </div>

          <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-indigo-600/10 text-slate-400 group-hover:text-indigo-400 transition-colors">
            <ArrowUpRight className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Snippet Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-semibold">
            <Clock className="h-3 w-3" />
            {type}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
            <DollarSign className="h-3 w-3" />
            {salary}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700/50 text-slate-300 text-[10px] font-semibold">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
        <span>Posted {posted}</span>
        <span className="text-indigo-400 font-semibold group-hover:underline">View details</span>
      </div>
    </div>
  );
}
