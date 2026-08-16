import React from 'react';
import { MapPin, Globe, Users, Briefcase, Building, ChevronLeft } from 'lucide-react';
import JobCard from '../jobs/JobCard';

export default function CompanyProfile({ company, activeJobs = [], onBack, onJobClick }) {
  if (!company) {
    return <div className="text-center py-12 text-slate-400">No company details loaded.</div>;
  }

  const {
    name = 'TechCorp',
    logo = '',
    website = 'https://techcorp.io',
    location = 'San Francisco, CA',
    industry = 'Software Engineering',
    size = '51-200 employees',
    description = 'TechCorp designs next-generation tools for creators, builders, and developers.'
  } = company;

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-350">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to browse</span>
      </button>

      {/* Header card showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-5 shadow-xl">
        {logo ? (
          <img src={logo} alt={name} className="w-20 h-20 rounded-2xl object-cover border border-slate-800 bg-slate-950" />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-3xl">
            {name.charAt(0)}
          </div>
        )}

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">{name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <Building className="h-4 w-4 text-indigo-400" />
              {industry}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-indigo-400" />
              {location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-indigo-400" />
              {size}
            </span>
            <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-400 hover:underline">
              <Globe className="h-4 w-4 text-indigo-400" />
              {website.replace(/^https?:\/\//i, '')}
            </a>
          </div>
        </div>
      </div>

      {/* Grid splits details and job listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              About Company
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Jobs list sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-indigo-400" />
            <span>Active Job Openings ({activeJobs.length})</span>
          </h2>

          {activeJobs.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-850 rounded-2xl text-slate-550 text-sm">
              No active job openings currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onJobClick && onJobClick(job)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
