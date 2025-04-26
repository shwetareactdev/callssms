import axios from 'axios';

const API = axios.create({
  baseURL: "http://192.168.159.72:5000/api", // <-- Update this IP
});

export default API;
