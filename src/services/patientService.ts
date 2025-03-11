import api from './api';

export const register = async (userData: any) => {
    try {
      const response = await api.post('/patient', userData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };