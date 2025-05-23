import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-page">
      {user.role === 'ROLE_ADMIN' ? (
        <div>
          <h1>Welcome, Admin</h1>
          <ul>
            <li><a href="/admin/users">Manage Users</a></li>
            <li><a href="/admin/settings">Admin Settings</a></li>
          </ul>
        </div>
      ) : (
        <div>
          <h1>Welcome, {user.firstName}</h1>
          <ul>
            <li><a href="/profile">View Profile</a></li>
            <li><a href="/settings">User Settings</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
