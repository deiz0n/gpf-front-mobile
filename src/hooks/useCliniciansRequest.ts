import { useState } from "react";
import {
  fetch,
  getById,
  getByCpf,
  getBySlug,
  register,
  update,
  remove,
} from "../services/clinicianService";

export const useClinician = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (
    direction?: string,
    page?: number,
    orderBy?: number
  ) => {
    setLoading(true);
    try {
      const response = await fetch(direction, page, orderBy);
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar clínicos"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getById(id);
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar clínico por ID"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetByCpf = async (cpf: string) => {
    setLoading(true);
    try {
      const response = await getByCpf(cpf);
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar clínico por CPF"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetBySlug = async (slug: string) => {
    setLoading(true);
    try {
      const response = await getBySlug(slug);
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar clínico por slug"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    setLoading(true);
    try {
      setError(null);
      const response = await register(userData);
      setData(response);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Message: ${error.message}\n\n` +
          (Array.isArray(error.errors)
            ? error.errors
                .map(
                  (err: { field: string; message: string }) =>
                    `• ${err.field}: ${err.message}`
                )
                .join("\n")
            : error.error || "Erro ao registrar clínico")
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  // NÃO SERÁ USADO NO FRONT-END
  const handleUpdate = async (id: string, userData: any) => {
    setLoading(true);
    try {
      const response = await update(id, userData);
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao atualizar clínico"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  // NÃO SERÁ USADO NO FRONT-END
  const handleRemove = async (id: string) => {
    setLoading(true);
    try {
      const response = await remove(id);
      setData(response);
      setError(null);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao remover clínico"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    handleFetch,
    handleGetById,
    handleGetByCpf,
    handleGetBySlug,
    handleRegister,
    handleUpdate,
    handleRemove,
  };
};
