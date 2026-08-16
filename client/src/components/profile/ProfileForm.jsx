import React, { useState } from 'react';
import { Save, User, Mail, Briefcase, MapPin, Phone, Globe } from 'lucide-react';

export default function ProfileForm({ user, onSave }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || '',
    website: user?.website || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSave) onSave(formData);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-slate-350 shadow-xl">
      <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2.5">
        Personal Information
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-300">
        
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
          <div className="relative flex items-center">
            <User className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Professional Bio</label>
          <div className="relative flex items-center">
            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell companies about your skills and goals..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 resize-none"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Location</label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone Number</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Website */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Portfolio Website</label>
          <div className="relative flex items-center">
            <Globe className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourportfolio.dev"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="md:col-span-2 flex justify-end pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
