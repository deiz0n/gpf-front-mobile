import api from "./api";

const ROUTE_URL = "/universal-medical-record";

export const getRecord = async (patientId: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/by-patient-id/${patientId}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const editRecord = async (patientId: string, userData: any) => {
  try {
    const response = await api.put(`${ROUTE_URL}/by-patient-id/${patientId}`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};