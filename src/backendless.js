import axios from 'axios';

const BASE_URL = 'https://booking-backend-production-bbba.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
