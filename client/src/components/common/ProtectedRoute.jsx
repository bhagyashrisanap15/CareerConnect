import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, user, requiredRole }) {
  const location = useLocation();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If route requires a specific role and the user role doesn't match
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'recruiter') {
      return <Navigate to="/recruiter/dashboard" replace />;
    } else {
      return <Navigate to="/jobs" replace />;
    }
  }

  return children;
}
