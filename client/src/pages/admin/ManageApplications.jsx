import React, { useState } from 'react';
import { Eye, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';

export default function ManageApplications() {
  const [applications, setApplications] = useState([
    {
      id: 'app-1',
      student: 'Bhagyashri Sanap',
      job: 'Senior React Developer',
      company: 'Vercel',
      appliedDate: '15 Aug 2026',
      status: 'Shortlisted'
    },
    {
      id: 'app-2',
      student: 'Anil Kumar',
      job: 'Full Stack Engineer',
      company: 'Stripe',
      appliedDate: '12 Aug 2026',
      status: 'Under Review'
    },
    {
      id: 'app-3',
      student: 'Priya Sharma',
      job: 'UI/UX Design Lead',
      company: 'Linear',
      appliedDate: '10 Aug 2026',
      status: 'Interview'
    }
  ]);

  const handleUpdateStatus = (id) => {
    const statuses = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
    const current = applications.find((a) => a.id === id);
    const nextStatus = statuses[(statuses.indexOf(current.status) + 1) % statuses.length];

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
    toast.success(`Status updated to ${nextStatus}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Manage Applications</h1>
        <p className="text-xs text-slate-400 mt-1">
          Global application tracking logs across all system job openings.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Job</th>
                <th className="p-4">Company</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 font-bold text-white">{app.student}</td>
                  <td className="p-4 font-semibold text-slate-200">{app.job}</td>
                  <td className="p-4 text-indigo-400 font-semibold">{app.company}</td>
                  <td className="p-4 text-slate-400">{app.appliedDate}</td>
                  <td className="p-4">
                    <ApplicationStatus status={app.status} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toast.success(`Viewing application for ${app.student}`)}
                        className="px-2.5 py-1.5 bg-slate-800 text-slate-200 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" /> View
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id)}
                        className="px-2.5 py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Update
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
