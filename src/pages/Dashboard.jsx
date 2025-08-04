import React, { useEffect, useState } from "react";
import axios from "axios";
import { NetworkGraph } from "../components/NetworkGraph";
import { StatsCards } from "../components/StatsCards";
import { PacketSender } from "../components/PacketSender";

export const Dashboard = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [stats, setStats] = useState({
    trafficRate: 0,
    linkLoad: [],
    queueStatus: []
  });

  const fetchGraph = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/graph");
      setNodes(res.data.nodes);
      setEdges(res.data.edges);
    } catch (err) {
      console.error("Error fetching graph:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const [rateRes, linkRes, queueRes] = await Promise.all([
        axios.get("http://localhost:5000/api/rate"),
        axios.get("http://localhost:5000/api/link-load"),
        axios.get("http://localhost:5000/api/queues"),
      ]);

      setStats({
        trafficRate: rateRes.data.trafficRate,
        linkLoad: linkRes.data.linkLoad,
        queueStatus: queueRes.data.queueStatus
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

useEffect(() => {
  fetchGraph();
  fetchStats();
}, []);

useEffect(() => {
  console.log("Stats received:", stats);
}, [stats]);


  return (
    <div style={{ padding: "2rem" }}>
      <h2>Network Dashboard</h2>
      <NetworkGraph nodes={nodes} edges={edges} />
      <StatsCards stats={stats} />
      <PacketSender onPacketSent={fetchStats} />
    </div>
  );
};
