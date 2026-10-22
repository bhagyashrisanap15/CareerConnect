import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Bookmark, UserCheck, ArrowRight, Building2, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ApplicationStatus from '../../components/common/ApplicationStatus';
import { applicationService } from '../../services/applicationService';
import { jobService } from '../../services/jobService';

export default function StudentDashboard() {
  const { user, savedJobs } = useAuth();
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [totalJobsCount, setTotalJobsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [jobsRes, appsRes] = await Promise.allSettled([
          jobService.getAllJobs({ limit: 4 }),
          applicationService.getStudentApplications()
        ]);

        if (jobsRes.status === 'fulfilled' && jobsRes.value) {
          const jobList = jobsRes.value.jobs || jobsRes.value;
          setRecommendedJobs(Array.isArray(jobList) ? jobList.slice(0, 4) : []);
          setTotalJobsCount(jobsRes.value.total || jobList.length || 0);
        }

        if (appsRes.status === 'fulfilled' && Array.isArray(appsRes.value)) {
          setRecentApplications(appsRes.value.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to load student dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user?.name || 'Student'} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your application progression and discover recommended jobs tailored to your skills.
          </p>
        </div>
        <Link
          to="/jobs"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <span>Find Jobs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Available Jobs</span>
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            {isLoading ? '...' : totalJobsCount}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Applications</span>
            <div className="p-2 bg-violet-600/20 text-violet-400 rounded-xl">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            {isLoading ? '...' : recentApplications.length}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Saved Jobs</span>
            <div className="p-2 bg-rose-600/20 text-rose-400 rounded-xl">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            {savedJobs ? savedJobs.length : 0}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
            <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">Active</p>
        </div>
      </div>

      {/* Grid: Recommended Jobs & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Jobs */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white">Recommended Jobs</h2>
            <Link to="/jobs" className="text-xs text-indigo-400 font-semibold hover:underline">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 flex justify-center">
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            </div>
          ) : recommendedJobs.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No jobs available right now.</p>
          ) : (
            <div className="space-y-3">
              {recommendedJobs.map((job) => {
                const compName = job.company?.name || job.companyName || 'Hiring Company';
                const salaryStr =
                  job.salaryMin && job.salaryMax
                    ? `₹${job.salaryMin}-${job.salaryMax} LPA`
                    : job.salaryMin
                    ? `₹${job.salaryMin} LPA+`
                    : 'Competitive';

                return (
                  <div
                    key={job._id || job.id}
                    className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition-all flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white">{job.title}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-500" /> {compName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" /> {job.location || 'Remote'}
                        </span>
                      </p>
                      <p className="text-xs font-semibold text-emerald-400">{salaryStr}</p>
                    </div>

                    <Link
                      to={`/jobs/${job._id || job.id}`}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold shrink-0"
                    >
                      View Job
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Applications Table */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white">Recent Applications</h2>
            <Link to="/student/applications" className="text-xs text-indigo-400 font-semibold hover:underline">
              My Applications
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 flex justify-center">
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            </div>
          ) : recentApplications.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-xs text-slate-400">You haven't applied to any jobs yet.</p>
              <Link
                to="/jobs"
                className="inline-block text-xs text-indigo-400 font-semibold hover:underline"
              >
                Browse open positions
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Company</th>
                    <th className="p-3">Job Title</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentApplications.map((app) => {
                    const comp = app.job?.company?.name || app.job?.company || 'Company';
                    return (
                      <tr key={app._id} className="hover:bg-slate-850/40">
                        <td className="p-3 font-semibold text-white">{comp}</td>
                        <td className="p-3">{app.job?.title || 'Job Opening'}</td>
                        <td className="p-3">
                          <ApplicationStatus status={app.status} />
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
    </div>
  );
}
