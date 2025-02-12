import React, { useContext } from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import { GuestContext } from '../../context/GuestContext';

/**
 * @summary
 * Home Page Component
 * @description
 * This component renders the home page of the wedding website. It displays an image banner
 * and event details, including the wedding date. It also includes a link to the RSVP page
 * for the specific guest, using the `guest._id` from the `GuestContext` to dynamically
 * create the URL.
 * @returns {JSX.Element} The rendered home page with images and event information.
 */
function Home() {
  const { guest } = useContext(GuestContext);

  return (
    <>
      {/* <div className={styles.home_pg}> */}
      <div className={styles.img_container}>
        {/* <img src='/save_the_date5.jpg' className={styles.hme_pic} /> */}
      </div>
      <img src='/branch.webp' alt='branch' className={styles.branch_pic} />
      <img
        src='/invitation.png'
        alt='תמונה של ההזמנה'
        className={styles.invi_pic}
      />

      <div className={styles.btm_hme_pg}>
        <h2>Monday, August 25, 2025</h2>

        <NavLink
          className={({ isActive }) => (isActive ? `${styles.isActive}` : '')}
          to={`/${guest._id}`}>
          RSVD
        </NavLink>
      </div>
    </>
  );
}

export default Home;
