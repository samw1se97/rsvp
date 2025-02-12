import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Countdown() {
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    const fetchCountdown = async () => {
      const res = await axios.get('http://127.0.0.1:2025/rsvp/guest/countdown');
      setCountdown(res.data);
    };

    fetchCountdown();
    const interval = setInterval(fetchCountdown, 1000 * 60); // Refresh every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!countdown) return <p>Loading countdown...</p>;

  return (
    <p>
      ,{countdown.days} ימים, {countdown.hours} שעות ו {countdown.minutes} דקות
    </p>
  );
}

export default Countdown;
