// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Sesuaikan dengan URL backend Laravel Anda
  headers: {
    'Accept': 'application/json',
  }
});

// Interceptor untuk menyisipkan token Sanctum jika user sudah login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;