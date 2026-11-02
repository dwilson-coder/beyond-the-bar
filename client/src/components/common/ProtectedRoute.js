// src/components/common/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth, dashboardPath } from '../../context/AuthContext';

// Logged-out visitors go to /login; users with the wrong role go to their own dashboard
const ProtectedRoute = ({ role, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="route-loading" role="status">
        <Spinner animation="border" size="sm" /> Loading your account…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role && user.role !== role) return <Navigate to={dashboardPath(user)} replace />;

  return children;
};

export default ProtectedRoute;
