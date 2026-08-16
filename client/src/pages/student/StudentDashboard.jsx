import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Bookmark, UserCheck, ArrowRight, Building2, MapPin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ApplicationStatus from '../../components/common/ApplicationStatus';

export default function StudentDashboard() {
  const { user } = useAuth();

  // Mock Recommended Jobs matching prompt specification
  const recommendedJobs = [
    {
      id: 'job-101',
      title: 'Software Developer',
      company: 'ABC Company',
      location: 'Pune',
      salary: '₹5-8 LPA',
      type: 'Full Time'
    },
    {
      id: 'job-102',
      title: 'Frontend Developer',
      company: 'XYZ Company',
      location: 'Remote',
      salary: '₹4-7 LPA',
      type: 'Remote'
    }
  ];

  // Mock Recent Applications matching prompt specification
  const recentApplications = [
    {
      id: 'appl-1',
      company: 'ABC Company',
      jobTitle: 'React Developer',
      appliedDate: '14 Aug 2026',
      status: 'Applied'
    },
    {
      id: 'appl-2',
      company: 'XYZ Company',
      jobTitle: 'Backend Dev',
      appliedDate: '10 Aug 2026',
      status: 'Shortlisted'
    }
  ];

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
          <p className="text-3xl font-extrabold text-white">1,250+</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Applications</span>
            <div className="p-2 bg-violet-600/20 text-violet-400 rounded-xl">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{recentApplications.length}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Saved Jobs</span>
            <div className="p-2 bg-rose-600/20 text-rose-400 rounded-xl">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">3</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Profile %</span>
            <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">85%</p>
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

          <div className="space-y-3">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-slate-500" /> {job.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-500" /> {job.location}</span>
                  </p>
                  <p className="text-xs font-semibold text-emerald-400">{job.salary}</p>
                </div>

                <Link
                  to={`/jobs/${job.id}`}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold shrink-0"
                >
                  View Job
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white">Recent Applications</h2>
            <Link to="/student/applications" className="text-xs text-indigo-400 font-semibold hover:underline">
              My Applications
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Company</th>
                  <th className="p-3">Job</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-850/40">
                    <td className="p-3 font-semibold text-white">{app.company}</td>
                    <td className="p-3">{app.jobTitle}</td>
                    <td className="p-3">
                      <ApplicationStatus status={app.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
