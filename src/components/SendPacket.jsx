import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Network } from "vis-network/standalone";

const SendPacket = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trafficLoad, setTrafficLoad] = useState(5);
  const networkRef = useRef(null);
  const networkInstance = useRef(null);

  useEffect(() => {
    fetchGraph();
  }, []);

  const fetchGraph = async () => {
    const res = await axios.get("http://localhost:5000/api/graph");
    setNodes(res.data.map(n => ({ id: n._id, label: n.name })));
    setEdges(
      res.data
        .flatMap(n =>
          n.connections.map(c => ({
            from: n._id,
            to: c.nodeId,
            arrows: "to",
          }))
        )
    );
  };

  useEffect(() => {
    if (nodes.length === 0 || edges.length === 0) return;

    const container = networkRef.current;
    const data = { nodes, edges };
    const options = {
      nodes: {
        shape: "dot",
        size: 20,
        font: { color: "#fff" },
        color: { background: "#007bff", border: "#0056b3" },
      },
      edges: {
        color: "#aaa",
        width: 2,
      },
      physics: { enabled: true },
    };
    networkInstance.current = new Network(container, data, options);
  }, [nodes, edges]);

  const sendPacket = async () => {
    if (!source || !destination) return alert("Select nodes");

    const res = await axios.post("http://localhost:5000/api/generate", {
      sourceId: source,
      destinationId: destination,
      trafficLoad,
    });

    const { path } = res.data.packet;
    animatePacket(path);
  };

  const animatePacket = (path) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= path.length) {
        clearInterval(interval);
        return;
      }

      networkInstance.current.selectNodes([path[i]]);
      i++;
    }, 700);
  };

  return (
    <div>
      <h2>Send Packet</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => setSource(e.target.value)}>
          <option value="">Select Source</option>
          {nodes.map(n => (
            <option key={n.id} value={n.id}>{n.label}</option>
          ))}
        </select>

        <select onChange={(e) => setDestination(e.target.value)} style={{ marginLeft: "1rem" }}>
          <option value="">Select Destination</option>
          {nodes.map(n => (
            <option key={n.id} value={n.id}>{n.label}</option>
          ))}
        </select>

        <input
          type="number"
          value={trafficLoad}
          onChange={(e) => setTrafficLoad(Number(e.target.value))}
          min="1"
          max="100"
          style={{ marginLeft: "1rem", width: "60px" }}
        />

        <button onClick={sendPacket} style={{ marginLeft: "1rem" }}>
          Send Packet
        </button>
      </div>

      <div ref={networkRef} style={{ height: "500px", border: "1px solid #ccc" }} />
    </div>
  );
};

export default SendPacket;
