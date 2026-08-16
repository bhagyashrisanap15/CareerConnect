import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Globe, ArrowLeft, Briefcase } from 'lucide-react';
import JobCard from '../../components/common/JobCard';

export default function CompanyDetails() {
  const { id } = useParams();

  const company = {
    id: id || 'company-1',
    name: 'Vercel',
    industry: 'Software Tools / Cloud Infrastructure',
    location: 'San Francisco, CA',
    website: 'https://vercel.com',
    about: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the edge of the world. We enable teams to deploy frontend frameworks easily.',
    companySize: '500+ employees',
    founded: '2015'
  };

  const availableJobs = [
    {
      id: 'job-1',
      title: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '₹15 - ₹22 LPA',
      type: 'Full Time',
      posted: '1 day ago',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
      id: 'job-6',
      title: 'Backend Cloud Architect',
      company: 'Vercel',
      location: 'Remote',
      salary: '₹20 - ₹28 LPA',
      type: 'Full Time',
      posted: '4 days ago',
      skills: ['Go', 'Node.js', 'Kubernetes', 'AWS']
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <Link to="/companies" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      {/* Company Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-extrabold text-2xl text-indigo-400">
              {company.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-white">{company.name}</h1>
              <p className="text-sm text-slate-300 font-medium flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                {company.industry}
              </p>
            </div>
          </div>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </a>
          )}
        </div>

        {/* Company Info row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Location</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {company.location}
            </p>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Company Size</p>
            <p className="text-xs font-semibold text-white mt-1">{company.companySize}</p>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Founded</p>
            <p className="text-xs font-semibold text-white mt-1">{company.founded}</p>
          </div>
        </div>

        {/* About Company */}
        <div className="space-y-2 pt-2">
          <h2 className="text-base font-bold text-white">About {company.name}</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{company.about}</p>
        </div>
      </div>

      {/* Available Jobs Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-400" />
          Available Jobs ({availableJobs.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
