import api from "./api";

const ROUTE_URL = "/manage-access";

export const getPendingAuthorization = async () => {
    try {
      const response = await api.get(`${ROUTE_URL}/pending-authorization`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };