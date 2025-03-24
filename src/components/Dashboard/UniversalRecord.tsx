import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useUniversalRecord } from "../../hooks/useUniversalRecord";
import { usePatient } from "../../hooks/usePatientRequests";

interface UniversalRecordProps {
  userId: string;
  editable: boolean;
}

export default function UniversalRecord({
  userId,
  editable,
}: UniversalRecordProps) {
  const [loading, setLoading] = useState(true);

  const {
    data: patientData,
    error: patientError,
    handleGetById,
  } = usePatient();
  const {
    data: recordData,
    error: recordError,
    handleGetRecordById,
  } = useUniversalRecord();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([handleGetById(userId), handleGetRecordById(userId)]);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (patientError || recordError) {
      Alert.alert(
        "Erro",
        patientError || recordError || "Erro desconhecido ao carregar os dados."
      );
    }
  }, [patientError, recordError]);

  if (loading) {
    return <ActivityIndicator size="large" color="#2A5C4E" />;
  }

  if (!patientData || !recordData) {
    return <Text style={styles.errorText}>Prontuário não encontrado.</Text>;
  }

  const handleEdit = () => {
    console.log("Não implementado");
    Alert.alert("Aviso", "Funcionalidade não implementada.");
  };

  const formatValue = (value: any) => {
    return value && value !== "" ? value : "Nenhum cadastrado";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prontuário</Text>
        {editable && (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        <Text style={styles.label}>
          Nome: <Text style={styles.value}>{patientData.patient.name}</Text>
        </Text>
        <Text style={styles.label}>
          Gênero: <Text style={styles.value}>{patientData.patient.gender}</Text>
        </Text>
        <Text style={styles.label}>
          Telefone:{" "}
          <Text style={styles.value}>{patientData.patient.phoneNumber}</Text>
        </Text>
        <Text style={styles.label}>
          CPF: <Text style={styles.value}>{patientData.patient.cpf}</Text>
        </Text>
        <Text style={styles.label}>
          Data de Nascimento:{" "}
          <Text style={styles.value}>{patientData.patient.birthDate}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{patientData.patient.email}</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados médicos</Text>
        <Text style={styles.label}>
          Profissão:{" "}
          <Text style={styles.value}>
            {formatValue(recordData.universalMedicalRecord.profession)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Estado Civil:{" "}
          <Text style={styles.value}>
            {formatValue(recordData.universalMedicalRecord.maritalStatus)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Altura:{" "}
          <Text style={styles.value}>
            {formatValue(recordData.universalMedicalRecord.height)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Peso:{" "}
          <Text style={styles.value}>
            {formatValue(recordData.universalMedicalRecord.weight)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Medicamentos em Uso:{" "}
          <Text style={styles.value}>
            {recordData.universalMedicalRecord.medicationsInUse?.join(", ") ||
              "Nenhum cadastrado"}
          </Text>
        </Text>

        <Text style={styles.label}>
          Alergias:{" "}
          <Text style={styles.value}>
            {recordData.universalMedicalRecord.allergies?.join(", ") ||
              "Nenhuma cadastrada"}
          </Text>
        </Text>

        <Text style={styles.label}>
          Diagnósticos:{" "}
          <Text style={styles.value}>
            {recordData.universalMedicalRecord.diagnosis?.join(", ") ||
              "Nenhum cadastrado"}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  value: {
    fontWeight: "normal",
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  editButton: {
    fontSize: 16,
    backgroundColor: "#2A5C4E",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
  },
});
