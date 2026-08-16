import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Building2, Calendar, MapPin, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';

export default function MyApplications() {
  const [applications, setApplications] = useState([
    {
      id: 'appl-101',
      jobTitle: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      appliedDate: '15 Aug 2026',
      status: 'Shortlisted'
    },
    {
      id: 'appl-102',
      jobTitle: 'Full Stack Engineer',
      company: 'Stripe',
      location: 'Remote',
      appliedDate: '10 Aug 2026',
      status: 'Under Review'
    },
    {
      id: 'appl-103',
      jobTitle: 'Frontend Web Intern',
      company: 'ABC Technologies',
      location: 'Pune',
      appliedDate: '01 Aug 2026',
      status: 'Applied'
    }
  ]);

  const timelineSteps = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'];

  const handleWithdraw = (id) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Withdrawn' } : a)));
    toast.success('Application withdrawn');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">My Submitted Applications</h1>
        <p className="text-xs text-slate-400 mt-1">
          Track the screening status and progression timeline of your job applications.
        </p>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{app.jobTitle}</h3>
                  <ApplicationStatus status={app.status} />
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" /> {app.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {app.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Applied: {app.appliedDate}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/student/applications/${app.id}`}
                  className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1 border border-indigo-500/30"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
                {app.status !== 'Withdrawn' && app.status !== 'Rejected' && (
                  <button
                    onClick={() => handleWithdraw(app.id)}
                    className="px-3 py-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl text-xs font-semibold border border-slate-700"
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </div>

            {/* Status Progression Timeline */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Application Progression Tracker
              </p>

              <div className="grid grid-cols-5 gap-2 text-center relative">
                {timelineSteps.map((step, idx) => {
                  const currentIdx = timelineSteps.indexOf(app.status);
                  const isPassed = currentIdx >= idx;
                  const isCurrent = app.status === step;

                  return (
                    <div key={step} className="flex flex-col items-center space-y-1.5 z-10">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/30'
                            : isPassed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isPassed ? '✓' : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] font-semibold ${
                          isCurrent ? 'text-indigo-400 font-bold' : isPassed ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
