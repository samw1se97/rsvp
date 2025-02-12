import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { GuestContext } from '../../context/GuestContext';
import axios from 'axios';
import List from '../../components/List';
import Loader from '../../components/Loader';

/**
 * @component Dashboard
 *
 * @description
 * Displays statistical data for the admin dashboard. The component fetches event-related statistics
 * (e.g., total attending guests, meal preferences, and other metrics) from the server and renders
 * them in a styled HTML table.
 * @returns {JSX.Element} The dashboard containing a statistics table.
 * @state
 * - `stats`: An object representing the fetched statistical data. Initially `null`.
 * @serverEndpoint
 * - `GET http://127.0.0.1:2025/rsvp/admin/dashboard/stats`
 * @errorHandling
 * - Logs errors to the console and displays a fallback error message if the request fails.
 * @exampleOutput
 * | Metric                  | Value |
 * |-------------------------|-------|
 * | Combined Total          | 38    |
 * | Not Responded           | 4     |
 * | Total Attending Guests  | 20    |
 * | Total Quantity          | 18    |
 * | Vegan Guests            | 4     |
 */
function Dashboard() {
  const { guest } = useContext(GuestContext);
  const [stats, setStats] = useState(null);
  const [dispalyList, setDisplayList] = useState('statistics');

  useEffect(() => {
    // console.log(guest);
    const getStats = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:2025/rsvp/admin/dashboard/stats`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );
        const { _id, ...statsData } = res.data.guestsStats[0];
        setStats([statsData]);
      } catch (err) {
        console.error('error fetching Stats: ', err);
        return <p> {err.response.data.data} </p>;
      }
    };

    const getSongList = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:2025/rsvp/guest/?fields=song,name&song[ne]=`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );
        console.log(res.data.data);
        const { _id, ...statsData } = res.data.data;

        setStats(res.data.data);
      } catch (err) {
        console.error('error fetching Stats: ', err);
      }
    };
    dispalyList === 'statistics' ? getStats() : getSongList();
  }, [dispalyList]);
  console.log([stats]);

  const toggleList = () => {
    dispalyList === 'statistics'
      ? setDisplayList('Song List')
      : setDisplayList('statistics');
  };

  if (!stats) {
    return <Loader />; // Display a loading message while waiting for stats
  }

  return (
    <>
      <button onClick={toggleList}>
        Return To
        {dispalyList === 'Song List' ? ' Statistics' : ' Song List'}{' '}
      </button>
      <List list={stats} />
    </>
  );
}

export default Dashboard;
