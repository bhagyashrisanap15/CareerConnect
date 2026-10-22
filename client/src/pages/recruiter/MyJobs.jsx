import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Users,
  Edit,
  Eye,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Search,
  MapPin,
  RefreshCw,
  Loader2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { jobService } from '../../services/jobService';

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await jobService.getRecruiterJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load recruiter jobs:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to load your posted jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const toggleJobStatus = async (job) => {
    const currentStatus = (job.status || 'active').toLowerCase();
    const nextStatus = currentStatus === 'active' ? 'closed' : 'active';
    setActionLoadingId(job._id);

    try {
      await jobService.updateJob(job._id, { status: nextStatus });
      setJobs((prev) =>
        prev.map((j) => (j._id === job._id ? { ...j, status: nextStatus } : j))
      );
      toast.success(`Job marked as ${nextStatus === 'active' ? 'Active' : 'Closed'}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to update job status');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteJob = async (jobId, jobTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${jobTitle}"? This cannot be undone.`)) {
      return;
    }

    setActionLoadingId(jobId);
    try {
      await jobService.deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
      toast.success('Job posting deleted successfully');
    } catch (err) {
      console.error('Failed to delete job:', err);
      toast.error(typeof err === 'string' ? err : 'Failed to delete job');
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const companyMatch = (job.company?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = (job.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = titleMatch || companyMatch || locationMatch;

    if (statusFilter === 'all') return matchesSearch;
    const currentStatus = (job.status || 'active').toLowerCase();
    return matchesSearch && currentStatus === statusFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-violet-400" />
            <span>My Jobs</span>
            {!isLoading && (
              <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2.5 py-0.5 rounded-full border border-slate-700">
                {jobs.length} total
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your open and closed job postings, track applicant counts in real-time, and update listings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchJobs}
            disabled={isLoading}
            className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 disabled:opacity-50"
            title="Refresh jobs"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/recruiter/jobs/create"
            className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-violet-600/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Job</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-violet-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({jobs.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'active'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active ({jobs.filter((j) => (j.status || 'active').toLowerCase() === 'active').length})
          </button>
          <button
            onClick={() => setStatusFilter('closed')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'closed'
                ? 'bg-slate-700 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Closed ({jobs.filter((j) => (j.status || '').toLowerCase() === 'closed').length})
          </button>
        </div>
      </div>

      {/* Table & Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            <p className="text-xs text-slate-400">Loading your job postings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 sm:p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-700">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {jobs.length === 0 ? 'No job postings yet' : 'No matching jobs found'}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                {jobs.length === 0
                  ? 'Publish your first job opening to start receiving candidates and resume submissions.'
                  : 'Try adjusting your search criteria or filter to find the job you are looking for.'}
              </p>
            </div>
            {jobs.length === 0 && (
              <Link
                to="/recruiter/jobs/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-600/20 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Your First Job</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Job Title & Details</th>
                  <th className="p-4 text-center">Applicants</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredJobs.map((job) => {
                  const isActive = (job.status || 'active').toLowerCase() === 'active';
                  const isActionLoading = actionLoadingId === job._id;
                  const formattedDate = job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    : 'Recent';

                  return (
                    <tr key={job._id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-bold text-white text-sm hover:text-violet-300 transition-colors">
                            {job.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                            {job.company?.name && (
                              <span className="font-medium text-slate-300">
                                {job.company.name}
                              </span>
                            )}
                            {job.location && (
                              <span className="flex items-center gap-0.5 text-slate-400">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                {job.location}
                              </span>
                            )}
                            <span className="capitalize px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 text-[10px]">
                              {job.employmentType || job.type || 'Full Time'}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <Calendar className="w-3 h-3" />
                              Created {formattedDate}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <Link
                          to={`/recruiter/jobs/${job._id}/applicants`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-600/10 text-violet-400 border border-violet-500/30 rounded-full font-bold hover:bg-violet-600/20 transition-all group"
                          title="View applicants"
                        >
                          <Users className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          <span>{job.applicantsCount || 0}</span>
                        </Link>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                            }`}
                          />
                          {isActive ? 'Active' : 'Closed'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Applicants */}
                          <Link
                            to={`/recruiter/jobs/${job._id}/applicants`}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 hover:text-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700/60 transition-colors"
                            title="Review applicant candidates"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Applicants</span>
                          </Link>

                          {/* Edit Job */}
                          <Link
                            to={`/recruiter/jobs/edit/${job._id}`}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-violet-300 hover:text-violet-200 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700/60 transition-colors"
                            title="Edit job posting"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </Link>

                          {/* Toggle Status */}
                          <button
                            onClick={() => toggleJobStatus(job)}
                            disabled={isActionLoading}
                            title={isActive ? 'Deactivate / Close job' : 'Activate / Re-open job'}
                            className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg border border-slate-700/60 transition-colors disabled:opacity-50"
                          >
                            {isActionLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                            ) : isActive ? (
                              <ToggleRight className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-slate-500" />
                            )}
                          </button>

                          {/* Delete Job */}
                          <button
                            onClick={() => handleDeleteJob(job._id, job.title)}
                            disabled={isActionLoading}
                            title="Delete job posting"
                            className="p-1.5 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700/60 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
