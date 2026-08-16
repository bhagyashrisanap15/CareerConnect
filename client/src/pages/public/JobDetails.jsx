import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Building2, Heart, ArrowLeft, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import ApplyJobModal from '../../components/jobs/ApplyJobModal';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isJobSaved, toggleSaveJob } = useAuth();
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Mock Job Details
  const job = {
    id: id || 'job-1',
    title: 'Senior React Developer',
    company: 'Vercel',
    companyLogo: '',
    location: 'San Francisco, CA (or Remote)',
    jobType: 'Full Time',
    salary: '₹15 - ₹22 LPA',
    experience: '3-5 yrs',
    postedDate: '2 days ago',
    description: `We are seeking an experienced Senior React Developer to join our core UI team. You will be building scalable frontend micro-applications, engineering design token architectures, and leading performance optimizations across web products.`,
    responsibilities: [
      'Architect highly modular React components and state machines.',
      'Optimize Web Vitals, SSR hydration benchmarks, and bundle sizes.',
      'Collaborate with product managers, backend engineers, and design leads.',
      'Mentor junior software engineers and conduct code reviews.'
    ],
    requirements: [
      '5+ years of software engineering experience with modern JavaScript / TypeScript.',
      '3+ years building enterprise React web applications at scale.',
      'Deep understanding of React hooks, server components, and state management.',
      'Familiarity with CI/CD, Git, and automated testing frameworks (Jest/Playwright).'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'REST API', 'Jest']
  };

  const isSaved = isJobSaved(job.id);

  const handleApplyClick = () => {
    if (!user) {
      toast.error('Please login to apply for this job opening');
      navigate('/login');
      return;
    }
    setIsApplyOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <Link to="/jobs" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* Main Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-extrabold text-2xl text-indigo-400 shrink-0">
              {job.company.charAt(0)}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{job.title}</h1>
              <p className="text-base text-slate-300 font-semibold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                {job.company}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isSaved
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-750"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-60"
            >
              {hasApplied ? 'Applied ✓' : 'Apply Now'}
            </button>
          </div>
        </div>

        {/* Info Pill Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Location</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {job.location}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Job Type</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> {job.jobType}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Salary Range</p>
            <p className="text-xs font-semibold text-emerald-400 mt-1">{job.salary}</p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Experience</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {job.experience}
            </p>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="md:col-span-2 space-y-8 bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl">
          
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Job Description</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{job.description}</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Key Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Requirements & Qualifications</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Required */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Summary Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-base">About Company</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vercel provides developers with tools and infrastructure to build fast web applications at global scale.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Industry:</span>
                <span className="font-semibold">Software / Cloud</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Company Size:</span>
                <span className="font-semibold">500+ employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Website:</span>
                <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">vercel.com</a>
              </div>
            </div>

            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all mt-4"
            >
              {hasApplied ? 'Already Applied' : 'Submit Application'}
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal Integration */}
      <ApplyJobModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        job={job}
        onSubmit={(application) => {
          setHasApplied(true);
          toast.success('Application submitted successfully!');
        }}
      />
    </div>
  );
}
