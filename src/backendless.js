// src/firebaseApi.js
import axios from 'axios';

const BASE_URL = 'https://booking-hotel-app-486fa-default-rtdb.firebaseio.com/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
