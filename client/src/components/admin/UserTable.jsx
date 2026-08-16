import React from 'react';
import { User, Shield, AlertOctagon, CheckCircle, Trash2 } from 'lucide-react';

export default function UserTable({ users = [], onBlockUser, onDeleteUser }) {
  if (users.length === 0) {
    return <div className="text-center py-10 text-slate-500 border border-dashed border-slate-800 rounded-3xl">No users found.</div>;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-slate-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-850 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">User Details</th>
              <th className="py-4 px-6">System Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-850/30 transition-colors">
                
                {/* Details */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-slate-850 bg-slate-950" />
                    <div>
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-xs text-slate-450 mt-0.5">{u.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
                    u.role === 'admin' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-350'
                      : u.role === 'recruiter'
                        ? 'bg-violet-500/10 border-violet-500/20 text-violet-350'
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-350'
                  }`}>
                    {u.role}
                  </span>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                    u.isBlocked ? 'text-rose-400' : 'text-emerald-450'
                  }`}>
                    {u.isBlocked ? <AlertOctagon className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    <span>{u.isBlocked ? 'Blocked' : 'Active'}</span>
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2.5">
                    <button
                      onClick={() => onBlockUser && onBlockUser(u.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                        u.isBlocked
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/25 border-emerald-500/20 text-emerald-350'
                          : 'bg-rose-500/10 hover:bg-rose-500/25 border-rose-500/20 text-rose-350'
                      }`}
                    >
                      {u.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={() => onDeleteUser && onDeleteUser(u.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-550/15 text-slate-500 hover:text-rose-400 hover:border-rose-500/20 border border-transparent transition-colors"
                      title="Delete User"
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
