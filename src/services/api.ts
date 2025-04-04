import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blackwell.onrender.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;