import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  Edit,
  Save,
  X,
  CheckCircle2,
  Loader2,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { recruiterService } from '../../services/recruiterService';

export default function RecruiterProfile() {
  const { user: authUser, updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    designation: '',
    companyName: '',
    companyWebsite: '',
    companyLocation: '',
    companyDescription: '',
    companyIndustry: '',
    companySize: ''
  });

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await recruiterService.getProfile();
      if (data) {
        setProfile(data);
        const u = data.user || authUser || {};
        const c = data.company || {};

        setFormData({
          name: u.name || '',
          phone: u.phone || data.phone || '',
          bio: data.bio || u.bio || '',
          designation: data.designation || 'Talent Acquisition Manager',
          companyName: c.name || data.companyName || '',
          companyWebsite: c.website || '',
          companyLocation: c.location || '',
          companyDescription: c.description || '',
          companyIndustry: c.industry || 'Technology',
          companySize: c.size || '50-200 employees'
        });
      }
    } catch (err) {
      console.error('Failed to load recruiter profile:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to fetch recruiter profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setIsSaving(true);
    try {
      const updated = await recruiterService.updateProfile(formData);
      setProfile(updated);
      setIsEditing(false);
      toast.success('Recruiter profile updated successfully!');
      if (updateUser && updated.user) {
        updateUser(updated.user);
      }
    } catch (err) {
      console.error('Failed to update recruiter profile:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        <p className="text-xs text-slate-400">Loading recruiter profile...</p>
      </div>
    );
  }

  const u = profile?.user || authUser || {};
  const c = profile?.company || {};
  const displayName = u.name || formData.name || 'Recruiter User';
  const displayEmail = u.email || authUser?.email || 'recruiter@careerconnect.com';
  const displayPhone = u.phone || profile?.phone || formData.phone || 'Not specified';
  const displayDesignation = profile?.designation || formData.designation || 'Hiring Manager';
  const displayCompanyName = c.name || profile?.companyName || formData.companyName || 'Hiring Organization';
  const displayBio = profile?.bio || u.bio || formData.bio;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-violet-400 flex items-center justify-center font-extrabold text-white text-2xl shadow-lg">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{displayName}</h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified Recruiter
                </span>
              </div>
              <p className="text-xs text-violet-400 font-semibold mt-0.5">{displayDesignation}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>{displayEmail}</span>
                {displayPhone !== 'Not specified' && (
                  <>
                    <span>•</span>
                    <span>{displayPhone}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-violet-600/20 flex items-center gap-1.5 transition-all"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" /> Cancel
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                Personal & Role Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Technical Recruiter"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">About / Bio</label>
                <textarea
                  rows={2}
                  placeholder="Short bio about your hiring focus and experience..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                Organization / Company Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Website URL</label>
                  <input
                    type="text"
                    placeholder="https://company.com"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Headquarters / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, India"
                    value={formData.companyLocation}
                    onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. Software / Fintech"
                    value={formData.companyIndustry}
                    onChange={(e) => setFormData({ ...formData, companyIndustry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Company Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 50-200 employees"
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Company Overview</label>
                <textarea
                  rows={3}
                  placeholder="Summary of what the company does..."
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Profile Details View */
          <div className="space-y-6">
            {/* Bio */}
            {displayBio && (
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">About</p>
                <p className="text-xs text-slate-200 leading-relaxed">{displayBio}</p>
              </div>
            )}

            {/* Recruiter & Account Details */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" /> Recruiter Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Designation / Role</span>
                  <p className="text-white font-semibold">{displayDesignation}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Email Address</span>
                  <p className="text-white font-semibold truncate">{displayEmail}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Contact Phone</span>
                  <p className="text-white font-semibold">{displayPhone}</p>
                </div>
              </div>
            </div>

            {/* Organization / Company Profile */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" /> Associated Company
              </h2>

              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{displayCompanyName}</h3>
                    <p className="text-xs text-slate-400">{c.industry || 'Technology / Software'}</p>
                  </div>
                  {c.website && (
                    <a
                      href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:underline font-semibold"
                    >
                      <Globe className="w-3.5 h-3.5" /> Visit Website
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Location</span>
                    <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {c.location || 'Remote'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Company Size</span>
                    <span className="text-white font-semibold mt-0.5 block">{c.size || '50-200 employees'}</span>
                  </div>
                </div>

                {c.description && (
                  <div className="pt-2 border-t border-slate-850">
                    <span className="text-slate-400 block text-[11px] font-medium mb-1">Company Overview</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
