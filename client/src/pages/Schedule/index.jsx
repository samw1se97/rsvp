import React from 'react';
import styles from './styles.module.css';
import MapComp from '../../components/MapComp';
import ScheduleItem from '../../components/ScheduleItem';
import Countdown from '../../components/Countdown';
import { MapPin, Martini } from 'lucide-react';

/**
 * @summary
 * Schedule Component
 *
 * @description
 * This component displays the schedule of events for the wedding day, including reception, ceremony, and dinner times.
 * Each event is rendered using the `ScheduleItem` component for a consistent layout. The `MapComp` component is included
 * to provide a map of the event location.
 *
 * @returns {JSX.Element} The schedule section with event details and a map.
 */
function Schedule() {
  return (
    <div className={styles.schedule}>
      <h1>לוח זמנים</h1>
      <p>
        <MapPin /> אחוזת דוד בגלבוע, 25.08.2025
      </p>
      <img src='/branch.webp' alt='branch' className='branch_pic' />
      <Countdown />
      <ScheduleItem title='קבלת פנים' time='18:30' location='אחוזת דוד' />
      <ScheduleItem title='חופה וקידושין' time='19:45' location='חצר האחוזה' />
      <ScheduleItem
        title='ארוחה וריקודים'
        time='20:15'
        location='אולם האחוזה'
      />
      <MapComp />
    </div>
  );
}

export default Schedule;
