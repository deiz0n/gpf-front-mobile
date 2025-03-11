import { useState } from "react";
import { loginPatient } from "../services/authService";
import { setAuthToken } from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePatientLogin = async (credentials: any) => {
    setLoading(true);
    try {
      const { token, user } = await loginPatient(credentials);
      setAuthToken(token);
      setUser(user);
      setError(null);
      return true;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao fazer login"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handlePatientLogin };
};