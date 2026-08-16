import React from 'react';
import { Building, MapPin, Briefcase } from 'lucide-react';

export default function CompanyCard({ company, onClick }) {
  const {
    name = 'TechCorp',
    logo = '',
    location = 'San Francisco, CA',
    openingsCount = 8,
    industry = 'Software Engineering',
    description = 'TechCorp designs next-generation tools for creators, builders, and developers.'
  } = company || {};

  return (
    <div
      onClick={onClick}
      className="group bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-indigo-950/10 cursor-pointer flex flex-col justify-between hover:scale-[1.01]"
    >
      <div className="space-y-4">
        {/* Logo, Name, Location */}
        <div className="flex gap-3 items-center">
          {logo ? (
            <img src={logo} alt={name} className="w-12 h-12 rounded-xl object-cover border border-slate-800 bg-slate-950" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide group-hover:text-indigo-400 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-slate-450 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </p>
          </div>
        </div>

        {/* Industry, Description */}
        <div className="space-y-2">
          <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-indigo-300">
            {industry}
          </span>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Openings count */}
      <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-800/80 text-xs">
        <span className="text-slate-500 flex items-center gap-1.5">
          <Briefcase className="h-4 w-4 text-slate-650" />
          {openingsCount} job openings
        </span>
        <span className="text-indigo-400 font-semibold group-hover:underline">View profile</span>
      </div>
    </div>
  );
}
