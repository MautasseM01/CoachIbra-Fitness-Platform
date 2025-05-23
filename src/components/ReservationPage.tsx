import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationPage: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/reservations',
        { service, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Reservation successful!');
      setService('');
      setDate('');
      setTime('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-page">
      <h1>Make a Reservation</h1>
      <form onSubmit={handleReservation}>
        <div>
          <label htmlFor="service">Service:</label>
          <input
            type="text"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Reservation'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ReservationPage;
