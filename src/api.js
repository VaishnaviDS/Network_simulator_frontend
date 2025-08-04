import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust for your backend
});

export const fetchGraph = () => API.get('/graph');
export const fetchPackets = () => API.get('/packets');
export const fetchTrafficRate = () => API.get('/traffic');
export const fetchLinkLoad = () => API.get('/link-load');
export const fetchQueueStatus = () => API.get('/queue');
