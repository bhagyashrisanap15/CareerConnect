import React from 'react';
import ApplicationStatus from './ApplicationStatus';
import { Calendar, Building, Download, Eye } from 'lucide-react';

export default function ApplicationTable({ applications = [], onCancel }) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-3xl">
        No applications found.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-slate-300">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-850 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Role / Company</th>
              <th className="py-4 px-6">Applied Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Resume</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-850/30 transition-colors">
                {/* Role / Company */}
                <td className="py-4 px-6">
                  <div className="font-semibold text-white">{app.jobTitle}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Building className="h-3.5 w-3.5 text-indigo-400" />
                    {app.company}
                  </div>
                </td>

                {/* Applied Date */}
                <td className="py-4 px-6 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    {app.appliedDate}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <ApplicationStatus status={app.status} />
                </td>

                {/* Resume Name */}
                <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                  {app.resumeName || 'resume.pdf'}
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2.5">
                    <button
                      onClick={() => alert(`Viewing resume: ${app.resumeName}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="View Resume"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {app.status === 'pending' && onCancel && (
                      <button
                        onClick={() => onCancel(app.id)}
                        className="text-xs font-semibold px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-350 transition-colors"
                      >
                        Withdraw
                      </button>
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
