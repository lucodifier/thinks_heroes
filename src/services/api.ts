import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

api.interceptors.request.use((config) => {
  config.headers['AccessKey'] = process.env.NEXT_PUBLIC_ACCESS_KEY || '';
  return config;
});

export default api;
