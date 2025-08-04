// src/components/SeedNetworkForm.jsx
import React, { useState } from 'react';
import API from '../api';

const SeedNetworkForm = () => {
  const [nodes, setNodes] = useState('A,B,C,D');
  const [connections, setConnections] = useState('[{"from":"A","to":"B","weight":1}]');
  const [message, setMessage] = useState('');

  const seedNetwork = async () => {
    try {
      const res = await API.post('/seed', {
        nodes: nodes.split(','),
        connections: JSON.parse(connections)
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div>
      <h2>Seed Network</h2>
      <input value={nodes} onChange={e => setNodes(e.target.value)} placeholder="A,B,C,D" />
      <br />
      <textarea value={connections} onChange={e => setConnections(e.target.value)} rows={4} cols={60} />
      <br />
      <button onClick={seedNetwork}>Seed</button>
      <p>{message}</p>
    </div>
  );
};

export default SeedNetworkForm;
