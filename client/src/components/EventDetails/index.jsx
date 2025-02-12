import React from 'react';
import styles from './styles.module.css';

/**
 * @summary
 * Event Details Component
 *
 * @description
 * This component displays personalized details about the wedding event for a specific guest.
 * It includes a greeting, event location, date, and a decorative image. The guest's first
 * name is dynamically displayed with proper capitalization for a personalized experience.
 *
 * @param {Object} props - The properties for this component.
 * @param {Object} props.guest - The guest object containing guest details.
 * @param {string} props.guest.name - The full name of the guest.
 *
 * @returns {JSX.Element} The rendered event details section for the guest.
 */
function EventDetails({ guest }) {
  return (
    <div className={styles.EventDetails}>
      <p>
        <b>
          {guest.name.split(' ')[0].charAt(0).toUpperCase() +
            guest.name.split(' ')[0].slice(1)}
        </b>
        , אנחנו לא יכולים לחכות לחלוק איתך את היום המיוחד שלנו!
      </p>
      <p> האירוע ייערך באולמי 'אחוזת דוד' בגלבוע </p>
      <br />
      <p>יום שני, 25 לאוגוסט 2025</p>
      <p>ראש חודש אלול תשפ"ה</p>
      <img src='/branch.webp' alt='branch' className='branch_pic' />
    </div>
  );
}

export default EventDetails;
