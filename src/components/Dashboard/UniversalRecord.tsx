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
  TextInput,
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
  const [isEditing, setIsEditing] = useState(false);

  const [profession, setProfession] = useState("");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [medicationsInUse, setMedicationsInUse] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const {
    data: patientData,
    error: patientError,
    handleGetById
  } = usePatient();
  const {
    data: recordData,
    error: recordError,
    handleGetRecordById,
    handleUpdate
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
    if (recordData) {
      setProfession(recordData.universalMedicalRecord.profession || "");
      setEmergencyContactEmail(recordData.universalMedicalRecord.emergencyContactEmail || "");
      setEmergencyContactNumber(recordData.universalMedicalRecord.emergencyContactNumber || "");
      setMaritalStatus(recordData.universalMedicalRecord.maritalStatus || "");
      setHeight(recordData.universalMedicalRecord.height || "");
      setWeight(recordData.universalMedicalRecord.weight || "");
      setMedicationsInUse(
        recordData.universalMedicalRecord.medicationsInUse?.join(", ") || ""
      );
      setAllergies(
        recordData.universalMedicalRecord.allergies?.join(", ") || ""
      );
      setDiagnosis(
        recordData.universalMedicalRecord.diagnosis?.join(", ") || ""
      );
    }
  }, [recordData]);

  const handleSave = async () => {
    const updatedData = {
      profession,
      emergencyContactEmail,
      emergencyContactNumber,
      maritalStatus,
      height: parseInt(height),
      weight: parseInt(weight),
      medicationsInUse: medicationsInUse.split(",").map((item) => item.trim()),
      allergies: allergies.split(",").map((item) => item.trim()),
      diagnosis: diagnosis.split(",").map((item) => item.trim()),
    };

    try {
      await handleUpdate(userId, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

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
    setIsEditing(!isEditing);
  };

  const formatValue = (value: any) => {
    return value && value !== "" ? value : "Nenhum cadastrado";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prontuário</Text>
        {editable && isEditing && (
          <TouchableOpacity onPress={() => handleSave()}>
            <Text style={styles.editButton}>Salvar</Text>
          </TouchableOpacity>
        )}
        {editable && !isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
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
          <Text style={styles.value}>
            {new Date(patientData.patient.birthDate).toLocaleString("pt-BR", {
              timeZone: "UTC",
            })}
          </Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{patientData.patient.email}</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados médicos</Text>
        {isEditing ? (
          <>
            <Text style={styles.label}>Profissão:</Text>
            <TextInput
              style={styles.input}
              value={profession}
              onChangeText={setProfession}
            />
            <Text style={styles.label}>Email de Emergência:</Text>
            <TextInput
              style={styles.input}
              value={emergencyContactEmail}
              onChangeText={setEmergencyContactEmail}
            />
            <Text style={styles.label}>Número de Emergência:</Text>
            <TextInput
              style={styles.input}
              value={emergencyContactNumber}
              onChangeText={setEmergencyContactNumber}
            />
            <Text style={styles.label}>Estado Civil:</Text>
            <TextInput
              style={styles.input}
              value={maritalStatus}
              onChangeText={setMaritalStatus}
            />
            <Text style={styles.label}>Altura:</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
            />
            <Text style={styles.label}>Peso:</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
            />
            <Text style={styles.label}>Medicamentos em Uso:</Text>
            <TextInput
              style={styles.input}
              value={medicationsInUse}
              onChangeText={setMedicationsInUse}
            />
            <Text style={styles.label}>Alergias:</Text>
            <TextInput
              style={styles.input}
              value={allergies}
              onChangeText={setAllergies}
            />
            <Text style={styles.label}>Diagnósticos:</Text>
            <TextInput
              style={styles.input}
              value={diagnosis}
              onChangeText={setDiagnosis}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>
              Profissão:{" "}
              <Text style={styles.value}>{formatValue(profession)}</Text>
            </Text>
            <Text style={styles.label}>
              Email de Emergência:{" "}
              <Text style={styles.value}>{formatValue(emergencyContactEmail)}</Text>
            </Text>
            <Text style={styles.label}>
              Número de Emergência:{" "}
              <Text style={styles.value}>{formatValue(emergencyContactNumber)}</Text>
            </Text>
            <Text style={styles.label}>
              Estado Civil:{" "}
              <Text style={styles.value}>{formatValue(maritalStatus)}</Text>
            </Text>
            <Text style={styles.label}>
              Altura: <Text style={styles.value}>{formatValue(height)}</Text>
            </Text>
            <Text style={styles.label}>
              Peso: <Text style={styles.value}>{formatValue(weight)}</Text>
            </Text>
            <Text style={styles.label}>
              Medicamentos em Uso:{" "}
              <Text style={styles.value}>
                {medicationsInUse || "Nenhum cadastrado"}
              </Text>
            </Text>
            <Text style={styles.label}>
              Alergias:{" "}
              <Text style={styles.value}>
                {allergies || "Nenhuma cadastrada"}
              </Text>
            </Text>
            <Text style={styles.label}>
              Diagnósticos:{" "}
              <Text style={styles.value}>
                {diagnosis || "Nenhum cadastrado"}
              </Text>
            </Text>
          </>
        )}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
});
