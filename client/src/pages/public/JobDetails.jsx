import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Calendar,
  Building2,
  Heart,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Share2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import ApplyJobModal from '../../components/jobs/ApplyJobModal';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { studentService } from '../../services/studentService';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isJobSaved, toggleSaveJob } = useAuth();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [existingResume, setExistingResume] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const data = await jobService.getJobById(id);
        setJob(data);

        // Check if student already applied & fetch existing resume
        if (user && user.role === 'student') {
          try {
            const [myApps, profile] = await Promise.allSettled([
              applicationService.getStudentApplications(),
              studentService.getProfile()
            ]);

            if (myApps.status === 'fulfilled' && Array.isArray(myApps.value)) {
              const already = myApps.value.some((app) => {
                const appId = app.job?._id || app.job;
                return String(appId) === String(id) && app.status !== 'withdrawn';
              });
              setHasApplied(already);
            }

            if (profile.status === 'fulfilled' && profile.value?.resume) {
              setExistingResume(profile.value.resume);
            }
          } catch (e) {
            console.error('Failed checking applications:', e);
          }
        }
      } catch (err) {
        console.error('Failed to load job details:', err);
        toast.error(typeof err === 'string' ? err : 'Job not found');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, user]);

  const isSaved = job ? isJobSaved(job._id || job.id) : false;

  const handleApplyClick = () => {
    if (!user) {
      toast.error('Please login to apply for this job opening');
      navigate('/login');
      return;
    }
    if (user.role !== 'student') {
      toast.error('Only student accounts can apply for jobs');
      return;
    }
    if (hasApplied) {
      toast.error('You have already applied for this job');
      return;
    }
    setIsApplyOpen(true);
  };

  const handleApplicationSubmit = async ({ resume, resumeUrl, coverLetter }) => {
    const formData = new FormData();
    if (resume) {
      formData.append('resume', resume);
    } else if (resumeUrl) {
      formData.append('resumeUrl', resumeUrl);
    }
    if (coverLetter) {
      formData.append('coverLetter', coverLetter);
    }

    await applicationService.applyForJob(job._id || id, formData);
    setHasApplied(true);
    toast.success('Application submitted successfully!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        <p className="text-xs text-slate-400">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-700">
          <Briefcase className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Job Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested job posting may have been removed or closed by the recruiter.
        </p>
        <Link
          to="/jobs"
          className="inline-block px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold"
        >
          Explore Other Openings
        </Link>
      </div>
    );
  }

  const companyName = job.company?.name || job.companyName || 'Hiring Company';
  const location = job.location || 'Remote';
  const jobType = job.employmentType || job.type || 'Full Time';
  const salaryText =
    job.salaryMin && job.salaryMax
      ? `₹${job.salaryMin} - ₹${job.salaryMax} LPA`
      : job.salaryMin
      ? `₹${job.salaryMin} LPA+`
      : job.stipend
      ? `₹${job.stipend}/mo`
      : 'Competitive';

  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : [];
  const requirements = Array.isArray(job.requirements) ? job.requirements : [];
  const skills = Array.isArray(job.skills) ? job.skills : [];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>

      {/* Main Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 border border-indigo-500/30 flex items-center justify-center font-extrabold text-2xl text-white shrink-0 shadow-lg">
              {companyName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{job.title}</h1>
              <p className="text-base text-slate-300 font-semibold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                {companyName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSaveJob(job._id || job.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isSaved
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
              title="Bookmark opening"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-750 transition-colors"
              title="Share job opening"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className={`px-6 py-3 font-bold text-sm rounded-2xl shadow-lg transition-all ${
                hasApplied
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:scale-[1.02]'
              }`}
            >
              {hasApplied ? 'Applied ✓' : 'Apply Now'}
            </button>
          </div>
        </div>

        {/* Info Pill Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Location</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {location}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Job Type</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1 capitalize">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {jobType}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Compensation</p>
            <p className="text-xs font-semibold text-emerald-400 mt-1">{salaryText}</p>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Experience</p>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {job.experience || 'Entry / Any'}
            </p>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-8 bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Job Description</h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {responsibilities.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Key Responsibilities</h2>
              <ul className="space-y-2">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Requirements & Qualifications</h2>
              <ul className="space-y-2">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Required */}
          {skills.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h2 className="text-lg font-bold text-white">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-base">About {companyName}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {job.company?.description || `${companyName} is hiring for open roles on CareerConnect.`}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Industry:</span>
                <span className="font-semibold">{job.company?.industry || job.category?.name || 'Technology'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold">{job.company?.location || location}</span>
              </div>
              {job.company?.website && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Website:</span>
                  <a
                    href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline truncate max-w-[150px]"
                  >
                    {job.company.website}
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className={`w-full py-3 font-bold text-xs rounded-xl shadow-md transition-all mt-4 ${
                hasApplied
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              {hasApplied ? 'Already Applied' : 'Submit Application'}
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal Integration */}
      <ApplyJobModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        job={job}
        existingResume={existingResume}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
}
