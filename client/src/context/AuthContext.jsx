import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import studentService from '../services/studentService';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('careerconnect_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  const [savedJobs, setSavedJobs] = useState([]);
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

  // Fetch saved jobs from backend when authenticated student user is present
  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (user && user.role === 'student') {
        try {
          const list = await studentService.getSavedJobs();
          if (Array.isArray(list)) {
            setSavedJobs(list.map((item) => String(item.job?._id || item.job)));
          }
        } catch (err) {
          console.error('Failed to fetch saved jobs from backend:', err);
        }
      } else {
        setSavedJobs([]);
      }
    };

    fetchSavedJobs();
  }, [user]);

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
      setSavedJobs([]);
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

  const toggleSaveJob = async (jobId) => {
    if (!user) {
      toast.error('Please log in as a student to save jobs');
      return;
    }
    if (user.role !== 'student') {
      toast.error('Only student accounts can save jobs');
      return;
    }

    const currentlySaved = isJobSaved(jobId);
    try {
      if (currentlySaved) {
        await studentService.unsaveJob(jobId);
        setSavedJobs((prev) => prev.filter((id) => String(id) !== String(jobId)));
        toast.success('Job removed from saved jobs');
      } else {
        await studentService.saveJob(jobId);
        setSavedJobs((prev) => [...prev, String(jobId)]);
        toast.success('Job saved successfully');
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to update saved job');
    }
  };

  const isJobSaved = (jobId) => savedJobs.some((id) => String(id) === String(jobId));

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
