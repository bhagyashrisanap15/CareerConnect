import React from 'react';
import { Shield, LayoutDashboard, Users, FileText, Building, History, HelpCircle } from 'lucide-react';

export default function AdminSidebar({ activeTab, onTabChange }) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: FileText },
    { id: 'companies', label: 'Companies', icon: Building },
    { id: 'applications', label: 'Applications', icon: History }
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl shrink-0 h-fit space-y-6">
      
      {/* Brand Header */}
      <div className="pb-4 border-b border-slate-800 flex items-center gap-2">
        <Shield className="h-5 w-5 text-indigo-400 shrink-0" />
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">System Admin</h3>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5 uppercase tracking-wide">CareerConnect Console</p>
        </div>
      </div>

      {/* Menu items */}
      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom info widget */}
      <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-450 space-y-2">
        <div className="flex gap-1.5 items-center text-slate-350 font-bold uppercase tracking-wider">
          <HelpCircle className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>System Alerts</span>
        </div>
        <p className="leading-relaxed">
          Monitor job listings, verify company registrations, and manage system accounts from this portal.
        </p>
      </div>
    </aside>
  );
}
