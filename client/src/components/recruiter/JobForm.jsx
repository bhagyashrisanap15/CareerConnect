import React, { useState } from 'react';
import { Briefcase, Save, MapPin, DollarSign, Clock, Plus, Trash2 } from 'lucide-react';

export default function JobForm({ initialJob, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialJob?.title || '',
    company: initialJob?.company || '',
    location: initialJob?.location || '',
    salary: initialJob?.salary || '',
    type: initialJob?.type || 'Full-time',
    description: initialJob?.description || '',
    requirements: initialJob?.requirements || [''],
    responsibilities: initialJob?.responsibilities || ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const nextArr = [...formData[field]];
    nextArr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: nextArr }));
  };

  const handleAddArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleRemoveArrayItem = (field, index) => {
    const nextArr = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: nextArr }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit({
          ...formData,
          requirements: formData.requirements.filter((r) => r.trim() !== ''),
          responsibilities: formData.responsibilities.filter((r) => r.trim() !== '')
        });
      }
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-slate-350 shadow-xl max-w-4xl mx-auto">
      <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2.5 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-indigo-400" />
        <span>{initialJob ? 'Edit Job Posting' : 'Create Job Opening'}</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Lead React Developer"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
              required
            />
          </div>

          {/* Company */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Corporation"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
              required
            />
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
                placeholder="e.g. San Francisco, CA (Hybrid)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
                required
              />
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Salary Budget</label>
            <div className="relative flex items-center">
              <DollarSign className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. $130k - $160k"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
                required
              />
            </div>
          </div>

          {/* Job Type selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Employment Type</label>
            <div className="relative flex items-center">
              <Clock className="absolute left-3 h-5 w-5 text-slate-500" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all cursor-pointer"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Outline the role goals, details, and environment..."
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-2xl p-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650 resize-none"
            required
          />
        </div>

        {/* Requirements */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Requirements</label>
            <button
              type="button"
              onClick={() => handleAddArrayItem('requirements')}
              className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              <Plus className="h-3.5 w-3.5" /> Add requirement
            </button>
          </div>
          
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  placeholder="e.g. 3+ years React experience"
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2.5 px-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('requirements', index)}
                    className="p-2.5 rounded-xl border border-transparent hover:border-slate-800 text-slate-500 hover:text-rose-450 hover:bg-slate-850"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Responsibilities</label>
            <button
              type="button"
              onClick={() => handleAddArrayItem('responsibilities')}
              className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              <Plus className="h-3.5 w-3.5" /> Add responsibility
            </button>
          </div>
          
          <div className="space-y-2">
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                  placeholder="e.g. Write test suites and maintain components"
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2.5 px-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-700"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('responsibilities', index)}
                    className="p-2.5 rounded-xl border border-transparent hover:border-slate-800 text-slate-500 hover:text-rose-450 hover:bg-slate-850"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Publish Job Opening</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
