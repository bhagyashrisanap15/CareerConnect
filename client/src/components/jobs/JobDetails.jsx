import React from 'react';
import { MapPin, DollarSign, Clock, Calendar, ShieldCheck, Briefcase, ChevronLeft, Building } from 'lucide-react';

export default function JobDetails({ job, onBack, onApply, user }) {
  if (!job) {
    return (
      <div className="text-center py-12 text-slate-400">
        No job details loaded.
      </div>
    );
  }

  const {
    title = 'Software Engineer',
    company = 'TechCorp',
    location = 'San Francisco, CA (Hybrid)',
    salary = '$120k - $150k',
    type = 'Full-time',
    posted = '2 days ago',
    logo = '',
    description = 'We are looking for a skilled Software Engineer to join our team...',
    requirements = [
      '3+ years of experience with modern frontend frameworks (React, Vue, or Angular)',
      'Proficiency in JavaScript, TypeScript, and CSS Tailwind structures',
      'Experience building responsive layouts and REST API integrations',
      'Strong problem-solving skills and communication abilities'
    ],
    responsibilities = [
      'Write clean, maintainable, and high-performance React components',
      'Collaborate with product designers and backend engineers to spec features',
      'Participate in code reviews and mentor junior developers',
      'Identify and resolve UI bottlenecks or usability concerns'
    ]
  } = job;

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-300">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to listings</span>
      </button>

      {/* Hero Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="flex gap-4 items-center">
          {logo ? (
            <img src={logo} alt={company} className="w-16 h-16 rounded-2xl object-cover border border-slate-800 bg-slate-950" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-2xl">
              {company.charAt(0)}
            </div>
          )}
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">{title}</h1>
            <p className="text-sm text-indigo-400 flex items-center gap-1 font-medium">
              <Building className="h-4 w-4" />
              {company}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto">
          {user?.role === 'candidate' || !user ? (
            <button
              onClick={onApply}
              className="w-full md:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20"
            >
              Apply Now
            </button>
          ) : (
            <span className="inline-block text-xs font-semibold px-4 py-2 bg-slate-800 border border-slate-700/50 rounded-xl text-slate-400 text-center w-full">
              Recruiter Mode
            </span>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detail text */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job description */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Job Description
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Requirements
            </h2>
            <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
              {requirements.map((req, i) => (
                <li key={i} className="leading-relaxed pl-1">{req}</li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Responsibilities
            </h2>
            <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
              {responsibilities.map((resp, i) => (
                <li key={i} className="leading-relaxed pl-1">{resp}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Job Overview
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3 items-center">
                <Clock className="h-5 w-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Job Type</p>
                  <p className="font-semibold text-slate-350">{type}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin className="h-5 w-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Location</p>
                  <p className="font-semibold text-slate-350">{location}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <DollarSign className="h-5 w-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Salary Range</p>
                  <p className="font-semibold text-slate-350">{salary}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Calendar className="h-5 w-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Date Posted</p>
                  <p className="font-semibold text-slate-350">{posted}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850 flex items-center gap-2 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Verified Employer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
