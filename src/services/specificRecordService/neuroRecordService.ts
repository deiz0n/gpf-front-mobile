import api from "../api";

const ROUTE_URL = "/neurofunctional-record";

export const getById = async (id: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/by-id/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const getByPatientId = async (patientId: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/by-patient-id/${patientId}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const fetchByClinicianId = async (
  clinicianId: string,
  page?: number,
  direction?: string,
  orderBy?: number
) => {
  try {
    const response = await api.get(
      `${ROUTE_URL}/fetch-ids-by-clinician-id/${clinicianId}`,
      {
        params: {
          direction: direction || undefined,
          page: page || undefined,
          orderBy: orderBy || undefined,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};


export const register = async (
  clinicianId: string,
  patientId: string,
  userData: any
) => {
  try {
    const response = await api.post(
      `${ROUTE_URL}/patient-id/${patientId}/clinician-id/${clinicianId}`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const update = async (id: string, userData: any) => {
  try {
    const response = await api.put(`${ROUTE_URL}/${id}`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
