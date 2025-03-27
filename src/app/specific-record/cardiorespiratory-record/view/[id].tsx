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
import { useCardio } from "../../../../hooks/useSpecificRecord/useCardioRecord";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

export default function CardiorespiratoryRecord() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(true);
  const { data, error, handleGetByPatientId } = useCardio();
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
        <Text style={styles.title}>Ficha Cardiorrespiratória</Text>
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
            Prática de Atividade Física:{" "}
            <Text style={styles.value}>
              {record.lifestyleHabits.physicalActivity ? "Sim" : "Não"}
            </Text>
          </Text>
        </View>
      )}

      {/* Seção 4: Inspeção Física */}
      {record.physicalInspection && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspeção Física</Text>
          <Text style={styles.label}>
            Palpação Facial/Sinus:{" "}
            <Text style={styles.value}>
              {record.physicalInspection.isFaceSinusPalpationHurtful ? "Sim" : "Não"}
            </Text>
          </Text>
          {record.physicalInspection.nasalSecretion && (
            <Text style={styles.label}>
              Secreção Nasal:{" "}
              <Text style={styles.value}>
                Tipo: {formatValue(record.physicalInspection.nasalSecretion.type)}; 
                Fetida: {record.physicalInspection.nasalSecretion.isFetid ? "Sim" : "Não"}; 
                Quantidade: {formatValue(record.physicalInspection.nasalSecretion.quantity)}
              </Text>
            </Text>
          )}
          <Text style={styles.label}>
            Coceira Nasal:{" "}
            <Text style={styles.value}>
              {formatValue(record.physicalInspection.nasalItching)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Espirros:{" "}
            <Text style={styles.value}>
              {formatValue(record.physicalInspection.sneezing)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Tipo de Tórax:{" "}
            <Text style={styles.value}>
              {formatValue(record.physicalInspection.chestType)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Sinais Respiratórios ou Cardíacos:{" "}
            <Text style={styles.value}>
              {formatValue(record.physicalInspection.respiratoryOrCardiacSigns)}
            </Text>
          </Text>
        </View>
      )}

      {/* Seção 5: Sinais Vitais */}
      {record.vitalSigns && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinais Vitais</Text>
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
          {record.vitalSigns.bloodPressure && (
            <Text style={styles.label}>
              Pressão Arterial:{" "}
              <Text style={styles.value}>
                {formatValue(record.vitalSigns.bloodPressure.systolic)}/
                {formatValue(record.vitalSigns.bloodPressure.diastolic)}
              </Text>
            </Text>
          )}
          <Text style={styles.label}>
            Temperatura:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.temperature)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Saturação de Oxigênio:{" "}
            <Text style={styles.value}>
              {formatValue(record.vitalSigns.oxygenSaturation)}
            </Text>
          </Text>
        </View>
      )}

      {/* Seção 6: Avaliação Pneumofuncional */}
      {record.pneumofunctionalAssessment && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação Pneumofuncional</Text>
          {record.pneumofunctionalAssessment.peakFlow && (
            <Text style={styles.label}>
              Fluxo de Pico:{" "}
              <Text style={styles.value}>
                1ª Medição: {formatValue(record.pneumofunctionalAssessment.peakFlow.firstMeasurement)};{" "}
                2ª Medição: {formatValue(record.pneumofunctionalAssessment.peakFlow.secondMeasurement)};{" "}
                3ª Medição: {formatValue(record.pneumofunctionalAssessment.peakFlow.thirdMeasurement)}
              </Text>
            </Text>
          )}
          {record.pneumofunctionalAssessment.manovacuometry && (
            <>
              {record.pneumofunctionalAssessment.manovacuometry.pemax && (
                <Text style={styles.label}>
                  Manovacuometria - Pemax:{" "}
                  <Text style={styles.value}>
                    1ª Medição: {formatValue(record.pneumofunctionalAssessment.manovacuometry.pemax.firstMeasurement)};{" "}
                    2ª Medição: {formatValue(record.pneumofunctionalAssessment.manovacuometry.pemax.secondMeasurement)};{" "}
                    3ª Medição: {formatValue(record.pneumofunctionalAssessment.manovacuometry.pemax.thirdMeasurement)}
                  </Text>
                </Text>
              )}
              {record.pneumofunctionalAssessment.manovacuometry.pimax && (
                <Text style={styles.label}>
                  Manovacuometria - Pimax:{" "}
                  <Text style={styles.value}>
                    1ª Medição: {formatValue(record.pneumofunctionalAssessment.manovacuometry.pimax.firstMeasurement)};{" "}
                    2ª Medição: {formatValue(record.pneumofunctionalAssessment.manovacuometry.pimax.secondMeasurement)};{" "}
                    3ª Medição: {formatValue(record.pneumofunctionalAssessment.manovacuometry.pimax.thirdMeasurement)}
                  </Text>
                </Text>
              )}
            </>
          )}
        </View>
      )}

      {/* Seção 7: Avaliação Cardiofuncional */}
      {record.cardiofunctionalAssessment && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliação Cardiofuncional</Text>
          <Text style={styles.label}>
            IMC:{" "}
            <Text style={styles.value}>
              {formatValue(record.cardiofunctionalAssessment.bmi)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Perímetro Abdominal:{" "}
            <Text style={styles.value}>
              {formatValue(record.cardiofunctionalAssessment.abdominalPerimeter)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Relação Cintura-Quadril:{" "}
            <Text style={styles.value}>
              {formatValue(record.cardiofunctionalAssessment.waistHipRatio)}
            </Text>
          </Text>
          {record.cardiofunctionalAssessment.bioimpedance && (
            <Text style={styles.label}>
              Bioimpedância (Gordura/Visceral/Massa Muscular):{" "}
              <Text style={styles.value}>
                {formatValue(record.cardiofunctionalAssessment.bioimpedance.bodyFat)}/
                {formatValue(record.cardiofunctionalAssessment.bioimpedance.visceralFat)}/
                {formatValue(record.cardiofunctionalAssessment.bioimpedance.muscleMassPercentage)}
              </Text>
            </Text>
          )}
          {record.cardiofunctionalAssessment.adipometry &&
            record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements && (
              <Text style={styles.label}>
                Adipometria (Dobras Cutâneas - Bicipital, Tricipital, Subescapular, Abdominal):{" "}
                <Text style={styles.value}>
                  Bicipital: {formatValue(record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.bicipital)};{" "}
                  Tricipital: {formatValue(record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.tricipital)};{" "}
                  Subescapular: {formatValue(record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.subscapular)};{" "}
                  Abdominal: {formatValue(record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.abdominal)}
                </Text>
              </Text>
            )}
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
