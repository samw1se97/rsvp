import React, { useContext, useEffect } from 'react';
import styles from './styles.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import axios from 'axios';
import { GuestContext } from '../../context/GuestContext';

/**
 * @component AdminLayout
 *
 * @description
 * A layout component designed for the admin section of the application.
 * It includes a navigation bar and serves as a wrapper for nested routes using React Router's `<Outlet>` component.
 *
 * @returns {JSX.Element} The layout structure for admin pages.
 *
 * @example
 * // Example usage in a React Router setup:
 * <Route path="/admin" element={<AdminLayout />}>
 *   <Route path='add-one' element={<AddGuest />} />
 *   <Route path='dashboard' element={<Dashboard />} />
 * </Route>
 *
 * @see https://reactrouter.com/en/main/components/outlet
 *
 * @childComponent
 * - `<AdminNav>`: The navigation bar for admin pages.
 * - `<Outlet>`: React Router component to render child routes.
 */
function AdminLayout() {
  const { handleGuestData } = useContext(GuestContext);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * @summary
     * Fetches admin data on component mount.
     * @description
     * This effect runs once when the component mounts. It retrieves admin data from
     * the backend using the stored authentication token. If successful, the response
     * is logged, and the data is passed to `handleGuestData`. If the request fails,
     * the error response is logged to the console.
     *
     * @effect Fetches admin details using the stored token and updates the state.
     * @throws {Error} Logs the error response if the request fails.
     */
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`http://localhost:2025/rsvp/admin`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        console.log(res.data?.adminData);
        handleGuestData(res.data);
      } catch (err) {
        console.error(err.response);

        if (err.response.statusText === 'Unauthorized') {
          console.log('fvsdfsrfgerw');

          // navigate('/admn-lgn');
        }
      }
    };
    fetchAdminData();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <AdminNav />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
