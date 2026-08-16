import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([
    {
      id: 'job-1',
      title: 'Senior React Developer',
      company: 'Vercel',
      recruiter: 'Alisa Recruiter',
      category: 'Software Development',
      status: 'Active',
      createdDate: '14 Aug 2026'
    },
    {
      id: 'job-2',
      title: 'Full Stack Engineer',
      company: 'Stripe',
      recruiter: 'Stripe Hiring',
      category: 'Software Development',
      status: 'Active',
      createdDate: '12 Aug 2026'
    }
  ]);

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast.success('Job removed by administrator');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Manage Jobs</h1>
        <p className="text-xs text-slate-400 mt-1">
          System-wide job postings moderation and management console.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Job</th>
                <th className="p-4">Company</th>
                <th className="p-4">Recruiter</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 font-bold text-white">{j.title}</td>
                  <td className="p-4 text-indigo-400 font-semibold">{j.company}</td>
                  <td className="p-4 text-slate-300">{j.recruiter}</td>
                  <td className="p-4">{j.category}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold text-[11px]">
                      {j.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{j.createdDate}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toast.success(`Viewing ${j.title}`)}
                        className="px-2.5 py-1.5 bg-slate-800 text-slate-200 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" /> View
                      </button>
                      <button
                        onClick={() => toast.success(`Editing ${j.title}`)}
                        className="px-2.5 py-1.5 bg-indigo-600/20 text-indigo-300 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(j.id)}
                        className="px-2.5 py-1.5 bg-rose-600/20 text-rose-300 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
