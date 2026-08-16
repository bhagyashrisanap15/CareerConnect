import React, { useState } from 'react';
import { Shield, Eye, Edit2, UserX, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 'u-1', name: 'Anil', email: 'anil@example.com', role: 'Student', status: 'Active' },
    { id: 'u-2', name: 'Priya', email: 'priya@example.com', role: 'Recruiter', status: 'Active' },
    { id: 'u-3', name: 'Admin Root', email: 'admin@careerconnect.com', role: 'Admin', status: 'Active' }
  ]);

  const toggleDeactivate = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Deactivated' : 'Active' } : u
      )
    );
    toast.success('User status updated');
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success('User account deleted');
  };

  const handleEditRole = (id) => {
    const roles = ['Student', 'Recruiter', 'Admin'];
    const current = users.find((u) => u.id === id);
    const nextRole = roles[(roles.indexOf(current.role) + 1) % roles.length];

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: nextRole } : u)));
    toast.success(`Role updated to ${nextRole}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Manage Users</h1>
        <p className="text-xs text-slate-400 mt-1">
          System user account moderation, role changes, and account deletion.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 font-bold text-white">{u.name}</td>
                  <td className="p-4 text-slate-300">{u.email}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-800 text-indigo-300 border border-slate-700 rounded-lg font-semibold text-[11px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        u.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toast.success(`Viewing profile for ${u.name}`)}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" /> View
                      </button>

                      {u.role !== 'Admin' && (
                        <>
                          <button
                            onClick={() => handleEditRole(u.id)}
                            className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg font-semibold flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit Role
                          </button>

                          <button
                            onClick={() => toggleDeactivate(u.id)}
                            className="px-2.5 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-lg font-semibold flex items-center gap-1"
                          >
                            <UserX className="w-3.5 h-3.5" /> Deactivate
                          </button>

                          <button
                            onClick={() => handleDelete(u.id)}
                            className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
