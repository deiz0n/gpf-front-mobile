import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { EnumPicker } from "../components/EnumPicker";
import { usePatient } from "../hooks/usePatientRequests";
import { useRecordAccess } from "../hooks/useRecordAccess";
import { useRouter } from "expo-router";
import { RecordType } from "../../assets/enum";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RequestAccess() {
  const router = useRouter();
  const { error: patientError, handleGetByCpf } = usePatient();
  const { error: recordError, handleRequestAccess } = useRecordAccess();
  const [lastError, setLastError] = useState<string | null>(null);

  const [cpf, setCpf] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<string>("Cardio");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!cpf || !selectedRecord) {
      Alert.alert("Erro", "Preencha todos os campos antes de solicitar.");
      return;
    }
  
    setLoading(true);
    setLastError(null); // Reseta o último erro antes da requisição
  
    try {
      const patient = await handleGetByCpf(cpf);
  
      if (!patient) {
        const errorMessage = "Paciente não encontrado.";
        setLastError(errorMessage); // Armazena o erro
        Alert.alert("Erro", errorMessage);
        return;
      }
  
      const success = await handleRequestAccess(patient.patient.id, selectedRecord);
  
      if (success) {
        Alert.alert("Sucesso", "Acesso requisitado com sucesso!");
      } else {
        const errorMessage = "Não foi possível requisitar acesso.";
        setLastError(errorMessage);
        Alert.alert("Erro", errorMessage);
      }
    } catch (error) {
      const errorMessage = "Ocorreu um erro ao processar a solicitação.";
      setLastError(errorMessage);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const errorMessage = patientError || recordError;
    
    if (errorMessage && errorMessage !== lastError) {
      Alert.alert("Erro", errorMessage);
      setLastError(errorMessage);
    }
  }, [patientError, recordError, lastError]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Requisitar Acesso</Text>

      <Text style={styles.label}>CPF do Paciente:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o CPF"
        value={cpf}
        onChangeText={setCpf}
      />

      <EnumPicker
        label="Tipo de Ficha Avaliativa"
        enumValues={RecordType}
        selectedValue={selectedRecord}
        onValueChange={(value) => setSelectedRecord(value)}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Solicitar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#2A5C4E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
