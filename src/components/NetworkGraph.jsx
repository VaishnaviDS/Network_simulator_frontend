import React, { useEffect, useState } from 'react';
import { fetchGraph } from '../api';

const NetworkGraph = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchGraph().then(res => setNodes(res.data)).catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Nodes</h2>
      <ul>
        {nodes.map(node => (
          <li key={node._id}>{node.name} ({node._id})</li>
        ))}
      </ul>
    </div>
  );
};

export default NetworkGraph;
