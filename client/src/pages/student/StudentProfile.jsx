import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, Edit, Upload, Eye, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function StudentProfile() {
  const { user } = useAuth();

  // Mock Student Profile matching prompt spec
  const student = {
    name: user?.name || 'Bhagyashri Sanap',
    email: user?.email || 'bhagyashri@example.com',
    phone: user?.phone || '+91 98765 43210',
    location: 'Pune, Maharashtra, India',
    aboutMe: 'Passionate Full Stack Software Engineer skilled in MERN stack, Web API development, responsive UI engineering, and database schema design.',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    education: {
      college: 'Pune Institute of Computer Technology',
      degree: 'B.E. Computer Engineering',
      passingYear: '2026',
      cgpa: '8.8 / 10'
    },
    experience: [
      {
        role: 'Frontend Developer Intern',
        company: 'Tech Solutions Inc.',
        duration: 'Jan 2026 - Present',
        description: 'Built React component libraries, integrated REST endpoints, and optimized page load speed.'
      }
    ],
    resumeName: 'Bhagyashri_Sanap_Resume.pdf'
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Profile Photo & Basic Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center font-extrabold text-white text-3xl shadow-xl">
              {student.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white">{student.name}</h1>
              <p className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {student.location}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {student.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {student.phone}</span>
              </div>
            </div>
          </div>

          <Link
            to="/student/profile/edit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
        </div>

        {/* About Me Section */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">About Me</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{student.aboutMe}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" /> Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {student.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 bg-slate-800 text-indigo-300 border border-slate-700 rounded-xl text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-400" /> Education
        </h2>
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white text-sm">{student.education.college}</h3>
              <p className="text-xs text-indigo-400 font-medium">{student.education.degree}</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">
              Passing: {student.education.passingYear}
            </span>
          </div>
          <p className="text-xs text-emerald-400 font-bold">CGPA: {student.education.cgpa}</p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" /> Work Experience
        </h2>
        {student.experience.map((exp, i) => (
          <div key={i} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-white text-sm">{exp.role}</h3>
              <span className="text-xs text-slate-400">{exp.duration}</span>
            </div>
            <p className="text-xs text-indigo-400 font-medium">{exp.company}</p>
            <p className="text-xs text-slate-300 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Resume Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" /> Resume / CV
        </h2>

        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{student.resumeName}</p>
              <p className="text-[11px] text-slate-400">PDF document • 1.2 MB</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/student/resume"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" /> View Resume
            </Link>
            <Link
              to="/student/resume"
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <Upload className="w-3.5 h-3.5" /> Upload Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
