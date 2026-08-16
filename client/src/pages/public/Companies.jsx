import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Briefcase, ExternalLink, Search } from 'lucide-react';

export default function Companies() {
  const [query, setQuery] = useState('');

  const companiesList = [
    {
      id: 'company-1',
      name: 'Vercel',
      industry: 'Software Tools / Cloud',
      location: 'San Francisco, CA',
      jobsCount: 12,
      description: 'Vercel provides developers with tools and infrastructure to build fast web applications.',
      website: 'https://vercel.com'
    },
    {
      id: 'company-2',
      name: 'Stripe',
      industry: 'Fintech / Payments',
      location: 'Remote',
      jobsCount: 24,
      description: 'Stripe is an API-first financial infrastructure network for international online commerce.',
      website: 'https://stripe.com'
    },
    {
      id: 'company-3',
      name: 'Linear',
      industry: 'Productivity Software',
      location: 'New York, NY',
      jobsCount: 8,
      description: 'Linear streamlines software projects, sprints, tasks, and bug tracking systems.',
      website: 'https://linear.app'
    },
    {
      id: 'company-4',
      name: 'ABC Technologies',
      industry: 'IT & Cloud Solutions',
      location: 'Pune, India',
      jobsCount: 15,
      description: 'Enterprise IT solutions, web development services, and digital consulting.',
      website: 'https://abctech.example.com'
    }
  ];

  const filtered = companiesList.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.industry.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Top Hiring Companies</h1>
          <p className="text-sm text-slate-400 mt-1">
            Discover organizations hiring tech talent, designers, and business specialists.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80 flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl">
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            type="text"
            placeholder="Search company or industry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Companies Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((company) => (
          <div
            key={company.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xl">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{company.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      {company.industry}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold">
                  {company.jobsCount} Open Jobs
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 my-3">
                {company.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {company.location}
                </span>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-indigo-400 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3">
              <Link
                to={`/companies/${company.id}`}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 hover:text-white rounded-xl text-xs font-bold border border-slate-750 flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Company & Jobs</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
