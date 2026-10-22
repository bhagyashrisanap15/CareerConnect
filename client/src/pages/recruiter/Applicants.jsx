import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, FileText, CheckCircle2, XCircle, Clock, Eye, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';
import { applicationService } from '../../services/applicationService';

export default function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      let data = [];
      if (jobId) {
        data = await applicationService.getJobApplicants(jobId);
      } else {
        data = await applicationService.getRecruiterApplications();
      }
      setApplicants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load applicants:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to fetch applicants');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const updateApplicantStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await applicationService.updateStatus(id, newStatus.toLowerCase());
      setApplicants((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus.toLowerCase() } : a))
      );
      toast.success(`Candidate status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to update candidate status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        {jobId && (
          <Link
            to="/recruiter/jobs"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Jobs
          </Link>
        )}
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <span>Job Applicants</span>
          {!isLoading && (
            <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2.5 py-0.5 rounded-full border border-slate-700">
              {applicants.length}
            </span>
          )}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review candidate profiles, inspect resumes, and update recruitment pipeline statuses.
        </p>
      </div>

      {/* Applicants Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            <p className="text-xs text-slate-400">Loading applicants...</p>
          </div>
        ) : applicants.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <User className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No applicants yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {jobId
                ? 'No students have applied to this job posting yet.'
                : 'No applicants have submitted applications across your postings yet.'}
            </p>
            <Link
              to="/recruiter/jobs"
              className="inline-block mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
            >
              Back to My Jobs
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Applied Position</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {applicants.map((cand) => {
                  const studentName = cand.student?.name || cand.name || 'Anonymous Candidate';
                  const studentEmail = cand.student?.email || cand.email || 'No email provided';
                  const jobTitle = cand.job?.title || cand.jobTitle || 'Job Opening';
                  const isUpdating = updatingId === cand._id;

                  return (
                    <tr key={cand._id || cand.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow">
                            {studentName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm">{studentName}</p>
                            <p className="text-[11px] text-slate-500 font-normal">{studentEmail}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-300 font-medium">
                        <span className="font-semibold text-white">{jobTitle}</span>
                        {cand.createdAt && (
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Applied {new Date(cand.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </td>

                      <td className="p-4">
                        <ApplicationStatus status={cand.status} />
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <Link
                            to={`/recruiter/applicants/${cand._id || cand.id}`}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg font-semibold flex items-center gap-1 border border-slate-700"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-400" />
                            <span>View</span>
                          </Link>

                          <button
                            onClick={() => updateApplicantStatus(cand._id || cand.id, 'shortlisted')}
                            disabled={isUpdating}
                            className="px-2.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-lg font-semibold disabled:opacity-50"
                          >
                            Shortlist
                          </button>

                          <button
                            onClick={() => updateApplicantStatus(cand._id || cand.id, 'interview')}
                            disabled={isUpdating}
                            className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg font-semibold disabled:opacity-50"
                          >
                            Interview
                          </button>

                          <button
                            onClick={() => updateApplicantStatus(cand._id || cand.id, 'rejected')}
                            disabled={isUpdating}
                            className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg font-semibold disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
