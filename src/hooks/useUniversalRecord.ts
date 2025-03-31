import { useState } from "react";
import { getRecord, editRecord } from "../services/universalRecordService";

export const useUniversalRecord = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecordById = async (userId: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await getRecord(userId)
      setData(response);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
        "Erro ao buscar prontuário"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (userId: string, userData: any) => {
    setLoading(true);
    try {
      setError(null);
      const response = await editRecord(userId, userData);
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
          : error.error || "Erro ao registrar paciente")
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
    handleGetRecordById,
    handleUpdate,
  };
}