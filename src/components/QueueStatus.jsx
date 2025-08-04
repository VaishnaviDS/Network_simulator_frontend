import React, { useEffect, useState } from 'react';
import { fetchQueueStatus } from '../api';

const QueueStatus = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetchQueueStatus().then(res => setQueue(res.data)).catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Queue Status</h2>
      <ul>
        {queue.map(item => (
          <li key={item.nodeId}>
            {item.nodeName} - {item.queueLength} packets
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueStatus;
