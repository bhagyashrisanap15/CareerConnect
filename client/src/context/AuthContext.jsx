import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('careerconnect_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('careerconnect_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-3'];
  });

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

  const login = (userData) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  const register = (userData) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('careerconnect_user');
  };

  const updateUser = (updatedData) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : updatedData));
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
        login,
        register,
        logout,
        updateUser,
        savedJobs,
        toggleSaveJob,
        isJobSaved
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
