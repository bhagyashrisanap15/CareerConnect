import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, UserCheck, CheckCircle2, PlusCircle, ArrowRight, Building2, Loader2, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { jobService } from '../../services/jobService';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    shortlisted: 0,
    hired: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, jobsRes] = await Promise.allSettled([
          jobService.getRecruiterStats(),
          jobService.getRecruiterJobs()
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value) {
          setStats({
            activeJobs: statsRes.value.activeJobs ?? 0,
            totalApplicants: statsRes.value.totalApplicants ?? 0,
            shortlisted: statsRes.value.shortlisted ?? 0,
            hired: statsRes.value.hired ?? 0
          });
        }

        if (jobsRes.status === 'fulfilled' && Array.isArray(jobsRes.value)) {
          setRecentJobs(jobsRes.value.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user?.name || 'Recruiter'} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your open positions, screen incoming candidate resumes, and update hiring statuses.
          </p>
        </div>

        <Link
          to="/recruiter/jobs/create"
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-600/20 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Job</span>
        </Link>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Jobs</span>
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            {isLoading ? '...' : stats.activeJobs}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Applicants</span>
            <div className="p-2 bg-violet-600/20 text-violet-400 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            {isLoading ? '...' : stats.totalApplicants}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Shortlisted</span>
            <div className="p-2 bg-purple-600/20 text-purple-400 rounded-xl">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-purple-400">
            {isLoading ? '...' : stats.shortlisted}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Hired</span>
            <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">
            {isLoading ? '...' : stats.hired}
          </p>
        </div>
      </div>

      {/* My Recent Jobs Section */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">My Recent Jobs</h2>
          <Link to="/recruiter/jobs" className="text-xs text-violet-400 font-semibold hover:underline">
            View All Openings ({stats.activeJobs})
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
          </div>
        ) : recentJobs.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <p className="text-xs text-slate-400">No jobs posted yet.</p>
            <Link
              to="/recruiter/jobs/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Your First Job</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentJobs.map((job) => {
              const isActive = (job.status || 'active').toLowerCase() === 'active';
              const formattedDate = job.createdAt
                ? new Date(job.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Recent';

              return (
                <div
                  key={job._id}
                  className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base truncate pr-2">{job.title}</h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {job.status || 'active'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      <span className="text-white font-bold">{job.applicantsCount || 0}</span> Applicants submitted
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formattedDate}
                    </span>
                    <Link
                      to={`/recruiter/jobs/${job._id}/applicants`}
                      className="px-3.5 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded-xl text-xs font-semibold flex items-center gap-1 border border-violet-500/30"
                    >
                      Manage <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
