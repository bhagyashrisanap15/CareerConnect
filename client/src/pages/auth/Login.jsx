import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, LogIn, Sparkles, UserCheck, Shield, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock Login handling
    let role = 'student';
    let name = email.split('@')[0] || 'User';

    if (email.includes('recruiter')) {
      role = 'recruiter';
    } else if (email.includes('admin')) {
      role = 'admin';
    }

    const mockUser = {
      id: `user-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email,
      role: role
    };

    setTimeout(() => {
      login(mockUser);
      toast.success(`Welcome back, ${mockUser.name}!`);
      setLoading(false);

      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'recruiter') navigate('/recruiter/dashboard');
      else navigate('/student/dashboard');
    }, 400);
  };

  const handleQuickLogin = (roleType) => {
    let mockUser = {
      id: `demo-${roleType}`,
      name: roleType === 'admin' ? 'System Admin' : roleType === 'recruiter' ? 'Recruiter User' : 'Bhagyashri Sanap',
      email: `${roleType}@careerconnect.com`,
      role: roleType
    };

    login(mockUser);
    toast.success(`Logged in as Demo ${roleType.toUpperCase()}`);
    if (roleType === 'admin') navigate('/admin/dashboard');
    else if (roleType === 'recruiter') navigate('/recruiter/dashboard');
    else navigate('/student/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Logo & Heading */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight text-white">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Briefcase className="h-6 w-6" />
            </div>
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              CareerConnect
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to access your dashboard, jobs, and applications</p>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-indigo-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Signing in...' : 'Login'}</span>
          </button>
        </form>

        {/* Quick Demo Login Buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-[11px] text-center text-slate-500 uppercase font-bold tracking-wider mb-2">
            Quick Demo Persona Sign In
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('student')}
              className="px-2 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('recruiter')}
              className="px-2 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-violet-400" />
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Admin
            </button>
          </div>
        </div>

        {/* Create Account Link */}
        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}