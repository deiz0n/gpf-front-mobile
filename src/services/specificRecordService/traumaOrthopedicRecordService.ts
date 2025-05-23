import api from "../api";

const ROUTE_URL = "/trauma-orthopedic-record";

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

export const exportPdf = async (id: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/export-pdf/${id}`, {
      responseType: 'blob', // Axios no React Native suporta blob
    });

    // Extrai o filename do header
    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : `record-cardio-${id}.pdf`;

    return {
      data: response.data,
      filename
    };
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
