import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, User, LogOut, ChevronDown, Shield, LayoutDashboard, Bookmark, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ user: propUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user: authUser, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const user = propUser || authUser;

  const handleLogout = () => {
    setDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      authLogout();
    }
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'recruiter') return '/recruiter/dashboard';
    return '/student/dashboard';
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <span>CareerConnect</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/jobs" className={({ isActive }) => `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Jobs
              </NavLink>
              <NavLink to="/companies" className={({ isActive }) => `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Companies
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Contact
              </NavLink>
            </div>
          </div>

          {/* Right menu (Auth controls / profile dropdown) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 focus:outline-none p-1.5 pr-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-800">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {user.role || 'student'}
                      </span>
                    </div>

                    <Link
                      to={getDashboardPath()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-indigo-400" />
                      Dashboard
                    </Link>

                    {user.role === 'student' && (
                      <>
                        <Link
                          to="/student/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <User className="h-4 w-4 text-indigo-400" />
                          My Profile
                        </Link>
                        <Link
                          to="/student/applications"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <FileText className="h-4 w-4 text-indigo-400" />
                          My Applications
                        </Link>
                        <Link
                          to="/student/saved-jobs"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Bookmark className="h-4 w-4 text-indigo-400" />
                          Saved Jobs
                        </Link>
                      </>
                    )}

                    {user.role === 'recruiter' && (
                      <Link
                        to="/recruiter/company"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <Briefcase className="h-4 w-4 text-indigo-400" />
                        Company Profile
                      </Link>
                    )}

                    {user.role === 'admin' && (
                      <Link
                        to="/admin/users"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <Shield className="h-4 w-4 text-indigo-400" />
                        Manage Users
                      </Link>
                    )}

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left font-medium"
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
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/jobs" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Jobs
            </NavLink>
            <NavLink to="/companies" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Companies
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
              Contact
            </NavLink>
            {user && (
              <NavLink to={getDashboardPath()} onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-base font-medium ${isActive ? 'text-indigo-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>
                Dashboard ({user.role})
              </NavLink>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-slate-800 px-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-slate-800"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
