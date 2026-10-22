import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Calendar, MapPin, Clock, FileText, Loader2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';
import { applicationService } from '../../services/applicationService';

export default function ApplicationDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setIsLoading(true);
        const data = await applicationService.getApplicantDetails(id);
        setApplication(data);
      } catch (err) {
        console.error('Failed to load application details:', err);
        toast.error(typeof err === 'string' ? err : 'Failed to load application details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-xs text-slate-400">Loading application details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-sm text-slate-400">Application not found or unauthorized.</p>
        <Link
          to="/student/applications"
          className="inline-block px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl"
        >
          Back to My Applications
        </Link>
      </div>
    );
  }

  const job = application.job || {};
  const company = job.company || {};
  const companyName = company.name || job.companyName || 'Hiring Company';
  const location = job.location || 'Remote';
  const appliedDate = application.createdAt
    ? new Date(application.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Recent';

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <Link
        to="/student/applications"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Applications
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{job.title || 'Job Opening'}</h1>
            <p className="text-sm text-slate-300 font-semibold flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-indigo-400" /> {companyName} • {location}
            </p>
          </div>

          <ApplicationStatus status={application.status} />
        </div>

        {/* Application Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Applied Date</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {appliedDate}
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Submitted Resume</p>
            {application.resumeUrl ? (
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-indigo-400 hover:underline mt-1 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" /> View Resume PDF <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <p className="text-xs text-slate-500 italic mt-1">No file attached</p>
            )}
          </div>

          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Current Status</p>
            <p className="text-xs font-semibold text-emerald-400 mt-1 capitalize">
              {application.status || 'applied'}
            </p>
          </div>
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
            <p className="text-[11px] text-slate-400 font-bold uppercase">Cover Letter / Note</p>
            <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed mt-1">
              {application.coverLetter}
            </p>
          </div>
        )}

        {/* Recruiter Notes if any */}
        {application.notes && (
          <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-500/30 space-y-1">
            <p className="text-[11px] text-indigo-400 font-bold uppercase">Recruiter Feedback / Notes</p>
            <p className="text-xs text-slate-200 mt-1">{application.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
