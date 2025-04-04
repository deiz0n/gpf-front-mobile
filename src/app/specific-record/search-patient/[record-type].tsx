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
import { usePatient } from "../../../hooks/usePatientRequests";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const RECORD_TYPE_CONFIG: { [key: string]: { title: string; route: string } } = {
  "trauma": {
    title: "Traumato Ortopédico",
    route: "trauma-orthopedic-record",
  },
  "cardio": {
    title: "Cardiorrespiratório",
    route: "cardiorespiratory-record",
  },
  "neuro":{
    title: "Neurofuncional",
    route: "neurofunctional-record",
  }
};

export default function CreateGenericRecord() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const recordType = params['record-type'] as string;
  
  const { error: patientError, handleGetByCpf } = usePatient();
  const [lastError, setLastError] = useState<string | null>(null);
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidRecordType = RECORD_TYPE_CONFIG[recordType as string];
  const recordConfig = isValidRecordType 
    ? RECORD_TYPE_CONFIG[recordType as string] 
    : { title: "Registro Médico", route: "" };

  const handleSubmit = async () => {
    if (!isValidRecordType) {
      Alert.alert("Erro", "Tipo de ficha inválido");
      return;
    }

    if (!cpf) {
      Alert.alert("Erro", "Preencha o CPF antes de continuar.");
      return;
    }

    setLoading(true);
    setLastError(null);

    try {
      const patient = await handleGetByCpf(cpf);

      if (!patient) {
        const errorMessage = "Paciente não encontrado.";
        setLastError(errorMessage);
        Alert.alert("Erro", errorMessage);
        return;
      }

      router.push(`/specific-record/${recordConfig.route}/create/${patient.patient.id}`);
    } catch (error) {
      const errorMessage = "Ocorreu um erro ao buscar o paciente.";
      setLastError(errorMessage);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientError && patientError !== lastError) {
      Alert.alert("Erro", patientError);
      setLastError(patientError);
    }
  }, [patientError, lastError]);

  if (!isValidRecordType) {
    console.log(`Tipo de ficha inválido: ${recordType}`);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tipo de ficha inválido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Criar Registro {recordConfig.title}</Text>

      <Text style={styles.label}>CPF do Paciente:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o CPF"
        value={cpf}
        onChangeText={setCpf}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Continuar</Text>
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