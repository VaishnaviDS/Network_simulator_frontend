import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export const fetchGraph = () => axios.get(`${BASE_URL}/graph`);
export const fetchPackets = () => axios.get(`${BASE_URL}/packets`);
export const sendPacket = (data) => axios.post(`${BASE_URL}/traffic/generate`, data);
export const seedNetwork = (data) => axios.post(`${BASE_URL}/seed`, data);

// Stats
export const getTrafficRate = () => axios.get(`${BASE_URL}/stats/traffic-rate`);
export const getLinkLoad = () => axios.get(`${BASE_URL}/stats/link-load`);
export const getQueueStatus = () => axios.get(`${BASE_URL}/stats/queue-status`);
