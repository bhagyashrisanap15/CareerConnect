import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import JobSearch from './components/jobs/JobSearch';
import JobFilters from './components/jobs/JobFilters';
import JobList from './components/jobs/JobList';
import JobDetails from './components/jobs/JobDetails';
import ApplyJobModal from './components/jobs/ApplyJobModal';
import ProfileHeader from './components/profile/ProfileHeader';
import ProfileForm from './components/profile/ProfileForm';
import SkillsInput from './components/profile/SkillsInput';
import EducationForm from './components/profile/EducationForm';
import ResumeUpload from './components/profile/ResumeUpload';
import ApplicationTable from './components/applications/ApplicationTable';
import RecruiterSidebar from './components/recruiter/RecruiterSidebar';
import ApplicantTable from './components/recruiter/ApplicantTable';
import JobForm from './components/recruiter/JobForm';
import AdminSidebar from './components/admin/AdminSidebar';
import StatsCard from './components/admin/StatsCard';
import UserTable from './components/admin/UserTable';
import JobTable from './components/admin/JobTable';
import CompanyTable from './components/admin/CompanyTable';
import AdminAppTable from './components/admin/ApplicationTable';
import ProtectedRoute from './components/common/ProtectedRoute';
import CompanyCard from './components/company/CompanyCard';
import CompanyProfile from './components/company/CompanyProfile';
import { Users, FileText, Building, History, Check } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Seed Data: Jobs
  const [jobs, setJobs] = useState([
    {
      id: 'job-1',
      title: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '$140,000 - $180,000',
      type: 'Full-time',
      posted: '1 day ago',
      description: 'We are seeking an experienced React Developer to build the next generation of serverless frontend components and tools. You will lead UI engineering initiatives.',
      requirements: ['5+ years React/Next.js experience', 'Deep knowledge of TypeScript & Tailwind', 'Experience with frontend core performances.'],
      responsibilities: ['Write server-rendered react features', 'Improve client bundling metrics', 'Deliver accessible widgets.']
    },
    {
      id: 'job-2',
      title: 'Full Stack Engineer',
      company: 'Stripe',
      location: 'Remote',
      salary: '$130,000 - $160,000',
      type: 'Remote',
      posted: '3 days ago',
      description: 'Help build Stripe Billing APIs and billing dashboards. You will work on robust backend integrations and fast React-driven flows.',
      requirements: ['Experience with Node.js & Ruby/Python', 'Proficiency in frontend React frameworks', 'High focus on data precision.'],
      responsibilities: ['Scale robust transactional systems', 'Contribute to payment dashboards', 'Participate in api design reviews.']
    },
    {
      id: 'job-3',
      title: 'Product Design Lead',
      company: 'Linear',
      location: 'New York, NY',
      salary: '$150,500 - $190,000',
      type: 'Full-time',
      posted: '4 days ago',
      description: 'Own user experiences and design layouts. We need a designer who codes and builds elegant, minimalist web tools.',
      requirements: ['Stunning design portfolio', 'CSS and design token configurations', 'Framer motion/animation skills.'],
      responsibilities: ['Design interface blueprints', 'Construct responsive web animations', 'Iterate user test feedback loops.']
    }
  ]);

  // Seed Data: Companies
  const [companies, setCompanies] = useState([
    {
      id: 'company-1',
      name: 'Vercel',
      location: 'San Francisco, CA',
      industry: 'Software Tools',
      website: 'https://vercel.com',
      size: '501+ employees',
      logo: '',
      isVerified: true,
      description: 'Vercel provides developers with tools and infrastructure to build fast web applications.'
    },
    {
      id: 'company-2',
      name: 'Stripe',
      location: 'San Francisco, CA',
      industry: 'Fintech / Payments',
      website: 'https://stripe.com',
      size: '501+ employees',
      logo: '',
      isVerified: true,
      description: 'Stripe is an API-first financial infrastructure network for international commerce.'
    }
  ]);

  // Seed Data: Applicants (Recruiter perspective)
  const [applicants, setApplicants] = useState([
    {
      id: 'appl-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 432-8765',
      jobTitle: 'Senior React Developer',
      matchingScore: 92,
      skills: ['React', 'TypeScript', 'Next.js'],
      status: 'pending',
      resumeName: 'john_doe_resume.pdf'
    },
    {
      id: 'appl-2',
      name: 'Jane Miller',
      email: 'jane.m@example.com',
      phone: '+1 (555) 890-1234',
      jobTitle: 'Product Design Lead',
      matchingScore: 88,
      skills: ['Figma', 'CSS Grid', 'Tailwind'],
      status: 'pending',
      resumeName: 'jane_miller_portfolio.pdf'
    }
  ]);

  // Seed Data: Applications (Candidate perspective)
  const [myApplications, setMyApplications] = useState([
    {
      id: 'my-appl-1',
      jobTitle: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '$140,000 - $180,000',
      status: 'pending',
      appliedDate: '2 days ago',
      resumeName: 'my_resume.pdf'
    }
  ]);

  // Seed Data: System Users (Admin perspective)
  const [usersList, setUsersList] = useState([
    { id: 'u-1', name: 'John Doe', email: 'john@example.com', role: 'candidate', isBlocked: false },
    { id: 'u-2', name: 'Alisa Recruiter', email: 'recruiter@careerconnect.com', role: 'recruiter', isBlocked: false },
    { id: 'u-3', name: 'Admin Root', email: 'admin@careerconnect.com', role: 'admin', isBlocked: false }
  ]);

  // Routing and Selection state helpers
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [recruiterTab, setRecruiterTab] = useState('overview');
  const [adminTab, setAdminTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Authentication Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    toast.success(`Signed in as ${user.name} (${user.role})`);
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    toast.success(`Account registered successfully!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedJob(null);
    setSelectedCompany(null);
    toast.success('Logged out successfully');
  };

  // Recruiter Dashboard Handler
  const handleStatusChange = (appId, newStatus) => {
    setApplicants(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    toast.success(`Applicant status updated to ${newStatus}`);
  };

  const handlePostJob = (newJob) => {
    const jobNode = {
      id: `job-${Date.now()}`,
      ...newJob,
      posted: 'Just now'
    };
    setJobs(prev => [jobNode, ...prev]);
    toast.success('Job published successfully!');
    setRecruiterTab('jobs');
  };

  // Admin Controls Handler
  const handleBlockUser = (userId) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u));
    const user = usersList.find(u => u.id === userId);
    toast.success(`${user.name} is now ${user.isBlocked ? 'unblocked' : 'blocked'}`);
  };

  const handleDeleteUser = (userId) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
    toast.success('User removed from database');
  };

  // Job Search / Filter Logic
  const handleSearch = ({ query, location }) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLoc = job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesQuery && matchesLoc;
  });

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' } }} />
        
        {/* Navigation Bar */}
        <Navbar user={currentUser} onLogout={handleLogout} />

        {/* Main Application Container */}
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Routes>
            
            {/* Landing page showing Job Search */}
            <Route path="/" element={
              selectedJob ? (
                <JobDetails
                  job={selectedJob}
                  onBack={() => setSelectedJob(null)}
                  onApply={() => {
                    if (!currentUser) {
                      toast.error('You must sign in to apply');
                    } else {
                      setIsApplyOpen(true);
                    }
                  }}
                  user={currentUser}
                />
              ) : (
                <div className="space-y-6">
                  <JobSearch onSearch={handleSearch} totalJobs={filteredJobs.length} />
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                      <JobFilters onFilterChange={(f) => console.log('Filters:', f)} />
                    </div>
                    <div className="lg:col-span-3">
                      <JobList jobs={filteredJobs} onJobClick={(j) => setSelectedJob(j)} />
                    </div>
                  </div>

                  <ApplyJobModal
                    isOpen={isApplyOpen}
                    onClose={() => setIsApplyOpen(false)}
                    job={selectedJob}
                    onSubmit={(app) => {
                      setMyApplications(prev => [
                        {
                          id: `my-appl-${Date.now()}`,
                          jobTitle: selectedJob.title,
                          company: selectedJob.company,
                          location: selectedJob.location,
                          salary: selectedJob.salary,
                          status: 'pending',
                          appliedDate: 'Just now',
                          resumeName: app.resume.name
                        },
                        ...prev
                      ]);
                    }}
                  />
                </div>
              )
            } />

            {/* Jobs View (Aliases Landing page search) */}
            <Route path="/jobs" element={<Navigate to="/" replace />} />

            {/* Browse Companies */}
            <Route path="/companies" element={
              selectedCompany ? (
                <CompanyProfile
                  company={selectedCompany}
                  activeJobs={jobs.filter(j => j.company.toLowerCase() === selectedCompany.name.toLowerCase())}
                  onBack={() => setSelectedCompany(null)}
                  onJobClick={(j) => {
                    setSelectedJob(j);
                    setSelectedCompany(null);
                  }}
                />
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">Top-Tier Companies hiring now</h2>
                    <p className="text-sm text-slate-400 mt-2">Discover workplaces matching your professional criteria.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {companies.map(c => (
                      <CompanyCard key={c.id} company={c} onClick={() => setSelectedCompany(c)} />
                    ))}
                  </div>
                </div>
              )
            } />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />

            {/* Protected Candidate Profile */}
            <Route path="/profile" element={
              <ProtectedRoute user={currentUser}>
                <div className="space-y-6 max-w-4xl mx-auto">
                  <ProfileHeader user={currentUser} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <ProfileForm user={currentUser} onSave={(data) => toast.success('Profile saved!')} />
                      <EducationForm />
                    </div>
                    <div className="space-y-6">
                      <SkillsInput initialSkills={currentUser?.skills || []} />
                      <ResumeUpload />
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Protected Candidate Applications */}
            <Route path="/applications" element={
              <ProtectedRoute user={currentUser} requiredRole="candidate">
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white">My Submitted Applications</h2>
                    <p className="text-xs text-slate-450 mt-1">Track the screening progression of roles you applied to.</p>
                  </div>
                  <ApplicationTable
                    applications={myApplications}
                    onCancel={(id) => {
                      setMyApplications(prev => prev.filter(a => a.id !== id));
                      toast.success('Application withdrawn successfully');
                    }}
                  />
                </div>
              </ProtectedRoute>
            } />

            {/* Protected Recruiter Dashboard */}
            <Route path="/recruiter/dashboard" element={
              <ProtectedRoute user={currentUser} requiredRole="recruiter">
                <div className="flex flex-col md:flex-row gap-8">
                  <RecruiterSidebar activeTab={recruiterTab} onTabChange={(t) => setRecruiterTab(t)} />
                  <div className="flex-1 space-y-6">
                    
                    {recruiterTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <StatsCard title="Open Positions" value={jobs.length} change="+1" icon={FileText} />
                          <StatsCard title="Applicants Screened" value={applicants.length} change="+4" icon={Users} />
                          <StatsCard title="Interviews Booked" value="1" change="0%" icon={History} />
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                          <h4 className="font-bold text-white text-sm uppercase tracking-wide">Active Applicants</h4>
                          <ApplicantTable applicants={applicants} onStatusChange={handleStatusChange} />
                        </div>
                      </div>
                    )}

                    {recruiterTab === 'jobs' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">Manage Published Openings</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {jobs.map(j => (
                            <div key={j.id} className="relative group bg-slate-900/60 border border-slate-850 p-5 rounded-2xl">
                              <h5 className="font-semibold text-white">{j.title}</h5>
                              <p className="text-xs text-slate-450 mt-1">{j.location} • {j.type}</p>
                              <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">{j.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {recruiterTab === 'applicants' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">Recent Candidate Submissions</h4>
                        <ApplicantTable applicants={applicants} onStatusChange={handleStatusChange} />
                      </div>
                    )}

                    {recruiterTab === 'post-job' && (
                      <JobForm onSubmit={handlePostJob} />
                    )}

                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Protected Admin Console */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute user={currentUser} requiredRole="admin">
                <div className="flex flex-col md:flex-row gap-8">
                  <AdminSidebar activeTab={adminTab} onTabChange={(t) => setAdminTab(t)} />
                  <div className="flex-1 space-y-6">
                    
                    {adminTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <StatsCard title="Total Users" value={usersList.length} change="+12%" icon={Users} />
                          <StatsCard title="Job Postings" value={jobs.length} change="+4%" icon={FileText} />
                          <StatsCard title="Registered Companies" value={companies.length} change="+2%" icon={Building} />
                          <StatsCard title="Total Applications" value={myApplications.length + applicants.length} change="+8%" icon={History} />
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                          <h4 className="font-bold text-white text-sm uppercase tracking-wide">System Accounts Moderation</h4>
                          <UserTable users={usersList} onBlockUser={handleBlockUser} onDeleteUser={handleDeleteUser} />
                        </div>
                      </div>
                    )}

                    {adminTab === 'users' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">Database Accounts</h4>
                        <UserTable users={usersList} onBlockUser={handleBlockUser} onDeleteUser={handleDeleteUser} />
                      </div>
                    )}

                    {adminTab === 'jobs' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">System-wide Active Postings</h4>
                        <JobTable jobs={jobs} onDeleteJob={(id) => {
                          setJobs(prev => prev.filter(j => j.id !== id));
                          toast.success('Posting deleted by administrator');
                        }} />
                      </div>
                    )}

                    {adminTab === 'companies' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">Registered Company Moderation</h4>
                        <CompanyTable companies={companies} onApproveCompany={(id) => {
                          setCompanies(prev => prev.map(c => c.id === id ? { ...c, isVerified: true } : c));
                          toast.success('Company verified');
                        }} onDeleteCompany={(id) => {
                          setCompanies(prev => prev.filter(c => c.id !== id));
                          toast.success('Company registration removed');
                        }} />
                      </div>
                    )}

                    {adminTab === 'applications' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">Global Application History Logs</h4>
                        <AdminAppTable
                          applications={applicants.map(a => ({
                            id: a.id,
                            candidateName: a.name,
                            candidateEmail: a.email,
                            jobTitle: a.jobTitle,
                            company: 'MockCompany',
                            appliedDate: '1 day ago',
                            status: a.status
                          }))}
                          onUpdateStatus={(id, status) => {
                            setApplicants(prev => prev.map(a => a.id === id ? { ...a, status } : a));
                            toast.success(`Application updated to ${status}`);
                          }}
                        />
                      </div>
                    )}

                  </div>
                </div>
              </ProtectedRoute>
            } />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
