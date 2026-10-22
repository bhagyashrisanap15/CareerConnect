import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';
import { applicationService } from '../../services/applicationService';

export default function ApplicantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await applicationService.getApplicantDetails(id);
        if (data) {
          setApplicant(data);
        }
      } catch (err) {
        console.error('Failed to load applicant details:', err);
        toast.error(typeof err === 'string' ? err : 'Failed to load applicant profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await applicationService.updateStatus(id, newStatus.toLowerCase());
      setApplicant((prev) => ({ ...prev, status: newStatus.toLowerCase() }));
      toast.success(`Application status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        <p className="text-xs text-slate-400">Loading applicant details...</p>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-sm text-slate-400">Applicant not found or you do not have permission to view.</p>
        <Link
          to="/recruiter/jobs"
          className="inline-block px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl"
        >
          Back to My Jobs
        </Link>
      </div>
    );
  }

  const student = applicant.student || {};
  const job = applicant.job || {};
  const studentName = student.name || 'Candidate Profile';
  const studentEmail = student.email || 'N/A';
  const studentPhone = student.phone || 'N/A';
  const appliedDate = applicant.createdAt
    ? new Date(applicant.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Recent';

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <Link
        to={applicant.job?._id ? `/recruiter/jobs/${applicant.job._id}/applicants` : '/recruiter/jobs'}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Applicants
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
        {/* Student Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-indigo-400/40 flex items-center justify-center font-extrabold text-white text-2xl shadow-lg">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">{studentName}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <span>
                  <Mail className="w-3 h-3 inline text-slate-500 mr-1" />
                  {studentEmail}
                </span>
                {studentPhone !== 'N/A' && (
                  <>
                    <span>•</span>
                    <span>
                      <Phone className="w-3 h-3 inline text-slate-500 mr-1" />
                      {studentPhone}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {applicant.resumeUrl ? (
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-4 h-4" /> View Resume <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-xs text-slate-500 italic">No resume attached</span>
            )}
          </div>
        </div>

        {/* Section 1: Candidate Profile Details */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
            Candidate Application Info
          </h2>

          {applicant.coverLetter && (
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Cover Letter / Note</p>
              <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                {applicant.coverLetter}
              </p>
            </div>
          )}

          {applicant.answers && applicant.answers.length > 0 && (
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Screening Responses</p>
              <div className="space-y-2 text-xs">
                {applicant.answers.map((ans, idx) => (
                  <div key={idx} className="border-b border-slate-850 pb-2 last:border-0 last:pb-0">
                    <p className="text-slate-400 font-semibold">{ans.question || `Question ${idx + 1}`}</p>
                    <p className="text-white mt-0.5">{ans.answer || ans}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Application Details & Update Status */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
            Application Pipeline
          </h2>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-bold">Applied Position:</p>
                <p className="text-white font-bold text-sm mt-0.5">{job.title || 'Job Opening'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Application Date:</p>
                <p className="text-white font-semibold text-sm mt-0.5">{appliedDate}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Current Pipeline Status:</p>
                <div className="mt-1">
                  <ApplicationStatus status={applicant.status} />
                </div>
              </div>
            </div>

            {/* Update Status Dropdown / Action Pills */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-300">
                Move Candidate Status {isUpdating && '(Updating...)'}:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Applied', val: 'applied' },
                  { label: 'Shortlist', val: 'shortlisted' },
                  { label: 'Interview', val: 'interview' },
                  { label: 'Select / Hire', val: 'selected' },
                  { label: 'Reject', val: 'rejected' }
                ].map((item) => (
                  <button
                    key={item.val}
                    disabled={isUpdating}
                    onClick={() => handleStatusChange(item.val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all disabled:opacity-50 ${
                      (applicant.status || '').toLowerCase() === item.val
                        ? 'bg-violet-600 text-white border-violet-500 shadow'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
