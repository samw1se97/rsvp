import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { GuestContext } from '../../context/GuestContext';
import { CalendarCheck, House, Images, Watch } from 'lucide-react';

/**
 * @summary
 * Navigation Component
 *
 * @description
 * This component provides a navigation bar for the wedding website. It displays the
 * event title and links to different sections of the site, including Home, Menu,
 * Schedule, and RSVP. The RSVP link dynamically incorporates the guest's ID from
 * the `GuestContext`.
 *
 * @returns {JSX.Element} The rendered navigation bar with links.
 */
function Navigator() {
  const { guest } = useContext(GuestContext);

  return (
    <div className={styles.navigator}>
      <h1>Adina &Sammy's Wedding</h1>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'isActive' : '')}
              to={'wellcome'}>
              <House />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'isActive' : '')}
              to={'gallery'}>
              <Images />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'isActive' : '')}
              to={'schedule'}>
              <Watch />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'isActive' : '')}
              to={`/${guest._id}`}
              end>
              <CalendarCheck />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigator;
