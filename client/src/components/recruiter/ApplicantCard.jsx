import React from 'react';
import { Mail, Phone, Download, Check, X, FileText, User } from 'lucide-react';

export default function ApplicantCard({ applicant, onStatusChange }) {
  const {
    id = '',
    name = 'Jane Doe',
    email = 'jane@example.com',
    phone = '+1 (555) 019-2834',
    jobTitle = 'Frontend Engineer',
    matchingScore = 94,
    skills = ['React', 'TypeScript', 'Tailwind CSS'],
    status = 'pending',
    resumeName = 'jane_resume.pdf'
  } = applicant || {};

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-slate-300 space-y-4 hover:border-slate-700/50 transition-all duration-200">
      
      {/* Header Info */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">{name}</h4>
            <p className="text-xs text-slate-450">{jobTitle}</p>
          </div>
        </div>

        {/* Matching Badge score */}
        <div className="text-right">
          <span className="inline-block text-[11px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-lg">
            {matchingScore}% Match
          </span>
        </div>
      </div>

      {/* Contact details */}
      <div className="space-y-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-indigo-400" />
          <a href={`mailto:${email}`} className="hover:underline">{email}</a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-indigo-400" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-indigo-400" />
          <span className="font-mono text-[10px] truncate max-w-[180px]">{resumeName}</span>
        </div>
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {skills.map((skill) => (
          <span key={skill} className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700/50 text-slate-300 text-[10px] font-semibold">
            {skill}
          </span>
        ))}
      </div>

      {/* Recruiter Actions */}
      <div className="flex gap-2 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => alert(`Downloading resume: ${resumeName}`)}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-750/50 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Resume
        </button>

        {status === 'pending' && onStatusChange && (
          <>
            <button
              onClick={() => onStatusChange(id, 'rejected')}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/15 transition-colors"
              title="Reject"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={() => onStatusChange(id, 'shortlisted')}
              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-450 border border-emerald-500/15 transition-all hover:scale-[1.01]"
              title="Shortlist"
            >
              <Check className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
