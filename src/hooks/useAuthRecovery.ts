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
      console.log("email", email);
      const response = await forgotPassword(email);
      console.log("response", response);
      return response
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
      await resetPassword(token, newPassword);
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("user_id");
      await SecureStore.deleteItemAsync("role");
      return true;
    } catch (error: any) {
      setError(
        `Code: ${error.statusCode} | Error: ${error.error} | Message: ${error.message}` ||
          "Erro ao atualizar senha"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleForgotPassword, handleResetPassword };
};
