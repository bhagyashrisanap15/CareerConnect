import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <Briefcase className="h-6 w-6 text-indigo-400" />
            <span>CareerConnect</span>
          </div>
          <p className="text-sm">
            Bridging the gap between brilliant minds and stellar companies. Discover your dream career today.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Twitter">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>


        {/* For Candidates */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">For Candidates</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/jobs" className="hover:text-white transition-colors">Explore Jobs</Link></li>
            <li><Link to="/applications" className="hover:text-white transition-colors">My Applications</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">Candidate Profile</Link></li>
            <li><Link to="/companies" className="hover:text-white transition-colors">Browse Companies</Link></li>
          </ul>
        </div>

        {/* For Recruiters */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">For Recruiters</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/recruiter/dashboard" className="hover:text-white transition-colors">Recruiter Dashboard</Link></li>
            <li><Link to="/recruiter/dashboard?tab=post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
            <li><Link to="/recruiter/dashboard?tab=applicants" className="hover:text-white transition-colors">Review Applicants</Link></li>
            <li><Link to="/companies" className="hover:text-white transition-colors">Manage Company</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3 text-sm">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Get in Touch</h3>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-indigo-400" />
            <a href="mailto:support@careerconnect.com" className="hover:text-white transition-colors">support@careerconnect.com</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-indigo-400" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-400" />
            <span>123 Tech Avenue, San Francisco, CA</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <span>&copy; {new Date().getFullYear()} CareerConnect Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
