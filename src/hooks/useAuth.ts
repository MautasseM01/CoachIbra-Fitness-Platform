import { useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: userData.id,
          firstName: userData.firstName,
          role: userData.role,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, logout };
};
