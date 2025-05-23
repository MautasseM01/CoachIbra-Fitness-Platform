import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentSession, UserSession } from "../lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "ROLE_ADMIN" | "ROLE_USER";
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentSession = await getCurrentSession();
        setSession(currentSession);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session?.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && session.user?.role !== requiredRole) {
    // Redirect to home if authenticated but doesn't have required role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
