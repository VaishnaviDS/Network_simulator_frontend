import React, { useEffect, useState } from "react";
import axios from "axios";

const NodeTrafficLoad = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    fetchTrafficLoad();
    const interval = setInterval(fetchTrafficLoad, 5000); // auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const fetchTrafficLoad = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/node-traffic");
      setTrafficData(res.data);
    } catch (err) {
      console.error("Error fetching node traffic:", err.message);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>📶 Node Traffic Load</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {trafficData.map(({ nodeId, nodeName, trafficLoad }) => (
          <div
            key={nodeId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              minWidth: "120px",
              background: "#f4f4f4",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{nodeName}</strong>
            <p style={{ margin: "0.5rem 0 0", fontSize: "14px" }}>
              Load: <span style={{ fontWeight: "bold" }}>{trafficLoad}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeTrafficLoad;
