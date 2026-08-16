import React from 'react';
import { Calendar, Building, Trash2, Eye } from 'lucide-react';

export default function JobTable({ jobs = [], onDeleteJob }) {
  if (jobs.length === 0) {
    return <div className="text-center py-10 text-slate-500 border border-dashed border-slate-800 rounded-3xl">No jobs found.</div>;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-slate-350">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-850 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Job Title / Company</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6">Salary Budget</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-850/30 transition-colors">
                
                {/* Title */}
                <td className="py-4 px-6">
                  <div className="font-semibold text-white">{job.title}</div>
                  <div className="text-xs text-slate-450 flex items-center gap-1.5 mt-0.5">
                    <Building className="h-3.5 w-3.5 text-indigo-400" />
                    {job.company}
                  </div>
                </td>

                {/* Location */}
                <td className="py-4 px-6 text-slate-400">
                  {job.location}
                </td>

                {/* Salary */}
                <td className="py-4 px-6 text-slate-400 font-medium">
                  {job.salary}
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2.5">
                    <button
                      onClick={() => alert(`Previewing job: ${job.title}`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-450 hover:text-white transition-colors"
                      title="Preview Job"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteJob && onDeleteJob(job.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-550/15 text-slate-500 hover:text-rose-455 hover:border-rose-500/20 border border-transparent transition-colors"
                      title="Delete Posting"
                    >
                      <Trash2 className="h-4 w-4" />
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
