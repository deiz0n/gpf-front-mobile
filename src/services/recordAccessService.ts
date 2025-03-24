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

export const updateAuthorization = async (
  userId: string,
  recordType: string,
  action: "accept" | "reject"
) => {
  try {
    if (action === "accept") {
      const response = await api.patch(
        `${ROUTE_URL}/pending-authorization/authorize-access/${userId}?recordType=${recordType}`
      );
      return response.status === 200;
    } else {
      const response = await api.delete(
        `${ROUTE_URL}/pending-authorization/deny-access/${userId}?recordType=${recordType}`
      );
      return response.status === 200;
    }
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
