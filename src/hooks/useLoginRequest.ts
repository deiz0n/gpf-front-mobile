import { useState } from "react";
import { loginPatient, loginClinician } from "../services/authService";
import { setAuthToken } from "../services/api";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePatientLogin = async (credentials: any) => {
    setLoading(true);
    try {
      setError(null);
      const { access_token, user_id, role } = await loginPatient(credentials);
      setAuthToken(access_token);

      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('user_id', user_id);
      await SecureStore.setItemAsync('role', role);
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
      const { access_token, user_id, role } = await loginClinician(credentials);
      setAuthToken(access_token);

      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('user_id', user_id);
      await SecureStore.setItemAsync('role', role);
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

  return { loading, error, handlePatientLogin, handleClinicianLogin };
};