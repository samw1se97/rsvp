import React from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
function AdminNav() {
  return (
    <nav className={styles.navigator}>
      <ul className={styles.list}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'isActive' : '')}
            to={'/admn'}
            end>
            Add guest
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'isActive' : '')}
            to={'dashboard'}>
            Stats
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;
