import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import StudentLayout from './layouts/StudentLayout';
import RecruiterLayout from './layouts/RecruiterLayout';
import AdminLayout from './layouts/AdminLayout';

// Common / Auth Guard
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Jobs from './pages/public/Jobs';
import JobDetails from './pages/public/JobDetails';
import Companies from './pages/public/Companies';
import CompanyDetails from './pages/public/CompanyDetails';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import EditProfile from './pages/student/EditProfile';
import MyApplications from './pages/student/MyApplications';
import ApplicationDetails from './pages/student/ApplicationDetails';
import SavedJobs from './pages/student/SavedJobs';
import Resume from './pages/student/Resume';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterProfile from './pages/recruiter/RecruiterProfile';
import CompanyProfile from './pages/recruiter/CompanyProfile';
import CreateJob from './pages/recruiter/CreateJob';
import EditJob from './pages/recruiter/EditJob';
import MyJobs from './pages/recruiter/MyJobs';
import Applicants from './pages/recruiter/Applicants';
import ApplicantDetails from './pages/recruiter/ApplicantDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageJobs from './pages/admin/ManageJobs';
import ManageCompanies from './pages/admin/ManageCompanies';
import ManageCategories from './pages/admin/ManageCategories';
import ManageApplications from './pages/admin/ManageApplications';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              border: '1px solid #1e293b',
              borderRadius: '0.75rem',
              fontSize: '0.85rem'
            }
          }}
        />
        <Routes>
          
          {/* Public Routes under MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Quick Navigation Aliases */}
            <Route path="/profile" element={<Navigate to="/student/profile" replace />} />
            <Route path="/applications" element={<Navigate to="/student/applications" replace />} />
          </Route>

          {/* Student Routes under StudentLayout */}
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="applications/:id" element={<ApplicationDetails />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="resume" element={<Resume />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Recruiter Routes under RecruiterLayout */}
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute requiredRole="recruiter">
                <RecruiterLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="profile" element={<RecruiterProfile />} />
            <Route path="company" element={<CompanyProfile />} />
            <Route path="jobs" element={<MyJobs />} />
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="jobs/edit/:id" element={<EditJob />} />
            <Route path="jobs/:jobId/applicants" element={<Applicants />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="applicants/:id" element={<ApplicantDetails />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin Routes under AdminLayout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="companies" element={<ManageCompanies />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="applications" element={<ManageApplications />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Fallback wildcard route */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
