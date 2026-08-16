import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Globe, Edit, Briefcase, Plus, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState({
    name: 'Vercel',
    industry: 'Software Tools & Cloud Infrastructure',
    location: 'San Francisco, CA',
    website: 'https://vercel.com',
    companySize: '500+ employees',
    foundedYear: '2015',
    description: 'Vercel provides developers with tools and infrastructure to build fast web applications. We enable engineering teams to create, deploy, and scale web applications at edge speeds worldwide.'
  });

  const [openPositions, setOpenPositions] = useState([
    { id: 'job-1', title: 'React Developer', type: 'Full Time', location: 'San Francisco, CA' },
    { id: 'job-2', title: 'Node Developer', type: 'Remote', location: 'Remote' },
    { id: 'job-3', title: 'MERN Intern', type: 'Internship', location: 'Pune' }
  ]);

  const [editForm, setEditForm] = useState({ ...company });

  const handleSave = (e) => {
    e.preventDefault();
    setCompany({ ...editForm });
    setIsEditing(false);
    toast.success('Company profile updated!');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center font-extrabold text-white text-2xl">
              {company.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">{company.name}</h1>
              <p className="text-xs text-indigo-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5" /> {company.industry}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {company.location}</span>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-400 hover:underline">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Company'}</span>
          </button>
        </div>

        {/* Edit Company Form Modal / Inline Form */}
        {isEditing ? (
          <form onSubmit={handleSave} className="pt-6 border-t border-slate-800 space-y-4 bg-slate-950/60 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Update Company Profile</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Industry</label>
                <input
                  type="text"
                  required
                  value={editForm.industry}
                  onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Website URL</label>
                <input
                  type="url"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Size</label>
                <input
                  type="text"
                  value={editForm.companySize}
                  onChange={(e) => setEditForm({ ...editForm, companySize: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">About Company / Description</label>
              <textarea
                rows={3}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Company
              </button>
            </div>
          </form>
        ) : (
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">About Company</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{company.description}</p>
          </div>
        )}
      </div>

      {/* Open Positions matching exact specification */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-violet-400" /> Open Positions ({openPositions.length})
          </h2>
          <Link
            to="/recruiter/jobs/create"
            className="text-xs text-violet-400 font-bold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Opening
          </Link>
        </div>

        <div className="space-y-3">
          {openPositions.map((pos) => (
            <div
              key={pos.id}
              className="p-4 bg-slate-950/60 border border-slate-800 hover:border-violet-500/40 rounded-2xl flex items-center justify-between transition-colors"
            >
              <div>
                <h3 className="font-bold text-white text-sm">{pos.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{pos.location} • {pos.type}</p>
              </div>

              <Link
                to={`/recruiter/jobs/edit/${pos.id}`}
                className="px-3.5 py-1.5 bg-slate-800 text-violet-300 hover:text-white rounded-xl text-xs font-semibold"
              >
                Edit Role
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
