import React, { useState } from 'react';
import { Eye, CheckCircle2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([
    {
      id: 'comp-1',
      name: 'Vercel',
      industry: 'Software Tools',
      recruiter: 'Alisa Recruiter',
      jobsCount: 12,
      status: 'Verified'
    },
    {
      id: 'comp-2',
      name: 'Stripe',
      industry: 'Fintech / Payments',
      recruiter: 'Stripe Talent',
      jobsCount: 24,
      status: 'Pending'
    }
  ]);

  const handleApprove = (id) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Verified' } : c))
    );
    toast.success('Company registration verified and approved!');
  };

  const handleDelete = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    toast.success('Company removed');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Manage Companies</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review company registration requests, verify credentials, and moderate registered hiring partners.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Recruiter</th>
                <th className="p-4">Jobs</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {companies.map((c) => (
                <tr key={c.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 font-bold text-white">{c.name}</td>
                  <td className="p-4 text-slate-300">{c.industry}</td>
                  <td className="p-4">{c.recruiter}</td>
                  <td className="p-4 font-semibold text-emerald-400">{c.jobsCount} open</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        c.status === 'Verified'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toast.success(`Viewing ${c.name}`)}
                        className="px-2.5 py-1.5 bg-slate-800 text-slate-200 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" /> View
                      </button>

                      {c.status === 'Pending' && (
                        <button
                          onClick={() => handleApprove(c.id)}
                          className="px-2.5 py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-2.5 py-1.5 bg-rose-600/20 text-rose-300 border border-rose-500/30 rounded-lg font-semibold flex items-center gap-1"
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
