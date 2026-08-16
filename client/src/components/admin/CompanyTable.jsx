import React from 'react';
import { Building, Globe, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';

export default function CompanyTable({ companies = [], onApproveCompany, onDeleteCompany }) {
  if (companies.length === 0) {
    return <div className="text-center py-10 text-slate-550 border border-dashed border-slate-800 rounded-3xl">No companies found.</div>;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-slate-350">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-850 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Company</th>
              <th className="py-4 px-6">Website</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {companies.map((c) => (
              <tr key={c.id} className="hover:bg-slate-850/30 transition-colors">
                
                {/* Brand */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {c.logo ? (
                      <img src={c.logo} alt={c.name} className="w-9 h-9 rounded-xl object-cover border border-slate-800 bg-slate-950" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                        {c.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-xs text-slate-450 mt-0.5">{c.industry}</div>
                    </div>
                  </div>
                </td>

                {/* Website */}
                <td className="py-4 px-6 text-slate-400">
                  <a href={c.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-405 hover:underline">
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>{c.website.replace(/^https?:\/\//i, '')}</span>
                  </a>
                </td>

                {/* HQ Location */}
                <td className="py-4 px-6 text-slate-450">
                  {c.location}
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
                    c.isVerified 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-350'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-350'
                  }`}>
                    {c.isVerified ? 'Verified' : 'Pending Review'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2.5">
                    {!c.isVerified && onApproveCompany && (
                      <button
                        onClick={() => onApproveCompany(c.id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 text-emerald-350 transition-colors"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteCompany && onDeleteCompany(c.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-550/15 text-slate-500 hover:text-rose-455 hover:border-rose-500/20 border border-transparent transition-colors"
                      title="Remove Company"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
