import React from 'react';
import ApplicationStatus from './ApplicationStatus';
import { Calendar, Building, MapPin, DollarSign, Download, ExternalLink } from 'lucide-react';

export default function ApplicationCard({ application, onCancel }) {
  const {
    id = '',
    jobTitle = 'Software Engineer',
    company = 'TechCorp',
    location = 'San Francisco, CA (Hybrid)',
    salary = '$120k - $150k',
    status = 'pending',
    appliedDate = '2 days ago',
    resumeName = 'jane_doe_resume.pdf'
  } = application || {};

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-slate-300 flex flex-col justify-between hover:border-slate-700/50 transition-all duration-200">
      
      <div className="space-y-4">
        {/* Header (Title, Status) */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">{jobTitle}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Building className="h-3 w-3" />
              {company}
            </p>
          </div>
          <ApplicationStatus status={status} />
        </div>

        {/* Info panel */}
        <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-450 border-t border-b border-slate-800/80 py-3.5">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-indigo-400" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
            {salary}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            Applied: {appliedDate}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <FileTextIcon className="h-3.5 w-3.5 text-indigo-400" />
            <span className="truncate">{resumeName}</span>
          </span>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center mt-5 pt-1">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-350 font-bold hover:underline"
        >
          <span>View job posting</span>
          <ExternalLink className="h-3 w-3" />
        </a>
        
        {status === 'pending' && onCancel && (
          <button
            onClick={() => onCancel(id)}
            className="text-[11px] text-rose-400 hover:text-rose-350 font-bold hover:underline"
          >
            Withdraw application
          </button>
        )}
      </div>
    </div>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
