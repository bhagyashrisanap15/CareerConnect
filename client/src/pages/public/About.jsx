import React from 'react';
import { Briefcase, Target, ShieldCheck, Users, Sparkles, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          About CareerConnect
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Empowering Talent & Connecting Global Employers
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          CareerConnect is built to bridge the gap between ambitious students, job seekers, and forward-thinking recruitment teams.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To democratize access to career opportunities by providing transparent screening, real-time application tracking, and direct recruiter access.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Verified Listings</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every job posting and company profile undergoes administrative moderation to eliminate spam and protect candidate security.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">End-to-End Tracking</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Candidates can monitor application stages in real-time while recruiters manage candidate candidate pipelines effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
}