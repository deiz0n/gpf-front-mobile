import { useState } from "react";
import {
  getById,
  getByPatientId,
  fetchByClinicianId,
  register,
  update,
} from "../../services/specificRecordService/neuroRecordService";

export const useNeuro = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetById = async (id: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await getById(id);
      setData(response);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar registro por ID"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetByPatientId = async (patientId: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await getByPatientId(patientId);
      setData(response);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar registro por ID do paciente"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleFetchByClinicianId = async (clinicianId: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await fetchByClinicianId(clinicianId);
      setData(response);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao buscar registros por ID do clínico"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (clinicianId: string, patientId: string, userData: any) => {
    setLoading(true);
    try {
      setError(null);
      const response = await register(clinicianId, patientId, userData);
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
            : error.error || "Erro ao registrar registro")
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, userData: any) => {
    setLoading(true);
    try {
      setError(null);
      const response = await update(id, userData);
      setData(response);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao atualizar registro"
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
    handleGetById,
    handleGetByPatientId,
    handleFetchByClinicianId,
    handleRegister,
    handleUpdate,
  };
};
