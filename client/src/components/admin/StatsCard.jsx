import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCard({ title = 'Total Users', value = '1,248', change = '+12%', isPositive = true, icon: Icon }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center justify-between gap-4 text-slate-350">
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-wide">{value}</span>
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${
            isPositive ? 'text-emerald-450' : 'text-rose-450'
          }`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change}
          </span>
        </div>
      </div>

      {Icon && (
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
