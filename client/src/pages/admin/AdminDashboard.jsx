import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Briefcase, FileCheck, Shield, UserCheck } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '450', change: '+12%', icon: Users },
    { title: 'Students', value: '380', change: '+15%', icon: UserCheck },
    { title: 'Recruiters', value: '65', change: '+4%', icon: Building2 },
    { title: 'Companies', value: '42', change: '+6%', icon: Building2 },
    { title: 'Jobs', value: '128', change: '+8%', icon: Briefcase },
    { title: 'Applications', value: '890', change: '+20%', icon: FileCheck }
  ];

  const recentUsers = [
    { name: 'Anil', email: 'anil@example.com', role: 'Student', status: 'Active' },
    { name: 'Priya', email: 'priya@example.com', role: 'Recruiter', status: 'Active' },
    { name: 'Root Admin', email: 'admin@careerconnect.com', role: 'Admin', status: 'Active' }
  ];

  const recentJobs = [
    { title: 'Senior React Developer', company: 'Vercel', category: 'Software Development', status: 'Active' },
    { title: 'Full Stack Engineer', company: 'Stripe', category: 'Software Development', status: 'Active' }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            System overview, account management, content moderation, and platform statistics.
          </p>
        </div>
        <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
          <Shield className="w-6 h-6" />
        </div>
      </div>

      {/* 6 Metric Stat Cards matching prompt specification */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, idx) => (
          <StatsCard key={idx} title={s.title} value={s.value} change={s.change} icon={s.icon} />
        ))}
      </div>

      {/* Grid: Recent Users & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Users */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recent Users</h2>
            <Link to="/admin/users" className="text-xs text-emerald-400 font-semibold hover:underline">
              Manage Users
            </Link>
          </div>

          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentUsers.map((u, i) => (
                <tr key={i} className="hover:bg-slate-850">
                  <td className="p-3 font-semibold text-white">{u.name}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Jobs */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recent Jobs</h2>
            <Link to="/admin/jobs" className="text-xs text-emerald-400 font-semibold hover:underline">
              Manage Jobs
            </Link>
          </div>

          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Job Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentJobs.map((j, i) => (
                <tr key={i} className="hover:bg-slate-850">
                  <td className="p-3 font-semibold text-white">{j.title}</td>
                  <td className="p-3">{j.company}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                      {j.status}
                    </span>
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
