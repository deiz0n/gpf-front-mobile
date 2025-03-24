import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../../../components/Dashboard/Header";
import { usePatient } from "../../../hooks/usePatientRequests";
import { useRouter } from "expo-router";

export default function Pacientes() {
  const { data, loading, error, handleFetch } = usePatient();
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
      console.log(error);
    }
  }, [error]);

  const fetchPatients = async (pageNumber: number) => {
    if (pageNumber < 1) return;
    await handleFetch(undefined, pageNumber);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const patients = data?.patients ?? [];

  const handleViewRecord = (patientId: string) => {
    router.push(`/view-universal-record/${patientId}`);
  };

  return (
    <SafeAreaProvider>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Pacientes</Text>

        {loading && <ActivityIndicator size="large" color="#2A5C4E" />}

        {!loading && patients.length === 0 && (
          <Text style={styles.noDataText}>Nenhum paciente encontrado.</Text>
        )}

        {!loading && patients.length > 0 && (
          <ScrollView style={{ width: "100%" }}>
            {patients.map((patient: any) => (
              <View key={patient.id} style={styles.card}>
                <Text style={styles.name}>
                  {patient.name} {patient.surname}
                </Text>

                <Text style={styles.cpf}>{patient.cpf}</Text>

                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleViewRecord(patient.id)}
                >
                  <Text style={styles.viewButtonText}>Prontuário</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[styles.pageButton, page === 1 && styles.disabledButton]}
            onPress={handlePrevPage}
            disabled={page === 1}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>Página {page}</Text>

          <TouchableOpacity style={styles.pageButton} onPress={handleNextPage}>
            <Text style={styles.buttonText}>Próxima</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cpf: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  viewButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2A5C4E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    alignItems: "center",
  },
  pageButton: {
    backgroundColor: "#2A5C4E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
