import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Mail, Lock, LogIn, UserCheck, Shield, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const data = await authService.login({ email: email.trim(), password });
      login(data);
      toast.success(data.message || `Welcome back, ${data.user.name}!`);

      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (data.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (data.user.role === 'recruiter') {
        navigate('/recruiter/dashboard', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (roleType) => {
    setLoading(true);
    const demoCredentials = {
      student: { email: 'student@example.com', password: 'Password123!', name: 'Demo Student' },
      recruiter: { email: 'recruiter@example.com', password: 'Password123!', name: 'Demo Recruiter', companyName: 'Apex Corp' },
      admin: { email: 'admin@example.com', password: 'Password123!', name: 'Demo Admin' },
    };

    const creds = demoCredentials[roleType];
    setEmail(creds.email);
    setPassword(creds.password);

    try {
      let data;
      try {
        data = await authService.login({ email: creds.email, password: creds.password });
      } catch {
        // If demo user does not exist in DB yet, attempt to register automatically
        data = await authService.register({
          name: creds.name,
          email: creds.email,
          password: creds.password,
          role: roleType,
          companyName: creds.companyName,
        });
      }

      login(data);
      toast.success(`Logged in as Demo ${roleType.toUpperCase()}`);

      if (roleType === 'admin') navigate('/admin/dashboard', { replace: true });
      else if (roleType === 'recruiter') navigate('/recruiter/dashboard', { replace: true });
      else navigate('/student/dashboard', { replace: true });
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Quick login failed');
    } finally {
      setLoading(false);
    }
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
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </>
            )}
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
              disabled={loading}
              onClick={() => handleQuickLogin('student')}
              className="px-2 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Student
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('recruiter')}
              className="px-2 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
            >
              <Building2 className="w-3.5 h-3.5 text-violet-400" />
              Recruiter
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('admin')}
              className="px-2 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
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