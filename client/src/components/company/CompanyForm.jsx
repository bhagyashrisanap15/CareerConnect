import React, { useState } from 'react';
import { Building, Save, MapPin, Globe, Users, Image } from 'lucide-react';

export default function CompanyForm({ initialCompany, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialCompany?.name || '',
    logo: initialCompany?.logo || '',
    website: initialCompany?.website || '',
    location: initialCompany?.location || '',
    industry: initialCompany?.industry || '',
    size: initialCompany?.size || '11-50 employees',
    description: initialCompany?.description || ''
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
      if (onSubmit) onSubmit(formData);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-slate-350 shadow-xl max-w-3xl mx-auto">
      <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2.5 flex items-center gap-2">
        <Building className="h-5 w-5 text-indigo-400" />
        <span>Company Profile Settings</span>
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-355">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Company Name</label>
          <div className="relative flex items-center">
            <Building className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Stripe"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
              required
            />
          </div>
        </div>

        {/* Logo URL */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Logo URL</label>
          <div className="relative flex items-center">
            <Image className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="e.g. https://domain.com/logo.png"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* Website */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Website</label>
          <div className="relative flex items-center">
            <Globe className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="e.g. https://stripe.com"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Headquarters</label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
              required
            />
          </div>
        </div>

        {/* Industry */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Industry Sector</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="e.g. Fintech, Healthcare..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
          />
        </div>

        {/* Size Selection */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Company Size</label>
          <div className="relative flex items-center">
            <Users className="absolute left-3 h-5 w-5 text-slate-500" />
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all cursor-pointer"
            >
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="51-200 employees">51-200 employees</option>
              <option value="201-500 employees">201-500 employees</option>
              <option value="501+ employees">501+ employees</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">About / Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the company mission, products, and workspaces..."
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-2xl p-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700 resize-none"
            required
          />
        </div>

        {/* Save button */}
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
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
