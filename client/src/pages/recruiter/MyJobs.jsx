import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, PlusCircle, Users, Edit, Eye, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyJobs() {
  const [jobs, setJobs] = useState([
    {
      id: 'job-1',
      title: 'React Developer',
      applicantsCount: 120,
      status: 'Active',
      createdDate: '10 Aug 2026'
    },
    {
      id: 'job-2',
      title: 'Node Developer',
      applicantsCount: 80,
      status: 'Active',
      createdDate: '12 Aug 2026'
    },
    {
      id: 'job-3',
      title: 'Java Intern',
      applicantsCount: 40,
      status: 'Closed',
      createdDate: '01 Jul 2026'
    }
  ]);

  const toggleJobStatus = (id) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' } : j
      )
    );
    toast.success('Job status updated');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">My Jobs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your open and closed job postings, track applicant counts, and edit job specifications.
          </p>
        </div>

        <Link
          to="/recruiter/jobs/create"
          className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Job</span>
        </Link>
      </div>

      {/* Table matching exact spec */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4 text-center">Applicants</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white text-sm">{job.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Created {job.createdDate}</p>
                  </td>

                  <td className="p-4 text-center">
                    <Link
                      to={`/recruiter/jobs/${job.id}/applicants`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-600/10 text-violet-400 border border-violet-500/30 rounded-full font-bold hover:bg-violet-600/20"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{job.applicantsCount}</span>
                    </Link>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-bold text-[11px] ${
                        job.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/recruiter/jobs/${job.id}/applicants`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>

                      <Link
                        to={`/recruiter/jobs/edit/${job.id}`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-violet-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>

                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        title="Toggle status"
                        className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg"
                      >
                        {job.status === 'Active' ? (
                          <ToggleRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-slate-500" />
                        )}
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
