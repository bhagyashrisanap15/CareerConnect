import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, User, LogOut, ChevronDown, Bell, Settings, Shield } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false);
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              <Briefcase className="h-6 w-6 text-indigo-400" />
              <span>CareerConnect</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/jobs" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Find Jobs
            </NavLink>
            <NavLink to="/companies" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Companies
            </NavLink>
            
            {user?.role === 'recruiter' && (
              <NavLink to="/recruiter/dashboard" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Recruiter Hub
              </NavLink>
            )}
            
            {user?.role === 'admin' && (
              <NavLink to="/admin/dashboard" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Admin Panel
              </NavLink>
            )}
            
            {user?.role === 'candidate' && (
              <NavLink to="/applications" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                My Applications
              </NavLink>
            )}
          </div>

          {/* Right menu (Auth controls / profile dropdown) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none p-1.5 rounded-full hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border border-slate-700 object-cover"
                  />
                  <span className="text-sm font-medium text-slate-200">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-indigo-500/20 text-indigo-300">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                      >
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Icon */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/jobs" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Find Jobs
            </NavLink>
            <NavLink to="/companies" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Companies
            </NavLink>
            {user?.role === 'recruiter' && (
              <NavLink to="/recruiter/dashboard" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Recruiter Hub
              </NavLink>
            )}
            {user?.role === 'admin' && (
              <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Admin Panel
              </NavLink>
            )}
            {user?.role === 'candidate' && (
              <NavLink to="/applications" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                My Applications
              </NavLink>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-slate-800 px-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md text-rose-400 hover:text-rose-300 hover:bg-slate-800"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
