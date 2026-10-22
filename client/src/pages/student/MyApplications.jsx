import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Building2, Calendar, MapPin, ChevronRight, Loader2, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';
import { applicationService } from '../../services/applicationService';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState(null);

  const timelineSteps = ['applied', 'under review', 'shortlisted', 'interview', 'selected'];

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const data = await applicationService.getStudentApplications();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load applications:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to load your applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleWithdraw = async (id) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }
    setWithdrawingId(id);
    try {
      await applicationService.withdrawApplication(id);
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 'withdrawn' } : a))
      );
      toast.success('Application withdrawn successfully');
    } catch (err) {
      console.error('Failed to withdraw application:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to withdraw application');
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>My Submitted Applications</span>
            {!isLoading && (
              <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2.5 py-0.5 rounded-full border border-slate-700">
                {applications.length}
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track the screening status and progression timeline of your job applications.
          </p>
        </div>

        <Link
          to="/jobs"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md self-start sm:self-auto"
        >
          Browse More Jobs
        </Link>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="p-16 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-xs text-slate-400">Loading your applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-700">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No applications submitted yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Explore available job openings across leading tech companies and apply with your resume.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20"
          >
            <Briefcase className="w-4 h-4" />
            <span>Explore Job Openings</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const job = app.job || {};
            const company = job.company || {};
            const companyName = company.name || job.companyName || 'Hiring Company';
            const location = job.location || 'Remote';
            const appliedDate = app.createdAt
              ? new Date(app.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : 'Recent';
            const isWithdrawing = withdrawingId === app._id;
            const normalizedStatus = (app.status || 'applied').toLowerCase();

            return (
              <div
                key={app._id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{job.title || 'Job Opening'}</h3>
                      <ApplicationStatus status={app.status} />
                    </div>
                    <p className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400" /> {companyName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> Applied: {appliedDate}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/student/applications/${app._id}`}
                      className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1 border border-indigo-500/30 transition-colors"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                    {normalizedStatus !== 'withdrawn' && normalizedStatus !== 'rejected' && (
                      <button
                        onClick={() => handleWithdraw(app._id)}
                        disabled={isWithdrawing}
                        className="px-3 py-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50"
                      >
                        {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Progression Timeline */}
                <div className="pt-4 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Application Progression Tracker
                  </p>

                  <div className="grid grid-cols-5 gap-2 text-center relative">
                    {timelineSteps.map((step, idx) => {
                      const currentIdx = timelineSteps.indexOf(normalizedStatus);
                      const isPassed = currentIdx >= idx && normalizedStatus !== 'withdrawn' && normalizedStatus !== 'rejected';
                      const isCurrent = normalizedStatus === step;

                      return (
                        <div key={step} className="flex flex-col items-center space-y-1.5 z-10">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isCurrent
                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/30'
                                : isPassed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isPassed ? '✓' : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] font-semibold capitalize ${
                              isCurrent ? 'text-indigo-400 font-bold' : isPassed ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
