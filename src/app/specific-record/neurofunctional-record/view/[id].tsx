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
import { useNeuro } from "../../../../hooks/useSpecificRecord/useNeuroRecord";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

export default function NeurofunctionalRecord() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);
  const { data, error, handleGetByPatientId } = useNeuro();
  const router = useRouter();

  useEffect(() => {
    const getUserType = async () => {
      const userType = await SecureStore.getItemAsync("user_type");
      setEditable(userType === "CLINICIAN");
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
    Alert.alert("Aviso", "Funcionalidade não implementada.");
  };

  const formatValue = (value: any) =>
    value !== undefined && value !== "" && value !== null
      ? value.toString()
      : "Nenhum cadastrado";

  const { record } = data;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Ficha Neurofuncional</Text>
        {editable && (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Seção 1: Diagnóstico e Anamnese */}
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
      </View>

      {/* Seção 2: Informações Adicionais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Adicionais</Text>
        <Text style={styles.label}>
          Departamento de Fisioterapia:{" "}
          <Text style={styles.value}>
            {formatValue(record.physiotherapyDepartment)}
          </Text>
        </Text>
        <Text style={styles.label}>
          Triage:{" "}
          <Text style={styles.value}>{formatValue(record.triage)}</Text>
        </Text>
      </View>

      {/* Seção 3: Hábitos de Vida */}
      {record.lifestyleHabits && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hábitos de Vida</Text>
          <Text style={styles.label}>
            Consumo de Álcool:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.alcoholConsumption ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Fumante:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.smoker ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Obesidade:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.obesity ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Diabetes:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.diabetes ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Uso de Drogas:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.drugUser ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Atividade Física:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.physicalActivity ? "Sim" : "Não"}
            </Text>
          </Text>
        </View>
      )}

      {/* Seção 4: Sinais Vitais */}
      {record.vitalSigns && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinais Vitais</Text>
          <Text style={styles.label}>
            Pressão Arterial:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.bloodPressure)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Frequência Cardíaca:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.heartRate)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Frequência Respiratória:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.respiratoryRate)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Saturação de Oxigênio:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.oxygenSaturation)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Temperatura Corporal:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.bodyTemperature)}
            </Text>
          </Text>
        </View>
      )}

      {/* Seção 5: Inspeção Física */}
      {record.physicalInspection && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspeção Física</Text>
          <Text style={styles.label}>
            Mobilidade Independente:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.independentMobility ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Uso de Muletas:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.usesCrutches ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Uso de Andador:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.usesWalker ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Usuário de Cadeira de Rodas:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.wheelchairUser ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Possui Cicatriz:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.hasScar ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Possui Escara:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.hasBedsore ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Cooperativo:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.cooperative ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Não Cooperativo:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.nonCooperative ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Hidratado:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.hydrated ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Possui Hematoma:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.hasHematoma ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Possui Edema:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.hasEdema ? "Sim" : "Não"}
            </Text>
          </Text>
          <Text style={styles.label}>
            Possui Deformidade:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.hasDeformity ? "Sim" : "Não"}
            </Text>
          </Text>
        </View>
      )}

      {/* Seção 6: Avaliação Sensorial */}
      {record.sensoryAssessment && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação Sensorial</Text>
          <Text style={styles.label}>
            Sensação Superficial:{" "}
            <Text style={styles.value}>
              {formatValue(record.sensoryAssessment.superficial)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Sensação Profunda:{" "}
            <Text style={styles.value}>
              {formatValue(record.sensoryAssessment.deep)}
            </Text>
          </Text>
          {record.sensoryAssessment.combinedSensations && (
            <Text style={styles.label}>
              Sensações Combinadas (Grafestesia/Barognosia/Esterognosia):{" "}
              <Text style={styles.value}>
                {`Grafestesia: ${record.sensoryAssessment.combinedSensations.graphesthesia ? "Sim" : "Não"}; `}
                {`Barognosia: ${record.sensoryAssessment.combinedSensations.barognosis ? "Sim" : "Não"}; `}
                {`Esterognosia: ${record.sensoryAssessment.combinedSensations.stereognosis ? "Sim" : "Não"}`}
              </Text>
            </Text>
          )}
        </View>
      )}

      {/* Seção 7: Mobilidade do Paciente */}
      {record.patientMobility && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mobilidade do Paciente</Text>
          <Text style={styles.label}>
            Tempo de Caminhada de 3 Metros (segundos):{" "}
            <Text style={styles.value}>
              {formatValue(record.patientMobility.threeMeterWalkTimeInSeconds)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Risco de Quedas:{" "}
            <Text style={styles.value}>
              {record.patientMobility.hasFallRisk ? "Sim" : "Não"}
            </Text>
          </Text>
          {record.patientMobility.postureChanges && (
            <View>
              <Text style={styles.label}>Mudanças de Postura:</Text>
              <Text style={styles.value}>
                Ponte: {formatValue(record.patientMobility.postureChanges.bridge)};{"\n"}
                Semi-rotação à Direita: {formatValue(record.patientMobility.postureChanges.semiRollRight)};{"\n"}
                Semi-rotação à Esquerda: {formatValue(record.patientMobility.postureChanges.semiRollLeft)};{"\n"}
                Rolagem Completa: {formatValue(record.patientMobility.postureChanges.fullRoll)};{"\n"}
                Arrastar: {formatValue(record.patientMobility.postureChanges.drag)};{"\n"}
                De Prona para Suporte de Antebraço: {formatValue(record.patientMobility.postureChanges.proneToForearmSupport)};{"\n"}
                De Suporte de Antebraço para Quatro Apoios: {formatValue(record.patientMobility.postureChanges.forearmSupportToAllFours)};{"\n"}
                De Quatro Apoios para Ajoelhado: {formatValue(record.patientMobility.postureChanges.allFoursToKneeling)};{"\n"}
                De Ajoelhado para Meio Ajoelhado à Direita: {formatValue(record.patientMobility.postureChanges.kneelingToHalfKneelingRight)};{"\n"}
                De Ajoelhado para Meio Ajoelhado à Esquerda: {formatValue(record.patientMobility.postureChanges.kneelingToHalfKneelingLeft)};{"\n"}
                De Meio Ajoelhado para em Pé à Direita: {formatValue(record.patientMobility.postureChanges.halfKneelingRightToStanding)};{"\n"}
                De Meio Ajoelhado para em Pé à Esquerda: {formatValue(record.patientMobility.postureChanges.halfKneelingLeftToStanding)}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Seção 8: Avaliação Fisioterapêutica */}
      {record.physiotherapyAssessment && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação Fisioterapêutica</Text>
          <Text style={styles.label}>
            Diagnóstico:{" "}
            <Text style={styles.value}>
              {formatValue(record.physiotherapyAssessment.diagnosis)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Objetivos de Tratamento:{" "}
            <Text style={styles.value}>
              {formatValue(record.physiotherapyAssessment.treatmentGoals)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Conduta Fisioterapêutica:{" "}
            <Text style={styles.value}>
              {formatValue(record.physiotherapyAssessment.physiotherapeuticConduct)}
            </Text>
          </Text>
        </View>
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
  backButton: {
    marginBottom: 15,
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
});
