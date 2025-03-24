import { useState } from "react";
import { getPendingAuthorization, updateAuthorization } from "../services/recordAccessService";

export const useRecordAccess = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePendingAuthorization = async () => {
    setLoading(true);
    try {
      setError(null);
      const response = await getPendingAuthorization();
      setData(response);
      return response;
    } catch (error: any) {
      console.log(error);
      setError("Erro ao buscar autorizações pendentes");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = async (userId: string, recordType: string, action: "accept" | "reject") => {
    setLoading(true);
    try {
      setError(null);
      const success = await updateAuthorization(userId, recordType, action);
      return success;
    } catch (error: any) {
      console.log(error);
      setError("Erro ao processar autorização");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    handlePendingAuthorization,
    handleAuthorize,
  };
};
