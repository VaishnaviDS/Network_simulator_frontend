import React, { useEffect, useState } from 'react';
import { fetchLinkLoad } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const LinkLoadChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLinkLoad().then(res => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-semibold mb-2">Link Load</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="from" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default LinkLoadChart;
