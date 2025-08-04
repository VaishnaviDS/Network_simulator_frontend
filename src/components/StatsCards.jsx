import React from "react";

export const StatsCards = ({ stats }) => {
  const { trafficRate, linkLoad = {}, queueStatus = {} } = stats;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Network Statistics</h3>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Traffic Rate */}
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h4>Traffic Rate</h4>
          <p>{trafficRate ?? "N/A"} packets/sec</p>
        </div>

        {/* Link Load */}
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h4>Link Load</h4>
          {Object.keys(linkLoad).length === 0 ? (
            <p>No data</p>
          ) : (
            <ul>
              {Object.entries(linkLoad).map(([link, load], index) => (
                <li key={index}>
                  {link}: {load} packets/sec
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Queue Status */}
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h4>Queue Status</h4>
          {Object.keys(queueStatus).length === 0 ? (
            <p>No data</p>
          ) : (
            <ul>
              {Object.entries(queueStatus).map(([nodeId, queueLength], index) => (
                <li key={index}>
                  Node {nodeId}: {queueLength} packets waiting
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
