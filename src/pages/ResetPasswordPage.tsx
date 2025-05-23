import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ResetPasswordPage = () => {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update the logic to parse the URL hash for access_token and type parameters
  const params = new URLSearchParams(location.hash.replace('#', '?'));
  const accessToken = params.get('access_token');
  const type = params.get('type');

  useEffect(() => {
    if (type !== 'recovery' || !accessToken) {
      setMessage('Invalid or expired reset link.');
    }
  }, [type, accessToken]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!newPassword) {
      setMessage('Please enter a new password.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Error updating password:', error);
        setMessage(error.message || 'Failed to reset password. Please try again.');
      } else {
        setMessage('Password updated successfully. You can now log in.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <h1>Reset Password</h1>
      {message && <p>{message}</p>}
      {type === 'recovery' && accessToken && (
        <form onSubmit={handlePasswordReset}>
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
