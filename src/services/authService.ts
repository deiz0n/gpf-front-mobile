import api from './api';

export const registerPatient = async (userData: any) => {
  try {
    const response = await api.post('/patient', userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const loginPatient = async (credentials: any) => {
  try {
    const response = await api.post('/auth/patient', credentials);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};