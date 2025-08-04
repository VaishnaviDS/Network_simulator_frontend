// src/App.jsx
import React from 'react';
import SeedNetworkForm from './components/SeedNetworkForm';
import SendPacketForm from './components/SendPacketForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚦 Network Traffic Simulator</h1>
      <SeedNetworkForm />
      <hr />
      <SendPacketForm />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;
