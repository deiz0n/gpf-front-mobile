import { useState } from "react";
import {
  getById,
  getByPatientId,
  fetchByClinicianId,
  register,
  update,
  exportPdf,
} from "../../services/specificRecordService/cardioRecordService";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';

export const useCardio = () => {
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

  const handleFetchByClinicianId = async (clinicianId: string, page?: number) => {
    setLoading(true);
    try {
      setError(null);
      const response = await fetchByClinicianId(clinicianId, page);
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

  const handleExportPdf = async (id: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await exportPdf(id);

      // 1. Converter Blob para Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(response.data);
      });

      // 2. Salvar no cache
      const fileUri = FileSystem.cacheDirectory + response.filename;
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 3. Plataforma específica
      if (Platform.OS === 'android') {
        // Android: Abrir com visualizador de PDF
        const contentUri = await FileSystem.getContentUriAsync(fileUri);
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: contentUri,
          type: 'application/pdf',
          flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        });
      } else {
        // iOS: Compartilhar (inclui opção de salvar)
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
        });
      }

      return true;
    } catch (error: any) {
      setError(
        error.message ||
        `Code: ${error.statusCode || '500'} | Erro ao exportar PDF`
      );
      return false;
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
    handleExportPdf,
  };
};
