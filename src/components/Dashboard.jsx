// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const Dashboard = () => {
  const [packets, setPackets] = useState([]);
  const [rate, setRate] = useState(0);
  const [linkLoad, setLinkLoad] = useState({});
  const [queueStatus, setQueueStatus] = useState({});

  const fetchData = async () => {
    const [p, r, l, q] = await Promise.all([
      API.get('/packets'),
      API.get('/rate'),
      API.get('/link-load'),
      API.get('/queues')
    ]);
    setPackets(p.data);
    setRate(r.data.packetsPerSecond);
    setLinkLoad(l.data.linkLoad);
    setQueueStatus(q.data.queueStatus);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>📈 Dashboard</h2>
      <p><strong>Packets/sec:</strong> {rate}</p>

      <h3>Link Load:</h3>
      <ul>
        {Object.entries(linkLoad).map(([link, count]) => (
          <li key={link}>{link}: {count}</li>
        ))}
      </ul>

      <h3>Queue Status:</h3>
      <ul>
        {Object.entries(queueStatus).map(([node, count]) => (
          <li key={node}>{node}: {count} packets</li>
        ))}
      </ul>

      <h3>Recent Packets:</h3>
      <ul>
        {packets.slice(0, 5).map(p => (
          <li key={p._id}>
            {p.source?.name} → {p.destination?.name} | Load: {p.trafficLoad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
