import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Building2, Briefcase, Users, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import JobCard from '../../components/common/JobCard';
import { CATEGORIES } from '../../utils/constants';

export default function Home() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  // Sample Featured Jobs
  const featuredJobs = [
    {
      id: 'job-1',
      title: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '₹15-22 LPA',
      type: 'Full Time',
      posted: '1 day ago',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
      id: 'job-2',
      title: 'Full Stack Engineer',
      company: 'Stripe',
      location: 'Remote',
      salary: '₹18-25 LPA',
      type: 'Remote',
      posted: '2 days ago',
      skills: ['Node.js', 'React', 'MongoDB', 'PostgreSQL']
    },
    {
      id: 'job-3',
      title: 'UI/UX Design Lead',
      company: 'Linear',
      location: 'Pune',
      salary: '₹12-18 LPA',
      type: 'Hybrid',
      posted: '3 days ago',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
    }
  ];

  // Top Companies
  const topCompanies = [
    { name: 'Vercel', industry: 'Software Tools', location: 'San Francisco', jobsCount: 12, bg: 'from-blue-600 to-indigo-600' },
    { name: 'Stripe', industry: 'Fintech / Payments', location: 'Remote', jobsCount: 24, bg: 'from-purple-600 to-violet-600' },
    { name: 'Linear', industry: 'Productivity Software', location: 'New York', jobsCount: 8, bg: 'from-emerald-600 to-teal-600' },
    { name: 'ABC Tech', industry: 'IT & Cloud', location: 'Pune', jobsCount: 15, bg: 'from-amber-600 to-orange-600' }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glowing background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-inner">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Find Your Dream Job Today</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Connect with Opportunities That <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Shape Your Career</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of full-time, part-time, and internship jobs from top hiring companies worldwide.
          </p>

          {/* Search Jobs Form */}
          <form onSubmit={handleSearch} className="mt-8 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950/80 rounded-xl sm:rounded-2xl border border-slate-800/80">
              <Search className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, skills, or company..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-medium"
              />
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950/80 rounded-xl sm:rounded-2xl border border-slate-800/80">
              <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="City, state, or remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Metrics */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-slate-900/50 border border-slate-800/60 rounded-2xl">
              <p className="text-2xl font-extrabold text-white">10,000+</p>
              <p className="text-xs text-slate-400 font-medium">Active Job Openings</p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800/60 rounded-2xl">
              <p className="text-2xl font-extrabold text-white">1,200+</p>
              <p className="text-xs text-slate-400 font-medium">Hiring Companies</p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800/60 rounded-2xl">
              <p className="text-2xl font-extrabold text-white">95%</p>
              <p className="text-xs text-slate-400 font-medium">Success Rate</p>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800/60 rounded-2xl">
              <p className="text-2xl font-extrabold text-white">24/7</p>
              <p className="text-xs text-slate-400 font-medium">Direct Recruiter Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Popular Job Categories</h2>
            <p className="text-sm text-slate-400 mt-1">Explore opportunities tailored to your specialized domain.</p>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Browse All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/jobs?category=${encodeURIComponent(cat)}`}
              className="p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">{cat}</h3>
                <p className="text-xs text-slate-500 mt-1">150+ Open Roles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Jobs</h2>
            <p className="text-sm text-slate-400 mt-1">Handpicked high-impact roles posted by leading tech employers.</p>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            View All Openings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Top Companies */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Top Hiring Companies</h2>
            <p className="text-sm text-slate-400 mt-1">Directly apply to verified organizations building modern products.</p>
          </div>
          <Link to="/companies" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            View All Companies <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCompanies.map((c, i) => (
            <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center font-bold text-white text-lg shadow-lg mb-4`}>
                  {c.name.charAt(0)}
                </div>
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{c.industry}</p>
                <p className="text-xs text-slate-500 mt-2">📍 {c.location}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">{c.jobsCount} open roles</span>
                <Link to="/companies" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How CareerConnect Works */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 bg-slate-900/40 border border-slate-800 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How CareerConnect Works</h2>
          <p className="text-sm text-slate-400 mt-2">Streamlined workflow designed for candidate success and recruiter speed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Create Your Account</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up as a Student/Candidate or Recruiter. Set up your rich profile with education, skills, and resume.
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Discover & Apply</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Search targeted roles across industries, filter by remote options, and submit 1-click applications.
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Track Applications</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitor candidate progression timelines from Screening, Under Review, Interview, to Selection.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="text-sm sm:text-base text-indigo-200 leading-relaxed">
              Join thousands of job seekers and top companies already connected through CareerConnect.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Create Free Account
              </Link>
              <Link
                to="/jobs"
                className="px-6 py-3 bg-slate-900/80 hover:bg-slate-900 border border-indigo-400/40 text-white font-bold text-sm rounded-xl transition-all"
              >
                Browse Open Roles
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
