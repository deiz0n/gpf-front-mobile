import { useState } from "react";
import { forgotPassword, resetPassword } from "../services/authRecovery";
import * as SecureStore from "expo-secure-store";

export const useAuthRecovery = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await forgotPassword(email);
      return response;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao enviar email de recuperação de senha"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await resetPassword(token, newPassword);
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("user_id");
      await SecureStore.deleteItemAsync("role");
      return response;
    } catch (error: any) {
      let errorMessage = `Code: ${error.statusCode} | Message: ${error.message}`;

      if (error.statusCode === 400 && Array.isArray(error.errors)) {
        const validationErrors = error.errors
          .map(
            (err: { field: string; message: string }) =>
              `• ${err.field}: ${err.message}`
          )
          .join("\n");
        errorMessage += "\n" + validationErrors;
      }

      else if (error.statusCode === 401) {
        errorMessage += "\nToken inválido ou expirado";
      }
      
      else {
        errorMessage += "\n" + (error.error || "Erro ao mudar senha");
      }

      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleForgotPassword, handleResetPassword };
};
