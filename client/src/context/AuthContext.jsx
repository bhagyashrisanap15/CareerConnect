import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('careerconnect_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('careerconnect_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-3'];
  });

  // Verify authentication state on initial load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await authService.getProfile();
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('careerconnect_user', JSON.stringify(data.user));
          }
        } catch {
          // Token invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('careerconnect_user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('careerconnect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('careerconnect_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('careerconnect_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const login = (data) => {
    // Accepts either { token, user } object from API or user object
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    const userData = data.user || data;
    setUser(userData);
    localStorage.setItem('careerconnect_user', JSON.stringify(userData));
  };

  const register = (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    const userData = data.user || data;
    setUser(userData);
    localStorage.setItem('careerconnect_user', JSON.stringify(userData));
  };

  const signup = register;

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network error on logout
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('careerconnect_user');
    }
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const nextUser = prev ? { ...prev, ...updatedData } : updatedData;
      localStorage.setItem('careerconnect_user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const isJobSaved = (jobId) => savedJobs.includes(jobId);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        signup,
        logout,
        updateUser,
        savedJobs,
        toggleSaveJob,
        isJobSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
