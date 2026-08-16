import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, FileText, CheckCircle2, XCircle, Clock, Eye, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';

export default function Applicants() {
  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([
    {
      id: 'app-1',
      name: 'Bhagyashri',
      email: 'bhagyashri@example.com',
      education: 'BE Computer',
      skills: ['React', 'Node.js', 'MongoDB'],
      status: 'Shortlisted',
      jobTitle: 'React Developer'
    },
    {
      id: 'app-2',
      name: 'Anil',
      email: 'anil@example.com',
      education: 'BE Computer',
      skills: ['Node', 'Express', 'SQL'],
      status: 'Under Review',
      jobTitle: 'React Developer'
    },
    {
      id: 'app-3',
      name: 'Priya',
      email: 'priya@example.com',
      education: 'BE IT',
      skills: ['MERN', 'Tailwind', 'Redux'],
      status: 'Interview',
      jobTitle: 'React Developer'
    }
  ]);

  const updateApplicantStatus = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    toast.success(`Candidate status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Job Applicants</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review candidate profiles, inspect resumes, and update recruitment pipeline statuses.
        </p>
      </div>

      {/* Applicants Table matching exact prompt specification */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Education</th>
                <th className="p-4">Skills</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {applicants.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm">{cand.name}</p>
                        <p className="text-[11px] text-slate-500 font-normal">{cand.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-slate-300 font-medium">{cand.education}</td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {cand.skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-800 text-indigo-300 rounded text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <ApplicationStatus status={cand.status} />
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      <Link
                        to={`/recruiter/applicants/${cand.id}`}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" /> View Profile
                      </Link>

                      <button
                        onClick={() => updateApplicantStatus(cand.id, 'Shortlisted')}
                        className="px-2.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-lg font-semibold"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => updateApplicantStatus(cand.id, 'Interview')}
                        className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg font-semibold"
                      >
                        Interview
                      </button>

                      <button
                        onClick={() => updateApplicantStatus(cand.id, 'Rejected')}
                        className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg font-semibold"
                      >
                        Reject
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
