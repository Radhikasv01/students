// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://student-project-api.vercel.app', // No slash before 'https'
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
