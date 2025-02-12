import React from 'react';
import styles from './styles.module.css';

/**
 * @summary
 * Schedule Item Component
 * @description
 * This component represents an individual event in the wedding schedule,
 * displaying the event type, time, and location. It is reusable for each
 * event in the schedule, such as Reception, Ceremony, and Dinner.
 * @param {Object} props - The properties for this component.
 * @param {string} props.title - The title or type of the event (e.g., "Reception").
 * @param {string} props.time - The time of the event (e.g., "18:30 PM").
 * @param {string} props.location - The location of the event (e.g., "Ahuzat David").
 *
 * @returns {JSX.Element} The rendered schedule item.
 */
function ScheduleItem({ title, time, location }) {
  return (
    <div className={styles.schedBox}>
      <p>
        <span> {title} - </span>
        {time}
      </p>
    </div>
  );
}

export default ScheduleItem;
