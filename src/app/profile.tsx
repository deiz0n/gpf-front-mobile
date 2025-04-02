import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePatient } from "../hooks/usePatientRequests";
import { useClinician } from "../hooks/useCliniciansRequest";

export default function ProfileScreen() {
  const [role, setRole] = useState<"PATIENT" | "CLINICIAN" | null>(null);
  const { handleGetById: getPatientById, data: patientData, loading: loadingPatient, handleUpdate: updatePatient } = usePatient();
  const { handleGetById: getClinicianById, data: clinicianData, loading: loadingClinician, handleUpdate: updateClinician } = useClinician();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedRole = await SecureStore.getItemAsync("role");
        const userId = await SecureStore.getItemAsync("user_id");

        if (!storedRole || !userId) {
          router.replace("/user-type");
          return;
        }

        setRole(storedRole as "PATIENT" | "CLINICIAN");

        if (storedRole === "PATIENT") {
          await getPatientById(userId);
        } else {
          await getClinicianById(userId);
        }
      } catch (error) {
        Alert.alert("Erro", "Erro ao carregar os dados do usuário.");
        console.log("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSave = async (role: String) => {
    if (role === 'CLINICIAN' && clinicianData) {
      const updatedDataClinician = {
        name,
        surname,
        gender,
        occupation,
        phoneNumber,
        email
      };

      try {
        await updateClinician(clinicianData.clinician.id, updatedDataClinician);
      } catch (error) {
        console.log(error);
      }

    } else {
      const updatedDataPatient = {
        name,
        surname,
        phoneNumber,
        address,
        email
      };

      try {
        await updatePatient(patientData.patient.id, updatedDataPatient);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (!isEditing && clinicianData) {
      setName(clinicianData.clinician.name);
      setSurname(clinicianData.clinician.surname);
      setGender(clinicianData.clinician.gender);
      setOccupation(clinicianData.clinician.occupation);
      setPhoneNumber(clinicianData.clinician.phoneNumber);
      setEmail(clinicianData.clinician.email);
    }
    if (!isEditing && patientData) {
      setName(patientData.patient.name);
      setSurname(patientData.patient.surname);
      setGender(patientData.patient.gender);
      setPhoneNumber(patientData.patient.phoneNumber);
      setAddress(patientData.patient.address);
      setCity(patientData.patient.city);
      setState(patientData.patient.state);
      setEmail(patientData.patient.email);
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await SecureStore.deleteItemAsync("access_token");
            await SecureStore.deleteItemAsync("user_id");
            await SecureStore.deleteItemAsync("role");
            router.replace("/user-type");
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading || loadingPatient || loadingClinician) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Perfil</Text>

        <Ionicons
          name="person-circle-outline"
          size={120}
          color="#ccc"
          style={{ marginVertical: 10, alignSelf: "center" }}
        />

        {role === "PATIENT" && patientData && (
          isEditing ? (
            <>
              <Text style={styles.label}>Nome Completo:</Text>
              <TextInput
                style={styles.input}
                value={`${name} ${surname}`}
                onChangeText={(text) => {
                  const [firstName, lastName] = text.split(" ");
                  setName(firstName || "");
                  setSurname(lastName || "");
                }}
              />

              <Text style={styles.label}>Gênero:</Text>
              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
              />

              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

              <Text style={styles.label}>Endereço:</Text>
              <TextInput
                style={styles.input}
                value={`${address} ${city} ${state}`}
                onChangeText={(text) => {
                  const [address, city, state] = text.split("");
                  setAddress(address || "");
                  setCity(city || "");
                  setState(state || "");
                }}
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleSave("PATIENT")}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Nome Completo:</Text>
                <Text style={styles.value}>
                  {patientData.patient.name} {patientData.patient.surname}
                </Text>

                <Text style={styles.label}>Gênero:</Text>
                <Text style={styles.value}>{patientData.patient.gender}</Text>

                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.value}>{patientData.patient.phoneNumber}</Text>

                <Text style={styles.label}>Endereço:</Text>
                <Text style={styles.value}>
                  {patientData.patient.address}, {patientData.patient.city} - {patientData.patient.state}
                </Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{patientData.patient.email}</Text>
              </View>
            </>
          ))}

        {role === "CLINICIAN" && clinicianData && (
          isEditing ? (
            <>
              <Text style={styles.label}>Nome Completo:</Text>
              <TextInput
                style={styles.input}
                value={`${name} ${surname}`}
                onChangeText={(text) => {
                  const [firstName, lastName] = text.split(" ");
                  setName(firstName || "");
                  setSurname(lastName || "");
                }}
              />

              <Text style={styles.label}>Gênero:</Text>
              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
              />

              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

              <Text style={styles.label}>Especialização:</Text>
              <TextInput
                style={styles.input}
                value={occupation}
                onChangeText={setOccupation}
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleSave("CLINICIAN")}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Nome Completo:</Text>
                <Text style={styles.value}>
                  {clinicianData.clinician.name} {clinicianData.clinician.surname}
                </Text>

                <Text style={styles.label}>Gênero:</Text>
                <Text style={styles.value}>{clinicianData.clinician.gender}</Text>

                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.value}>{clinicianData.clinician.phoneNumber}</Text>

                <Text style={styles.label}>Especialização:</Text>
                <Text style={styles.value}>{clinicianData.clinician.occupation}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{clinicianData.clinician.email}</Text>
              </View>
            </>
          )
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 50,
    padding: 8,
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  button: {
    width: 120,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#006400",
  },
  logoutButton: {
    backgroundColor: "#8B0000",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  }
});
