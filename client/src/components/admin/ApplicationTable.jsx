import React from 'react';
import { Calendar, Building, Check, X, ShieldAlert, ArrowUpRight } from 'lucide-react';
import ApplicationStatus from '../applications/ApplicationStatus';

export default function ApplicationTable({ applications = [], onUpdateStatus }) {
  if (applications.length === 0) {
    return <div className="text-center py-10 text-slate-550 border border-dashed border-slate-800 rounded-3xl">No applications found.</div>;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-slate-350">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-850 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Candidate</th>
              <th className="py-4 px-6">Applied Job / Company</th>
              <th className="py-4 px-6">Applied Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-850/30 transition-colors">
                
                {/* Candidate */}
                <td className="py-4 px-6 font-semibold text-white">
                  {app.candidateName || 'Jane Doe'}
                  <div className="text-xs text-slate-450 mt-0.5 font-normal">{app.candidateEmail || 'jane@example.com'}</div>
                </td>

                {/* Job / Company */}
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-205">{app.jobTitle}</div>
                  <div className="text-xs text-slate-450 flex items-center gap-1.5 mt-0.5 font-normal">
                    <Building className="h-3.5 w-3.5 text-indigo-400" />
                    {app.company}
                  </div>
                </td>

                {/* Applied Date */}
                <td className="py-4 px-6 text-slate-450">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    {app.appliedDate}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <ApplicationStatus status={app.status} />
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2.5">
                    {onUpdateStatus && app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(app.id, 'shortlisted')}
                          className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-450 border border-emerald-500/20"
                          title="Approve / Shortlist"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onUpdateStatus(app.id, 'rejected')}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-455 border border-rose-500/20"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => alert(`Reviewing application log: ${app.id}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-500 hover:text-white transition-colors"
                      title="View Details Log"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
