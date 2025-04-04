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
import { useCardio } from "../../../../hooks/useSpecificRecord/useCardioRecord";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CardioList() {
  const { data, loading, error, handleFetchByClinicianId } = useCardio();
  const [page, setPage] = useState<number>(1);
  const [clinicianId, setClinicianId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    SecureStore.getItemAsync("user_id").then((id) => {
      if (id) {
        setClinicianId(id);
        fetchRecords(1, id);
      } else {
        console.error("Clinician ID not found");
      }
    });
  }, []);

  useEffect(() => {
    if (clinicianId) {
      fetchRecords(page, clinicianId);
    }
  }, [page]);

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
      console.log(error);
    }
  }, [error]);

  const fetchRecords = async (pageNumber: number, clinicianId: string) => {
    if (pageNumber < 1) return;
    await handleFetchByClinicianId(clinicianId, pageNumber);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  const records = data?.records ?? [];

  const handleViewRecord = (recordId: string) => {
    router.push(`/specific-record/cardiorespiratory-record/view/${recordId}`);
  };

  const handleCreateRecord = () => {
    router.push(`/specific-record/search-patient/cardio`);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Fichas Cardiorrespiratórias</Text>
        <TouchableOpacity
          onPress={handleCreateRecord}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Criar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {loading && <ActivityIndicator size="large" color="#2A5C4E" />}

        {!loading && records.length === 0 && (
          <Text style={styles.noDataText}>Nenhum registro encontrado.</Text>
        )}

        {!loading && records.length > 0 && (
          <ScrollView style={styles.scrollView}>
            {records.map((record: any) => (
              <View key={record.cardiorespiratoryRecordId} style={styles.card}>
                <Text style={styles.name}>
                  {record.name} {record.surname}
                </Text>

                <Text style={styles.date}>
                  Criado em: {new Date(record.createdAt).toLocaleDateString()}
                </Text>

                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleViewRecord(record.patientId)}
                >
                  <Text style={styles.viewButtonText}>Visualizar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
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
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
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
  backButton: {
    marginBottom: 15,
  },
});
