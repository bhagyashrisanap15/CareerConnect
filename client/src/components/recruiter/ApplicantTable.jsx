import React from 'react';
import { Mail, Download, UserCheck, Trash2, Eye, UserX } from 'lucide-react';
import ApplicationStatus from '../applications/ApplicationStatus';

export default function ApplicantTable({ applicants = [], onStatusChange }) {
  if (applicants.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-3xl">
        No applicants found.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-slate-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-850 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Candidate</th>
              <th className="py-4 px-6">Applied Job</th>
              <th className="py-4 px-6">Score</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-slate-850/30 transition-colors">
                
                {/* Candidate */}
                <td className="py-4 px-6">
                  <div className="font-semibold text-white">{applicant.name}</div>
                  <div className="text-xs text-slate-450 mt-0.5">{applicant.email}</div>
                </td>

                {/* Applied Job */}
                <td className="py-4 px-6 text-slate-400 font-medium">
                  {applicant.jobTitle}
                </td>

                {/* Match Score */}
                <td className="py-4 px-6">
                  <span className="inline-block text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/15">
                    {applicant.matchingScore}%
                  </span>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <ApplicationStatus status={applicant.status} />
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => alert(`Reviewing details for ${applicant.name}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    {applicant.status === 'pending' && onStatusChange && (
                      <>
                        <button
                          onClick={() => onStatusChange(applicant.id, 'shortlisted')}
                          className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-450 border border-emerald-500/20"
                          title="Shortlist"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onStatusChange(applicant.id, 'rejected')}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-450 border border-rose-500/20"
                          title="Reject"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      </>
                    )}
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
