import React from 'react';
import StatsCards from './components/StatsCards';
import NetworkGraph from './components/NetworkGraph';
import LinkLoadChart from './components/LinkLoadChart';
import QueueStatus from './components/QueueStatus';
import SendPacket from './components/SendPacket';
import NodeTrafficLoad from './components/NodeTrafficLoad';
import './App.css'; // Add this line

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>🌐 Network Traffic Simulation</h1>
        <p>Monitor, visualize and simulate packet traffic in real-time</p>
      </header>

      <section className="section">
        <StatsCards />
      </section>

      <section className="section two-column">
        <div className="card">
          <h2>Network Topology</h2>
          <NetworkGraph />
        </div>
        <div className="card">
          <h2>Node Queue Status</h2>
          <QueueStatus />
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Link Load Chart</h2>
          <LinkLoadChart />
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Send Packet</h2>
          <SendPacket />
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Node Traffic Load</h2>
          <NodeTrafficLoad />
        </div>
      </section>
    </div>
  );
};

export default App;
