import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    const newAccessToken = res.data?.accessToken;
    if (newAccessToken) localStorage.setItem('accessToken', newAccessToken);
    return res;
  },
  (error) => Promise.reject(error)
);

export default api;


