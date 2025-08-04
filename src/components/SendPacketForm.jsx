// src/components/SendPacketForm.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

const SendPacketForm = () => {
  const [nodes, setNodes] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trafficLoad, setTrafficLoad] = useState(10);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await API.get('/graph');
      setNodes(res.data);
    };
    fetchGraph();
  }, []);

  const sendPacket = async () => {
    try {
      const res = await API.post('/send', { source, destination, trafficLoad });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div>
      <h2>Send Packet</h2>
      <select onChange={e => setSource(e.target.value)} value={source}>
        <option value="">Select Source</option>
        {nodes.map(n => (
          <option key={n.id} value={n.id}>{n.name}</option>
        ))}
      </select>
      <select onChange={e => setDestination(e.target.value)} value={destination}>
        <option value="">Select Destination</option>
        {nodes.map(n => (
          <option key={n.id} value={n.id}>{n.name}</option>
        ))}
      </select>
      <input
        type="number"
        value={trafficLoad}
        onChange={e => setTrafficLoad(Number(e.target.value))}
        min={1}
      />
      <button onClick={sendPacket}>Send</button>
      <p>{message}</p>
    </div>
  );
};

export default SendPacketForm;
