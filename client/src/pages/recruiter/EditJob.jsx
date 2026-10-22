import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { CATEGORIES, WORK_MODES, JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils/constants';
import { jobService } from '../../services/jobService';
import { categoryService } from '../../services/categoryService';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(CATEGORIES);

  const [formData, setFormData] = useState({
    title: '',
    type: 'job',
    employmentType: 'full-time',
    category: '',
    location: '',
    workMode: 'Remote',
    salaryMin: '',
    salaryMax: '',
    experience: '1-3 yrs',
    skills: '',
    description: '',
    responsibilities: '',
    requirements: '',
    status: 'active'
  });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsLoading(true);

        // Fetch categories list
        try {
          const cats = await categoryService.getCategories();
          if (Array.isArray(cats) && cats.length > 0) {
            const catNames = cats.map((c) => (typeof c === 'string' ? c : c.name));
            setCategoryOptions(Array.from(new Set([...catNames, ...CATEGORIES])));
          }
        } catch {
          // Fallback to constants
        }

        const job = await jobService.getJobById(id);
        if (job) {
          setFormData({
            title: job.title || '',
            type: job.type || 'job',
            employmentType: job.employmentType || 'full-time',
            category: job.category?.name || job.category || '',
            location: job.location || '',
            workMode: job.workMode || (job.employmentType === 'remote' ? 'Remote' : 'Onsite'),
            salaryMin: job.salaryMin !== undefined && job.salaryMin !== null ? String(job.salaryMin) : '',
            salaryMax: job.salaryMax !== undefined && job.salaryMax !== null ? String(job.salaryMax) : '',
            experience: job.experience || '1-3 yrs',
            skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '',
            description: job.description || '',
            responsibilities: Array.isArray(job.responsibilities)
              ? job.responsibilities.join('\n')
              : job.responsibilities || '',
            requirements: Array.isArray(job.requirements)
              ? job.requirements.join('\n')
              : job.requirements || '',
            status: job.status || 'active'
          });
        }
      } catch (err) {
        console.error('Failed to load job details:', err);
        toast.error(typeof err === 'string' ? err : 'Failed to fetch job details');
        navigate('/recruiter/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJobData();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Job title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type.toLowerCase().includes('intern') ? 'internship' : 'job',
        employmentType: formData.employmentType || 'full-time',
        location: formData.location || 'Remote',
        workMode: formData.workMode,
        category: formData.category,
        salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
        experience: formData.experience,
        skills: formData.skills ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
        responsibilities: formData.responsibilities
          ? formData.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
        requirements: formData.requirements
          ? formData.requirements.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
        status: formData.status
      };

      await jobService.updateJob(id, payload);
      toast.success('Job posting updated successfully!');
      navigate('/recruiter/jobs');
    } catch (err) {
      console.error('Failed to update job:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to save job changes');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        <p className="text-xs text-slate-400">Loading job posting information...</p>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <Link
        to="/recruiter/jobs"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Jobs
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-violet-400" /> Edit Job Posting
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update job listing details for <span className="text-white font-medium">{formData.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Job Type & Work Mode & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 capitalize"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Work Mode</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {WORK_MODES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Listing Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 capitalize"
              >
                <option value="active">Active (Accepting applications)</option>
                <option value="closed">Closed (Applications paused)</option>
              </select>
            </div>
          </div>

          {/* Location & Category & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                placeholder="e.g. Pune, India / Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {EXPERIENCE_LEVELS.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary Min / Max */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Salary Min (LPA)</label>
              <input
                type="number"
                placeholder="e.g. 6"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Salary Max (LPA)</label>
              <input
                type="number"
                placeholder="e.g. 12"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Required Skills (comma separated) *</label>
            <input
              type="text"
              required
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Description *</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Responsibilities (one per line)</label>
            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Requirements (one per line)</label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Link
              to="/recruiter/jobs"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
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
      </div>
    </div>
  );
}
