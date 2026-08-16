import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Calendar, MapPin, CheckCircle2, Clock, FileText } from 'lucide-react';
import ApplicationStatus from '../../components/common/ApplicationStatus';

export default function ApplicationDetails() {
  const { id } = useParams();

  const application = {
    id: id || 'appl-101',
    jobTitle: 'Senior React Developer',
    company: 'Vercel',
    location: 'San Francisco, CA',
    appliedDate: '15 Aug 2026',
    status: 'Shortlisted',
    resumeName: 'Bhagyashri_Sanap_Resume.pdf',
    logs: [
      { date: '15 Aug 2026', title: 'Application Submitted', detail: 'Application received successfully by Vercel recruiting team.' },
      { date: '16 Aug 2026', title: 'Resume Screened', detail: 'Candidate resume passed preliminary skills screening.' },
      { date: '16 Aug 2026', title: 'Shortlisted for Technical Round', detail: 'You have been shortlisted! Recruiter will reach out via email for scheduling.' }
    ]
  };

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <Link to="/student/applications" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to My Applications
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{application.jobTitle}</h1>
            <p className="text-sm text-slate-300 font-semibold flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-indigo-400" /> {application.company} • {application.location}
            </p>
          </div>

          <ApplicationStatus status={application.status} />
        </div>

        {/* Application Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Applied Date</p>
            <p className="text-xs font-semibold text-white mt-1">{application.appliedDate}</p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Submitted Resume</p>
            <p className="text-xs font-semibold text-indigo-400 mt-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> {application.resumeName}
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Application ID</p>
            <p className="text-xs font-semibold text-white mt-1">{application.id}</p>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" /> Status Update Log
          </h2>

          <div className="space-y-4 border-l-2 border-slate-800 pl-4 ml-2">
            {application.logs.map((log, index) => (
              <div key={index} className="relative space-y-1">
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-900"></div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{log.title}</h4>
                  <span className="text-[10px] text-slate-500">{log.date}</span>
                </div>
                <p className="text-xs text-slate-400">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
