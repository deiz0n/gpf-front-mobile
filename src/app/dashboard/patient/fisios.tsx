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
import { useClinician } from "../../../hooks/useCliniciansRequest";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../../../components/Dashboard/Header";

export default function Fisio() {
  const { data, loading, error, handleFetch } = useClinician();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchClinicians(page);
  }, [page]);

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
      console.log(error);
    }
  }, [error]);

  const fetchClinicians = async (pageNumber: number) => {
    if (pageNumber < 1) return;
    await handleFetch(pageNumber);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const clinicians = data?.clinicians ?? [];

  return (
    <SafeAreaProvider>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Fisioterapeutas</Text>

        {loading && <ActivityIndicator size="large" color="#2A5C4E" />}

        {!loading && clinicians.length === 0 && (
          <Text style={styles.noDataText}>
            Nenhum fisioterapeuta encontrado.
          </Text>
        )}

        {!loading && clinicians.length > 0 && (
          <ScrollView style={{ width: "100%" }}>
            {clinicians.map((clinician: any) => (
              <View key={clinician.id} style={styles.card}>
                <Text style={styles.name}>
                  {clinician.name} {clinician.surname}
                </Text>
                <Text style={styles.occupation}>{clinician.occupation}</Text>
                <Text style={styles.email}>{clinician.email}</Text>
                <Text style={styles.phone}>{clinician.phoneNumber}</Text>
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  occupation: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  phone: {
    fontSize: 14,
    color: "#666",
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
