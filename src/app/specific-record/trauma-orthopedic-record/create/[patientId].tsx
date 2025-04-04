import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import { customFonts } from "../../../../hooks/useFonts";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MainText } from "../../../../components/MainText";
import { InputField } from "../../../../components/InputField";
import { useEffect, useState } from "react";
import { EnumPicker } from "../../../../components/EnumPicker";
import { ColorType } from "../../../../../assets/enum";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTraumaOrthopedic } from "../../../../hooks/useSpecificRecord/useTraumaOrthopedicRecord";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EvaluationForm() {
  const fontsLoaded = customFonts();
  const router = useRouter();
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const { loading, error, handleRegister } = useTraumaOrthopedic();

  const [formData, setFormData] = useState({
    medicalDiagnosis: "",
    anamnesis: "",
    physicalExamination: "",
    triage: "blue",
    palpation: "",
    edema: false,
    pittingTest: false,
    fingerPressureTest: false,
    perimetry: {
      rightArm: 0,
      leftArm: 0,
      upperRightThigh: 0,
      upperLeftThigh: 0,
      lowerRightThigh: 0,
      lowerLeftThigh: 0,
      rightKnee: 0,
      leftKnee: 0,
    },
    subjectivePainAssessment: {
      intensity: 0,
      location: "",
      characteristic: "",
    },
    specialOrthopedicTest: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = <
    T extends keyof typeof formData,
    K extends keyof typeof formData[T]
  >(
    parent: T,
    field: K,
    value: typeof formData[T][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(typeof prev[parent] === "object" && prev[parent] !== null ? prev[parent] : {}),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const clinicianId = await SecureStore.getItemAsync("user_id");
      if (!clinicianId || !patientId) {
        Alert.alert("Erro", "Profissional ou paciente não identificado");
        return;
      }

      const response = await handleRegister(clinicianId, patientId, formData);

      if (response) {
        Alert.alert("Sucesso", "Avaliação registrada com sucesso!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert("Erro", error?.toString() || "Erro ao salvar avaliação");
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
    }
  }, [error]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          {MainText(
            "Ficha Avaliativa",
            "Preencha os dados da avaliação fisioterapêutica"
          )}

          <InputField
            label="Diagnóstico Médico"
            value={formData.medicalDiagnosis}
            onChangeText={(text) => handleInputChange("medicalDiagnosis", text)}
            multiline
          />

          <InputField
            label="Anamnese"
            value={formData.anamnesis}
            onChangeText={(text) => handleInputChange("anamnesis", text)}
            multiline
          />

          <InputField
            label="Exame Físico"
            value={formData.physicalExamination}
            onChangeText={(text) =>
              handleInputChange("physicalExamination", text)
            }
            multiline
          />

          <EnumPicker
            label="Classificação de Risco"
            enumValues={ColorType}
            selectedValue={formData.triage}
            onValueChange={(value) => handleInputChange("triage", value)}
          />

          <InputField
            label="Palpação"
            value={formData.palpation}
            onChangeText={(text) => handleInputChange("palpation", text)}
            multiline
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Edema</Text>
            <Switch
              value={formData.edema}
              onValueChange={(value) => handleInputChange("edema", value)}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Teste de Pitting</Text>
            <Switch
              value={formData.pittingTest}
              onValueChange={(value) => handleInputChange("pittingTest", value)}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Teste de Pressão Digital</Text>
            <Switch
              value={formData.fingerPressureTest}
              onValueChange={(value) =>
                handleInputChange("fingerPressureTest", value)
              }
            />
          </View>

          <Text style={styles.sectionTitle}>Perimetria (cm)</Text>
          {Object.entries(formData.perimetry).map(([key, value]) => (
            <InputField
              key={key}
              label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
              value={value.toString()}
              onChangeText={(text) =>
                handleNestedChange("perimetry", key as keyof typeof formData.perimetry, parseInt(text) || 0)
              }
              keyboardType="numeric"
            />
          ))}

          <Text style={styles.sectionTitle}>Avaliação Subjetiva de Dor</Text>
          <InputField
            label="Intensidade (0-10)"
            value={formData.subjectivePainAssessment.intensity.toString()}
            onChangeText={(text) =>
              handleNestedChange(
                "subjectivePainAssessment",
                "intensity",
                parseInt(text) || 0
              )
            }
            keyboardType="numeric"
          />
          <InputField
            label="Localização"
            value={formData.subjectivePainAssessment.location}
            onChangeText={(text) =>
              handleNestedChange("subjectivePainAssessment", "location", text)
            }
          />
          <InputField
            label="Característica"
            value={formData.subjectivePainAssessment.characteristic}
            onChangeText={(text) =>
              handleNestedChange(
                "subjectivePainAssessment",
                "characteristic",
                text
              )
            }
          />

          <InputField
            label="Teste Ortopédico Especial"
            value={formData.specialOrthopedicTest}
            onChangeText={(text) =>
              handleInputChange("specialOrthopedicTest", text)
            }
            multiline
          />

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Criar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    alignSelf: "flex-start",
  },
  createButton: {
    backgroundColor: "#2A5C4E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  backButton: {
    marginBottom: 10,
  },
});
