import React, { useEffect, useState } from 'react';
import { fetchTrafficRate } from '../api';

const StatsCards = () => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    fetchTrafficRate().then(res => setRate(res.data.rate)).catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-100 p-4 rounded shadow">Traffic Rate: {rate.toFixed(2)} packets/sec</div>
    </div>
  );
};

export default StatsCards;
