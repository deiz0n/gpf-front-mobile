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
  import { ColorType, PainType, SensitivityType, FunctionalIndependenceType } from "../../../../../assets/enum";
  import { useLocalSearchParams, useRouter } from "expo-router";
  import * as SecureStore from "expo-secure-store";
  import { useNeuro } from "../../../../hooks/useSpecificRecord/useNeuroRecord";
  import Ionicons from "@expo/vector-icons/Ionicons";
  
  export default function EditNeurofunctionalEvaluation() {
    const fontsLoaded = customFonts();
    const router = useRouter();
    const { recordId } = useLocalSearchParams<{ recordId: string }>();
    const { loading, error, handleUpdate, handleGetById } = useNeuro();
  
    const [formData, setFormData] = useState({
      medicalDiagnosis: "",
      anamnesis: "",
      physicalExamination: "",
      triage: "blue",
      lifestyleHabits: {
        alcoholConsumption: false,
        smoker: false,
        obesity: false,
        diabetes: false,
        drugUser: false,
        physicalActivity: false
      },
      vitalSigns: {
        bloodPressure: 0,
        heartRate: 0,
        respiratoryRate: 0,
        oxygenSaturation: 0,
        bodyTemperature: 0
      },
      physicalInspection: {
        independentMobility: false,
        usesCrutches: false,
        usesWalker: false,
        wheelchairUser: false,
        hasScar: false,
        hasBedsore: false,
        cooperative: false,
        nonCooperative: false,
        hydrated: false,
        hasHematoma: false,
        hasEdema: false,
        hasDeformity: false
      },
      sensoryAssessment: {
        superficial: "Tactile",
        deep: "PositionSense",
        combinedSensations: {
          graphesthesia: false,
          barognosis: false,
          stereognosis: false
        }
      },
      patientMobility: {
        threeMeterWalkTimeInSeconds: 0,
        hasFallRisk: false,
        postureChanges: {
          bridge: "Independent",
          semiRollRight: "Independent",
          semiRollLeft: "Independent",
          fullRoll: "Independent",
          drag: "Independent",
          proneToForearmSupport: "Independent",
          forearmSupportToAllFours: "Independent",
          allFours: "Independent",
          allFoursToKneeling: "Independent",
          kneelingToHalfKneelingRight: "Independent",
          kneelingToHalfKneelingLeft: "Independent",
          halfKneelingRightToStanding: "Independent",
          halfKneelingLeftToStanding: "Independent"
        }
      },
      physiotherapyAssessment: {
        diagnosis: "",
        treatmentGoals: "",
        physiotherapeuticConduct: ""
      }
    });

    useEffect(() => {
        const fetchRecordData = async () => {
          try {
            const response = await handleGetById(recordId);
            
            if (response && response.record) {
              const record = response.record;
              
              setFormData(prev => ({
                ...prev,
                medicalDiagnosis: record.medicalDiagnosis || prev.medicalDiagnosis,
                anamnesis: record.anamnesis || prev.anamnesis,
                physicalExamination: record.physicalExamination || prev.physicalExamination,
                triage: record.triage || prev.triage,
                
                lifestyleHabits: record.lifestyleHabits ? {
                  ...prev.lifestyleHabits,
                  ...record.lifestyleHabits
                } : prev.lifestyleHabits,
                
                vitalSigns: record.vitalSigns ? {
                  ...prev.vitalSigns,
                  ...record.vitalSigns,
                  bloodPressure: record.vitalSigns.bloodPressure || prev.vitalSigns.bloodPressure
                } : prev.vitalSigns,
                
                physicalInspection: record.physicalInspection ? {
                  ...prev.physicalInspection,
                  ...record.physicalInspection,
                } : prev.physicalInspection,
                
                sensoryAssessment: record.sensoryAssessment ? {
                  ...prev.sensoryAssessment,
                  ...record.sensoryAssessment,
                  combinedSensations: record.sensoryAssessment.combinedSensations ? {
                    ...prev.sensoryAssessment.combinedSensations,
                    ...record.sensoryAssessment.combinedSensations
                  } : prev.sensoryAssessment.combinedSensations
                } : prev.sensoryAssessment,
                
                patientMobility: record.patientMobility ? {
                  ...prev.patientMobility,
                  ...record.patientMobility,
                  postureChanges: record.patientMobility.postureChanges ? {
                    ...prev.patientMobility.postureChanges,
                    ...record.patientMobility.postureChanges
                  } : prev.patientMobility.postureChanges
                } : prev.patientMobility,
                
                physiotherapyAssessment: record.physiotherapyAssessment ? {
                  ...prev.physiotherapyAssessment,
                  ...record.physiotherapyAssessment
                } : prev.physiotherapyAssessment
              }));
            }
          } catch (error) {
            console.error("Error fetching record:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados do registro");
          }
        };
      
        fetchRecordData();
      }, [recordId]);
  
    const handleInputChange = (field: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleNestedChange = <T extends keyof typeof formData, K extends keyof typeof formData[T]>(
      parent: T,
      field: K,
      value: typeof formData[T][K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
            ...(typeof prev[parent] === "object" && prev[parent] !== null ? prev[parent] : {}),
          [field]: value
        }
      }));
    };
  
    const handleDeepNestedChange = <
      T extends keyof typeof formData,
      K extends keyof typeof formData[T],
      L extends keyof typeof formData[T][K]
    >(
      parent: T,
      child: K,
      field: L,
      value: typeof formData[T][K][L]
    ) => {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
            ...(typeof prev[parent] === "object" && prev[parent] !== null ? prev[parent] : {}),
          [child]: {
            ...prev[parent][child],
            [field]: value
          }
        }
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const clinicianId = await SecureStore.getItemAsync("user_id");
        if (!clinicianId || !recordId) {
          Alert.alert("Erro", "Profissional ou registro não identificado");
          return;
        }
  
        const response = await handleUpdate(recordId, formData);
  
        if (response) {
          Alert.alert("Sucesso", "Avaliação editada com sucesso!", [
            { text: "OK", onPress: () => router.back() }
          ]);
        }
      } catch (error) {
        Alert.alert("Erro", error?.toString() || "Erro ao salvar alterações");
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
              "Editar Avaliação",
              "Atualize os dados da avaliação fisioterapêutica"
            )}
  
            {/* Seção Principal */}
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
              onChangeText={(text) => handleInputChange("physicalExamination", text)}
              multiline
            />
  
            <EnumPicker
              label="Classificação de Risco"
              enumValues={ColorType}
              selectedValue={formData.triage}
              onValueChange={(value) => handleInputChange("triage", value)}
            />
  
            {/* Hábitos de Vida */}
            <Text style={styles.sectionTitle}>Hábitos de Vida</Text>
            <View style={styles.switchGrid}>
              {Object.entries(formData.lifestyleHabits).map(([key, value]) => (
                <View key={key} style={styles.switchItem}>
                  <Text style={styles.switchLabel}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                  <Switch
                    value={value as boolean}
                    onValueChange={(val) => handleNestedChange("lifestyleHabits", key as keyof typeof formData.lifestyleHabits, val)}
                  />
                </View>
              ))}
            </View>
  
            {/* Sinais Vitais */}
            <Text style={styles.sectionTitle}>Sinais Vitais</Text>
            {Object.entries(formData.vitalSigns).map(([key, value]) => (
              <InputField
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                value={value.toString()}
                onChangeText={(text) => handleNestedChange("vitalSigns", key as keyof typeof formData.vitalSigns, Number(text))}
                keyboardType="numeric"
              />
            ))}
  
            {/* Inspeção Física */}
            <Text style={styles.sectionTitle}>Inspeção Física</Text>
            <View style={styles.switchGrid}>
              {Object.entries(formData.physicalInspection).map(([key, value]) => (
                <View key={key} style={styles.switchItem}>
                  <Text style={styles.switchLabel}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                  <Switch
                    value={value as boolean}
                    onValueChange={(val) => handleNestedChange("physicalInspection", key as keyof typeof formData.physicalInspection, val)}
                  />
                </View>
              ))}
            </View>
  
            {/* Avaliação Sensorial */}
            <Text style={styles.sectionTitle}>Avaliação Sensorial</Text>
            <EnumPicker
              label="Sensibilidade Superficial"
              enumValues={PainType}
              selectedValue={formData.sensoryAssessment.superficial}
              onValueChange={(value) => handleNestedChange("sensoryAssessment", "superficial", value)}
            />
  
            <EnumPicker
              label="Sensibilidade Profunda"
              enumValues={SensitivityType}
              selectedValue={formData.sensoryAssessment.deep}
              onValueChange={(value) => handleNestedChange("sensoryAssessment", "deep", value)}
            />
  
            <Text style={styles.subSectionTitle}>Sensações Combinadas</Text>
            <View style={styles.switchGrid}>
              {Object.entries(formData.sensoryAssessment.combinedSensations).map(([key, value]) => (
                <View key={key} style={styles.switchItem}>
                  <Text style={styles.switchLabel}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                  <Switch
                    value={value}
                    onValueChange={(val) => handleDeepNestedChange("sensoryAssessment", "combinedSensations", key as keyof typeof formData.sensoryAssessment.combinedSensations, val)}
                  />
                </View>
              ))}
            </View>
  
            {/* Mobilidade do Paciente */}
            <Text style={styles.sectionTitle}>Mobilidade do Paciente</Text>
            <InputField
              label="Tempo para caminhar 3 metros (segundos)"
              value={formData.patientMobility.threeMeterWalkTimeInSeconds.toString()}
              onChangeText={(text) => handleNestedChange("patientMobility", "threeMeterWalkTimeInSeconds", Number(text))}
              keyboardType="numeric"
            />
  
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Risco de Queda</Text>
              <Switch
                value={formData.patientMobility.hasFallRisk}
                onValueChange={(val) => handleNestedChange("patientMobility", "hasFallRisk", val)}
              />
            </View>
  
            <Text style={styles.subSectionTitle}>Mudanças Posturais</Text>
            {Object.entries(formData.patientMobility.postureChanges).map(([key, value]) => (
              <EnumPicker
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                enumValues={FunctionalIndependenceType}
                selectedValue={value}
                onValueChange={(val) => handleDeepNestedChange("patientMobility", "postureChanges", key as keyof typeof formData.patientMobility.postureChanges, val)}
              />
            ))}
  
            {/* Avaliação Fisioterapêutica */}
            <Text style={styles.sectionTitle}>Avaliação Fisioterapêutica</Text>
            <InputField
              label="Diagnóstico"
              value={formData.physiotherapyAssessment.diagnosis}
              onChangeText={(text) => handleNestedChange("physiotherapyAssessment", "diagnosis", text)}
              multiline
            />
  
            <InputField
              label="Objetivos do Tratamento"
              value={formData.physiotherapyAssessment.treatmentGoals}
              onChangeText={(text) => handleNestedChange("physiotherapyAssessment", "treatmentGoals", text)}
              multiline
            />
  
            <InputField
              label="Conduta Fisioterapêutica"
              value={formData.physiotherapyAssessment.physiotherapeuticConduct}
              onChangeText={(text) => handleNestedChange("physiotherapyAssessment", "physiotherapeuticConduct", text)}
              multiline
            />
  
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
  
            <TouchableOpacity onPress={handleSubmit} style={styles.createButton}>
              <Text style={styles.createButtonText}>Salvar Avaliação</Text>
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 15,
      alignSelf: "flex-start",
      color: "#2A5C4E",
    },
    subSectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginVertical: 10,
      alignSelf: "flex-start",
      color: "#4A4A4A",
    },
    switchGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      marginVertical: 10,
    },
    switchItem: {
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    switchLabel: {
      fontSize: 14,
      color: "#333",
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    createButton: {
      backgroundColor: "#2A5C4E",
      padding: 15,
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
      marginVertical: 20,
    },
    createButtonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
    },
    backButton: {
      position: "absolute",
      top: 40,
      left: 20,
      zIndex: 1,
    },
  });