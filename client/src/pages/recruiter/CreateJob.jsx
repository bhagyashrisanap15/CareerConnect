import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Briefcase, Calendar, DollarSign, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { CATEGORIES, WORK_MODES, JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils/constants';
import { jobService } from '../../services/jobService';
import { companyService } from '../../services/companyService';
import { categoryService } from '../../services/categoryService';
import { useAuth } from '../../hooks/useAuth';

export default function CreateJob() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(CATEGORIES);
  const [companyId, setCompanyId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Full Time',
    category: 'Software Development',
    company: user?.companyName || '',
    location: '',
    workMode: 'Remote',
    salaryMin: '',
    salaryMax: '',
    experience: '1-3 yrs',
    skills: '',
    description: '',
    responsibilities: '',
    requirements: '',
    deadline: ''
  });

  useEffect(() => {
    // Attempt to prefetch recruiter's registered company
    const initData = async () => {
      try {
        const comp = await companyService.getRecruiterCompany();
        if (comp) {
          setCompanyId(comp._id);
          setFormData((prev) => ({
            ...prev,
            company: comp.name || prev.company,
            location: comp.location || prev.location
          }));
        }
      } catch {
        // Recruiter might not have configured company profile yet
      }

      try {
        const cats = await categoryService.getCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          const catNames = cats.map(c => typeof c === 'string' ? c : c.name);
          setCategoryOptions(Array.from(new Set([...catNames, ...CATEGORIES])));
        }
      } catch {
        // Fallback to default categories
      }
    };

    initData();
  }, []);

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
        employmentType: formData.type.toLowerCase().includes('part')
          ? 'part-time'
          : formData.type.toLowerCase().includes('contract')
          ? 'contract'
          : formData.type.toLowerCase().includes('remote')
          ? 'remote'
          : 'full-time',
        company: companyId || undefined,
        companyName: formData.company || user?.name + "'s Company",
        category: formData.category,
        location: formData.location || 'Remote',
        workMode: formData.workMode,
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
        applicationDeadline: formData.deadline || undefined,
        status: 'active'
      };

      await jobService.createJob(payload);
      toast.success('Job published successfully!');
      navigate('/recruiter/jobs');
    } catch (error) {
      console.error('Failed to create job:', error);
      toast.error(typeof error === 'string' ? error : error?.message || 'Failed to publish job opening');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <Link to="/recruiter/jobs" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to My Jobs
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-violet-400" /> Create New Job Opening
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in details to publish an active job listing across CareerConnect candidate portals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Job Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior React Developer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Job Type & Work Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Job Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Work Mode *</label>
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
              <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
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
          </div>

          {/* Company & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Location *</label>
              <input
                type="text"
                required
                placeholder="e.g. Pune / San Francisco"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Salary Min / Max & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Salary Min (LPA)</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Salary Max (LPA)</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Required Experience *</label>
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

          {/* Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Required Skills (comma separated) *</label>
            <input
              type="text"
              required
              placeholder="React, Node.js, MongoDB, TypeScript"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Job Description *</label>
            <textarea
              rows={4}
              required
              placeholder="Overview of the job role and goals..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Key Responsibilities</label>
            <textarea
              rows={3}
              placeholder="List bullet points separated by line breaks..."
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Requirements & Prerequisites</label>
            <textarea
              rows={3}
              placeholder="Education or tech stack prerequisites..."
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Application Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Submit Action */}
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
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Job</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
