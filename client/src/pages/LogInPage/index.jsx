import React, { useContext, useEffect, useState } from 'react';
import { GuestContext } from '../../context/GuestContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * @summary
 * Admin Login Page Component
 * @description
 * This component provides a login form for the admin to authenticate. It collects the
 * email and password, sends a request to the backend, and stores the authentication
 * token in local storage upon successful login. If authentication fails, an error is logged.
 *
 * @returns {JSX.Element} The login form for the admin authentication.
 */

function LogInPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // useEffect(() => {
  //   console.log(localStorage.getItem('adminToken'));
  //   if (localStorage.getItem('adminToken')) {
  //     navigate('/admn');
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    getAdmin();
  };

  /**
   * @summary
   * Handles admin authentication.
   * @description
   * Sends the admin's login credentials to the server for authentication.
   * If successful, stores the authentication token in local storage and
   * navigates to the admin dashboard. If authentication fails, logs an error message.
   * @async
   * @function getAdmin
   * @serverEndpoint
   * - `POST http://localhost:2025/rsvp/admin/lgn`
   * - `req.body` credentials
   * @throws {Error} Logs an error message if the authentication request fails.
   */
  const getAdmin = async () => {
    console.log(credentials.email, credentials.password);
    if (!credentials.email.includes('@')) return;

    try {
      const res = await axios.post(`http://localhost:2025/rsvp/admin/lgn`, {
        ...credentials,
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admn');
    } catch (err) {
      const { data } = err.response;
      console.error('error fetching Admin: ', data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label> user name </label>{' '}
      <input
        type='email'
        name='email'
        value={credentials.userName}
        onChange={handleChange}
      />
      <label> password</label>{' '}
      <input
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleChange}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default LogInPage;
