import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Eye, EyeOff, UserPlus, ArrowRight, Building } from 'lucide-react';
import { InlineError } from '../common/ErrorMessage';

export default function RegisterForm({ onRegister }) {
  const [role, setRole] = useState('candidate'); // 'candidate' | 'recruiter' | 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Full name is required';
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
    if (role === 'recruiter' && !companyName) {
      newErrors.companyName = 'Company name is required for Recruiters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate register API call
    setTimeout(() => {
      setIsLoading(false);
      const mockUser = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        name,
        email,
        role,
        companyName: role === 'recruiter' ? companyName : undefined,
        avatar: role === 'recruiter' 
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
          : role === 'admin'
            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
        bio: 'Professional Software Developer',
        skills: ['JavaScript', 'React', 'Node.js', 'Tailwind CSS']
      };

      if (onRegister) onRegister(mockUser);
      
      if (mockUser.role === 'admin') navigate('/admin/dashboard');
      else if (mockUser.role === 'recruiter') navigate('/recruiter/dashboard');
      else navigate('/jobs');
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-wide">Create an Account</h2>
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Role Selector Buttons */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Select Your Role
          </span>
          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                role === 'candidate'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                role === 'recruiter'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-300">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            <InlineError message={errors.name} />
          </div>

          {/* Email Address */}
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
                placeholder="john@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            <InlineError message={errors.email} />
          </div>

          {/* Company Name (Conditional for Recruiter) */}
          {role === 'recruiter' && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-150">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Company Name
              </label>
              <div className="relative flex items-center">
                <Building className="absolute left-3 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
              <InlineError message={errors.companyName} />
            </div>
          )}

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Password
            </label>
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
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
