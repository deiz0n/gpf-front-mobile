import api from "./api";

const ROUTE_URL = "/patients";

export const fetch = async (direction?: string, page?: number, orderBy?: number) => {
  try {
    const response = await api.get(ROUTE_URL, {
      params: {
        direction: direction || undefined,
        page: page || undefined,
        orderBy: orderBy || undefined,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const getById = async (id: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/by-id/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const getByCpf = async (cpf: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/by-cpf/${cpf}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const getBySlug = async (slug: string) => {
  try {
    const response = await api.get(`${ROUTE_URL}/by-slug/${slug}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post(ROUTE_URL, userData);
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

export const remove = async (id: string) => {
  try {
    const response = await api.delete(`${ROUTE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};