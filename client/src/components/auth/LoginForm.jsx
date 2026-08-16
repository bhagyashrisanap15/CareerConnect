import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { InlineError } from '../common/ErrorMessage';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Setup role-based login simulations
      let mockRole = 'candidate';
      if (email.includes('recruiter')) mockRole = 'recruiter';
      if (email.includes('admin')) mockRole = 'admin';

      const mockUser = {
        id: 'user-123',
        name: email.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        email: email,
        role: mockRole,
        avatar: mockRole === 'recruiter' 
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
          : mockRole === 'admin'
            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
        bio: 'Professional Software Developer',
        skills: ['JavaScript', 'React', 'Node.js', 'Tailwind CSS']
      };

      if (onLogin) onLogin(mockUser);
      
      if (mockUser.role === 'admin') navigate('/admin/dashboard');
      else if (mockUser.role === 'recruiter') navigate('/recruiter/dashboard');
      else navigate('/jobs');
    }, 1000);
  };

  const simulateRole = (role) => {
    setEmail(`${role}@careerconnect.com`);
    setPassword('password123');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-wide">Welcome Back</h2>
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-500 text-center tracking-wider">
            Quick Simulation Mode
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => simulateRole('candidate')}
              className="px-2 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold border border-indigo-500/20 text-center"
            >
              Candidate
            </button>
            <button
              onClick={() => simulateRole('recruiter')}
              className="px-2 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 text-[11px] font-semibold border border-violet-500/20 text-center"
            >
              Recruiter
            </button>
            <button
              onClick={() => simulateRole('admin')}
              className="px-2 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/20 text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-300">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            <InlineError message={errors.email} />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-12 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <InlineError message={errors.password} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
