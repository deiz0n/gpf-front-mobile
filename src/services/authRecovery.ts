import api from './api';

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await api.patch(`/auth/reset-password/${token}`, newPassword);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};