import React from 'react';
import { User, Mail, Phone, Building2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function RecruiterProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 border-2 border-violet-400 flex items-center justify-center font-extrabold text-white text-2xl">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'R'}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">{user?.name || 'Recruiter User'}</h1>
            <p className="text-xs text-violet-400 font-semibold">{user?.email || 'recruiter@careerconnect.com'}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-violet-500/20 text-violet-300">
              Verified Hiring Manager
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Account Credentials</h2>
          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Full Name:</span>
              <span className="text-white font-semibold">{user?.name || 'Recruiter User'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email Address:</span>
              <span className="text-white font-semibold">{user?.email || 'recruiter@careerconnect.com'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Assigned Organization:</span>
              <span className="text-indigo-400 font-semibold">{user?.companyName || 'Vercel'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
