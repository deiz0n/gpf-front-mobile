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
  import { 
    ColorType, 
    DischargeType, 
    SecretionVolumeType, 
    SecretionFrequencyType, 
    ChestShapeType, 
    PhysicalSignType 
  } from "../../../../../assets/enum";
  import { useLocalSearchParams, useRouter } from "expo-router";
  import * as SecureStore from "expo-secure-store";
  import { useCardio } from "../../../../hooks/useSpecificRecord/useCardioRecord";
  import Ionicons from "@expo/vector-icons/Ionicons";
  
  export default function CardiorespiratoryEvaluation() {
    const fontsLoaded = customFonts();
    const router = useRouter();
    const { patientId } = useLocalSearchParams<{ patientId: string }>();
    const { loading, error, handleRegister } = useCardio();
  
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
      physicalInspection: {
        isFaceSinusPalpationHurtful: false,
        nasalSecretion: {
          type: "purulent",
          isFetid: false,
          quantity: "large"
        },
        nasalItching: "intermittent",
        sneezing: "intermittent",
        chestType: "kyphotic",
        respiratoryOrCardiacSigns: "accessory"
      },
      VitalSigns: {
        heartRate: 0,
        respiratoryRate: 0,
        bloodPressure: {
          systolic: 0,
          diastolic: 0
        },
        temperature: 0,
        oxygenSaturation: 0
      },
      pneumofunctionalAssessment: {
        peakFlow: {
          firstMeasurement: 0,
          secondMeasurement: 0,
          thirdMeasurement: 0
        },
        manovacuometry: {
          pemax: {
            firstMeasurement: 0,
            secondMeasurement: 0,
            thirdMeasurement: 0
          },
          pimax: {
            firstMeasurement: 0,
            secondMeasurement: 0,
            thirdMeasurement: 0
          }
        }
      },
      cardiofunctionalAssessment: {
        bmi: 0,
        abdominalPerimeter: 0,
        waistHipRatio: 0,
        bioimpedance: {
          bodyFat: 0,
          visceralFat: 0,
          muscleMassPercentage: 0
        },
        adipometry: {
          skinfoldMeasurements: {
            bicipital: 0,
            tricipital: 0,
            subscapular: 0,
            abdominal: 0
          }
        }
      }
    });
  
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
  
    const handleTripleNestedChange = <
      T extends keyof typeof formData,
      K extends keyof typeof formData[T],
      L extends keyof typeof formData[T][K],
      M extends keyof typeof formData[T][K][L]
    >(
      parent: T,
      child: K,
      subChild: L,
      field: M,
      value: typeof formData[T][K][L][M]
    ) => {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
            ...(typeof prev[parent] === "object" && prev[parent] !== null ? prev[parent] : {}),
          [child]: {
            ...prev[parent][child],
            [subChild]: {
              ...prev[parent][child][subChild],
              [field]: value
            }
          }
        }
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
            { text: "OK", onPress: () => router.back() }
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
              "Ficha Cardiorrespiratória",
              "Preencha os dados da avaliação cardiorrespiratória"
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
  
            {/* Inspeção Física */}
            <Text style={styles.sectionTitle}>Inspeção Física</Text>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Palpação de Seios da Face Dolorosa</Text>
              <Switch
                value={formData.physicalInspection.isFaceSinusPalpationHurtful}
                onValueChange={(val) => handleNestedChange("physicalInspection", "isFaceSinusPalpationHurtful", val)}
              />
            </View>
  
            <Text style={styles.subSectionTitle}>Secreção Nasal</Text>
            <EnumPicker
              label="Tipo de Secreção"
              enumValues={DischargeType}
              selectedValue={formData.physicalInspection.nasalSecretion.type}
              onValueChange={(val) => handleDeepNestedChange("physicalInspection", "nasalSecretion", "type", val)}
            />
  
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Secreção Fétida</Text>
              <Switch
                value={formData.physicalInspection.nasalSecretion.isFetid}
                onValueChange={(val) => handleDeepNestedChange("physicalInspection", "nasalSecretion", "isFetid", val)}
              />
            </View>
  
            <EnumPicker
              label="Volume da Secreção"
              enumValues={SecretionVolumeType}
              selectedValue={formData.physicalInspection.nasalSecretion.quantity}
              onValueChange={(val) => handleDeepNestedChange("physicalInspection", "nasalSecretion", "quantity", val)}
            />
  
            <EnumPicker
              label="Prurido Nasal"
              enumValues={SecretionFrequencyType}
              selectedValue={formData.physicalInspection.nasalItching}
              onValueChange={(val) => handleNestedChange("physicalInspection", "nasalItching", val)}
            />
  
            <EnumPicker
              label="Espirros"
              enumValues={SecretionFrequencyType}
              selectedValue={formData.physicalInspection.sneezing}
              onValueChange={(val) => handleNestedChange("physicalInspection", "sneezing", val)}
            />
  
            <EnumPicker
              label="Tipo de Tórax"
              enumValues={ChestShapeType}
              selectedValue={formData.physicalInspection.chestType}
              onValueChange={(val) => handleNestedChange("physicalInspection", "chestType", val)}
            />
  
            <EnumPicker
              label="Sinais Respiratórios/Cardíacos"
              enumValues={PhysicalSignType}
              selectedValue={formData.physicalInspection.respiratoryOrCardiacSigns}
              onValueChange={(val) => handleNestedChange("physicalInspection", "respiratoryOrCardiacSigns", val)}
            />
  
            {/* Sinais Vitais */}
            <Text style={styles.sectionTitle}>Sinais Vitais</Text>
            <InputField
              label="Frequência Cardíaca (bpm)"
              value={formData.VitalSigns.heartRate.toString()}
              onChangeText={(text) => handleNestedChange("VitalSigns", "heartRate", Number(text))}
              keyboardType="numeric"
            />
  
            <InputField
              label="Frequência Respiratória (rpm)"
              value={formData.VitalSigns.respiratoryRate.toString()}
              onChangeText={(text) => handleNestedChange("VitalSigns", "respiratoryRate", Number(text))}
              keyboardType="numeric"
            />
  
            <Text style={styles.subSectionTitle}>Pressão Arterial (mmHg)</Text>
            <View style={styles.rowContainer}>
              <InputField
                label="Sistólica"
                value={formData.VitalSigns.bloodPressure.systolic.toString()}
                onChangeText={(text) => handleDeepNestedChange("VitalSigns", "bloodPressure", "systolic", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="Diastólica"
                value={formData.VitalSigns.bloodPressure.diastolic.toString()}
                onChangeText={(text) => handleDeepNestedChange("VitalSigns", "bloodPressure", "diastolic", Number(text))}
                keyboardType="numeric"
              />
            </View>
  
            <InputField
              label="Temperatura (°C)"
              value={formData.VitalSigns.temperature.toString()}
              onChangeText={(text) => handleNestedChange("VitalSigns", "temperature", Number(text))}
              keyboardType="numeric"
            />
  
            <InputField
              label="Saturação de Oxigênio (%)"
              value={formData.VitalSigns.oxygenSaturation.toString()}
              onChangeText={(text) => handleNestedChange("VitalSigns", "oxygenSaturation", Number(text))}
              keyboardType="numeric"
            />
  
            {/* Avaliação Pneumofuncional */}
            <Text style={styles.sectionTitle}>Avaliação Pneumofuncional</Text>
            
            <Text style={styles.subSectionTitle}>Pico de Fluxo (L/min)</Text>
            <View style={styles.rowContainer}>
              <InputField
                label="1ª Medição"
                value={formData.pneumofunctionalAssessment.peakFlow.firstMeasurement.toString()}
                onChangeText={(text) => handleDeepNestedChange("pneumofunctionalAssessment", "peakFlow", "firstMeasurement", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="2ª Medição"
                value={formData.pneumofunctionalAssessment.peakFlow.secondMeasurement.toString()}
                onChangeText={(text) => handleDeepNestedChange("pneumofunctionalAssessment", "peakFlow", "secondMeasurement", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="3ª Medição"
                value={formData.pneumofunctionalAssessment.peakFlow.thirdMeasurement.toString()}
                onChangeText={(text) => handleDeepNestedChange("pneumofunctionalAssessment", "peakFlow", "thirdMeasurement", Number(text))}
                keyboardType="numeric"
              />
            </View>
  
            <Text style={styles.subSectionTitle}>Manovacuometria (cmH2O)</Text>
            <Text style={styles.subSectionTitle}>PEmax</Text>
            <View style={styles.rowContainer}>
              <InputField
                label="1ª Medição"
                value={formData.pneumofunctionalAssessment.manovacuometry.pemax.firstMeasurement.toString()}
                onChangeText={(text) => handleTripleNestedChange("pneumofunctionalAssessment", "manovacuometry", "pemax", "firstMeasurement", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="2ª Medição"
                value={formData.pneumofunctionalAssessment.manovacuometry.pemax.secondMeasurement.toString()}
                onChangeText={(text) => handleTripleNestedChange("pneumofunctionalAssessment", "manovacuometry", "pemax", "secondMeasurement", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="3ª Medição"
                value={formData.pneumofunctionalAssessment.manovacuometry.pemax.thirdMeasurement.toString()}
                onChangeText={(text) => handleTripleNestedChange("pneumofunctionalAssessment", "manovacuometry", "pemax", "thirdMeasurement", Number(text))}
                keyboardType="numeric"
              />
            </View>
  
            <Text style={styles.subSectionTitle}>PImax</Text>
            <View style={styles.rowContainer}>
              <InputField
                label="1ª Medição"
                value={formData.pneumofunctionalAssessment.manovacuometry.pimax.firstMeasurement.toString()}
                onChangeText={(text) => handleTripleNestedChange("pneumofunctionalAssessment", "manovacuometry", "pimax", "firstMeasurement", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="2ª Medição"
                value={formData.pneumofunctionalAssessment.manovacuometry.pimax.secondMeasurement.toString()}
                onChangeText={(text) => handleTripleNestedChange("pneumofunctionalAssessment", "manovacuometry", "pimax", "secondMeasurement", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="3ª Medição"
                value={formData.pneumofunctionalAssessment.manovacuometry.pimax.thirdMeasurement.toString()}
                onChangeText={(text) => handleTripleNestedChange("pneumofunctionalAssessment", "manovacuometry", "pimax", "thirdMeasurement", Number(text))}
                keyboardType="numeric"
              />
            </View>
  
            {/* Avaliação Cardiofuncional */}
            <Text style={styles.sectionTitle}>Avaliação Cardiofuncional</Text>
            
            <InputField
              label="IMC (kg/m²)"
              value={formData.cardiofunctionalAssessment.bmi.toString()}
              onChangeText={(text) => handleNestedChange("cardiofunctionalAssessment", "bmi", Number(text))}
              keyboardType="numeric"
            />
  
            <InputField
              label="Perímetro Abdominal (cm)"
              value={formData.cardiofunctionalAssessment.abdominalPerimeter.toString()}
              onChangeText={(text) => handleNestedChange("cardiofunctionalAssessment", "abdominalPerimeter", Number(text))}
              keyboardType="numeric"
            />
  
            <InputField
              label="Relação Cintura/Quadril"
              value={formData.cardiofunctionalAssessment.waistHipRatio.toString()}
              onChangeText={(text) => handleNestedChange("cardiofunctionalAssessment", "waistHipRatio", Number(text))}
              keyboardType="numeric"
            />
  
            <Text style={styles.subSectionTitle}>Bioimpedância</Text>
            <InputField
              label="% Gordura Corporal"
              value={formData.cardiofunctionalAssessment.bioimpedance.bodyFat.toString()}
              onChangeText={(text) => handleDeepNestedChange("cardiofunctionalAssessment", "bioimpedance", "bodyFat", Number(text))}
              keyboardType="numeric"
            />
  
            <InputField
              label="% Gordura Visceral"
              value={formData.cardiofunctionalAssessment.bioimpedance.visceralFat.toString()}
              onChangeText={(text) => handleDeepNestedChange("cardiofunctionalAssessment", "bioimpedance", "visceralFat", Number(text))}
              keyboardType="numeric"
            />
  
            <InputField
              label="% Massa Muscular"
              value={formData.cardiofunctionalAssessment.bioimpedance.muscleMassPercentage.toString()}
              onChangeText={(text) => handleDeepNestedChange("cardiofunctionalAssessment", "bioimpedance", "muscleMassPercentage", Number(text))}
              keyboardType="numeric"
            />
  
            <Text style={styles.subSectionTitle}>Adipometria (mm)</Text>
            <View style={styles.rowContainer}>
              <InputField
                label="Bicipital"
                value={formData.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.bicipital.toString()}
                onChangeText={(text) => handleTripleNestedChange("cardiofunctionalAssessment", "adipometry", "skinfoldMeasurements", "bicipital", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="Tricipital"
                value={formData.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.tricipital.toString()}
                onChangeText={(text) => handleTripleNestedChange("cardiofunctionalAssessment", "adipometry", "skinfoldMeasurements", "tricipital", Number(text))}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.rowContainer}>
              <InputField
                label="Subescapular"
                value={formData.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.subscapular.toString()}
                onChangeText={(text) => handleTripleNestedChange("cardiofunctionalAssessment", "adipometry", "skinfoldMeasurements", "subscapular", Number(text))}
                keyboardType="numeric"
              />
              <InputField
                label="Abdominal"
                value={formData.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.abdominal.toString()}
                onChangeText={(text) => handleTripleNestedChange("cardiofunctionalAssessment", "adipometry", "skinfoldMeasurements", "abdominal", Number(text))}
                keyboardType="numeric"
              />
            </View>
  
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
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 10,
    },
    halfInput: {
      width: "48%",
    },
    thirdInput: {
      width: "31%",
    },
  });