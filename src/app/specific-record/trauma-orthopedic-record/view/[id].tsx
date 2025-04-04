import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTraumaOrthopedic } from "../../../../hooks/useSpecificRecord/useTraumaOrthopedicRecord";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

export default function TraumaOrthopedicRecord() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);
  const { data, error, handleGetByPatientId, handleExportPdf } = useTraumaOrthopedic();
  const router = useRouter();

  useEffect(() => {
    const getUserType = async () => {
      const userType = await SecureStore.getItemAsync("role");
      setEditable(userType === "CLINICIAN" ? true : false);
    };

    const fetchData = async () => {
      setLoading(true);
      await handleGetByPatientId(id);
      setLoading(false);
    };

    fetchData();
    getUserType();
  }, [id]);

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
    }
  }, [error]);

  if (loading) {
    return <ActivityIndicator size="large" color="#2A5C4E" />;
  }

  if (!data || !data.record) {
    return <Text style={styles.errorText}>Registro não encontrado.</Text>;
  }

  const handleEdit = () => {
    router.push(`/specific-record/trauma-orthopedic-record/edit/${data.record.id}`);
  };
  
  async function downloadPdf(id: string) {
    await handleExportPdf(id)
  }

  const formatValue = (value: any) =>
    value !== undefined && value !== ""
      ? value.toString()
      : "Nenhum cadastrado";

  const { record } = data;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Ficha Traumato Ortopédico</Text>
        {editable && (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnóstico e Anamnese</Text>
        <Text style={styles.label}>
          Diagnóstico Médico:{" "}
          <Text style={styles.value}>
            {formatValue(record.medicalDiagnosis)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Anamnese:{" "}
          <Text style={styles.value}>{formatValue(record.anamnesis)}</Text>
        </Text>
        <Text style={styles.label}>
          Exame Físico:{" "}
          <Text style={styles.value}>
            {formatValue(record.physicalExamination)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Teste Ortopédico Especial:{" "}
          <Text style={styles.value}>
            {formatValue(record.specialOrthopedicTest)}
          </Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Adicionais</Text>
        <Text style={styles.label}>
          Departamento de Fisioterapia:{" "}
          <Text style={styles.value}>
            {formatValue(record.physiotherapyDepartment)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Triage: <Text style={styles.value}>{formatValue(record.triage)}</Text>
        </Text>
        <Text style={styles.label}>
          Palpação:{" "}
          <Text style={styles.value}>{formatValue(record.palpation)}</Text>
        </Text>
        <Text style={styles.label}>
          Edema:{" "}
          <Text style={styles.value}>{record.edema ? "Sim" : "Não"}</Text>
        </Text>
        <Text style={styles.label}>
          Teste de Pitting:{" "}
          <Text style={styles.value}>
            {record.pittingTest ? "Positivo" : "Negativo"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Teste de Pressão com os Dedos:{" "}
          <Text style={styles.value}>
            {record.fingerPressureTest ? "Positivo" : "Negativo"}
          </Text>
        </Text>
      </View>

      {record.perimetry && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perimetria</Text>
          <Text style={styles.label}>
            Braço Direito:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.rightArm)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Braço Esquerdo:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.leftArm)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Coxa Superior Direita:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.upperRightThigh)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Coxa Superior Esquerda:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.upperLeftThigh)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Coxa Inferior Direita:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.lowerRightThigh)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Coxa Inferior Esquerda:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.lowerLeftThigh)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Joelho Direito:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.rightKnee)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Joelho Esquerdo:{" "}
            <Text style={styles.value}>
              {formatValue(record.perimetry.leftKnee)}
            </Text>
          </Text>
        </View>
      )}

      {record.subjectivePainAssessment && (
        <><View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação Subjetiva da Dor</Text>
          <Text style={styles.label}>
            Intensidade:{" "}
            <Text style={styles.value}>
              {formatValue(record.subjectivePainAssessment.intensity)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Local:{" "}
            <Text style={styles.value}>
              {formatValue(record.subjectivePainAssessment.location)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Característica:{" "}
            <Text style={styles.value}>
              {formatValue(record.subjectivePainAssessment.characteristic)}
            </Text>
          </Text>
        </View><TouchableOpacity onPress={() => downloadPdf(record.id)}>
            <Text style={styles.downloadButton}>Download PDF</Text>
          </TouchableOpacity></>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  downloadButton: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#2A5C4E",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    marginBottom:30
  },
  section: {
    marginBottom: 20,
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: "normal",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  backButton: {
    marginBottom: 15,
  },
});
