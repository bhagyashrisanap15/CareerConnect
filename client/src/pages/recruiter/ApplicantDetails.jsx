import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationStatus from '../../components/common/ApplicationStatus';
import { APPLICATION_STATUSES } from '../../utils/constants';

export default function ApplicantDetails() {
  const { id } = useParams();

  const [applicant, setApplicant] = useState({
    id: id || 'app-1',
    name: 'Bhagyashri Sanap',
    email: 'bhagyashri@example.com',
    phone: '+91 98765 43210',
    location: 'Pune, India',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
    education: 'B.E. Computer Engineering, Pune Institute of Computer Technology (2026)',
    experience: 'Frontend Intern at Tech Solutions Inc. (6 months)',
    appliedFor: 'React Developer',
    appliedDate: '16 Aug 2026',
    status: 'Shortlisted',
    resumeName: 'Bhagyashri_Sanap_Resume.pdf'
  });

  const handleStatusChange = (newStatus) => {
    setApplicant((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Application status updated to ${newStatus}`);
  };

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <Link to="/recruiter/applicants" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Applicants
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
        
        {/* Student Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center font-extrabold text-white text-2xl">
              {applicant.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">{applicant.name}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <span><Mail className="w-3 h-3 inline text-slate-500 mr-1" />{applicant.email}</span>
                <span>•</span>
                <span><Phone className="w-3 h-3 inline text-slate-500 mr-1" />{applicant.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.success(`Opening ${applicant.resumeName}...`)}
              className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" /> View Resume
            </button>
          </div>
        </div>

        {/* Section 1: Candidate Profile Details */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">Student Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Location</p>
              <p className="text-white font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {applicant.location}
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Education</p>
              <p className="text-white font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> {applicant.education}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Work Experience
            </p>
            <p className="text-xs text-slate-200">{applicant.experience}</p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-slate-400 font-bold uppercase text-[10px]">Skills</p>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-800 text-indigo-300 rounded-xl text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Application Details & Update Status */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">Application Details</h2>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-bold">Applied For:</p>
                <p className="text-white font-bold text-sm mt-0.5">{applicant.appliedFor}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Applied Date:</p>
                <p className="text-white font-semibold text-sm mt-0.5">{applicant.appliedDate}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Current Status:</p>
                <div className="mt-1">
                  <ApplicationStatus status={applicant.status} />
                </div>
              </div>
            </div>

            {/* Update Status Dropdown / Action Pills */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-300">Update Candidate Status:</span>
              <div className="flex flex-wrap gap-2">
                {['Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'].map((stat) => (
                  <button
                    key={stat}
                    onClick={() => handleStatusChange(stat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      applicant.status === stat
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900 text-slate-300 border-slate-750 hover:bg-slate-800'
                    }`}
                  >
                    {stat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
