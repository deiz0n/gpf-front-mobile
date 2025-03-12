import { useState } from "react";
import { loginPatient, loginClinician } from "../services/authService";
import { setAuthToken } from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePatientLogin = async (credentials: any) => {
    setLoading(true);
    try {
      setError(null);
      const { token, user } = await loginPatient(credentials);
      setAuthToken(token);
      setUser(user);
      return true;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao fazer login como paciente"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleClinicianLogin = async (credentials: any) => {
    setLoading(true);
    try {
      setError(null);
      const { token, user } = await loginClinician(credentials);
      setAuthToken(token);
      setUser(user);
      return true;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao fazer login como clínico"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handlePatientLogin, handleClinicianLogin };
};