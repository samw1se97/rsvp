import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Navigator from '../Navigator';
import axios from 'axios';
import { GuestContext } from '../../context/GuestContext';
import { useContext } from 'react';

/**
 * @summary
 * Layout Component
 *
 * @description
 * This component serves as the main layout for the application. It fetches guest data
 * based on the URL parameter (`id`) using an API call and updates the global guest context.
 * The component also includes navigation and dynamically renders child components using React Router's `Outlet`.
 *
 * @returns {JSX.Element} The rendered layout including navigation and dynamic content.
 */
function Layout() {
  // const { guest } = useContext(GuestContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleGuestData } = useContext(GuestContext);

  useEffect(() => {
    if (!id) return;
    else getGuestData();
  }, [id]);

  /**
   * @summary
   * Fetches guest data by ID.
   * @description
   * This asynchronous function makes a GET request to fetch guest information
   * using the provided `id` from the URL. If the data is successfully retrieved,
   * it updates the guest context. In case of an error, it redirects to the not-found route.
   * @async
   * @throws Will log an error message and navigate to a 404 page on failure.
   */
  const getGuestData = async () => {
    try {
      const res = await axios.get(`http://localhost:2025/rsvp/guest/${id}`, {
        id,
      });
      // console.log(res);
      if (res.data) handleGuestData(res.data);
    } catch (err) {
      console.error('error fetching guest by id: ', err);
      navigate('*');
    }
  };

  return (
    <div className={styles.layout}>
      <Navigator />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
