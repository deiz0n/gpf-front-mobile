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
import { useRecordAccess } from "../../../hooks/useRecordAccess";
import { useRouter } from "expo-router";

export default function Solicitacoes() {
  const { loading, error, handleRecordsSharedWithMe } = useRecordAccess();
  const [records, setRecords] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await handleRecordsSharedWithMe();
      if (response) {
        setRecords(response);
      }
    };
    fetchRecords();
  }, []);

  const handleViewRecord = (recordType: string, recordId: string) => {
    console.log(recordType, recordId);
    switch (recordType) {
      case "Trauma":
        router.push(`/specific-record/trauma-orthopedic-record/view/${recordId}`);
        break;
      case "Neurofunctional":
        router.push(`/specific-record/neurofunctional-record/view/${recordId}`);
        break;
      case "Cardio":
        router.push(`/specific-record/cardiorespiratory-record/view/${recordId}`);
        break;
      default:
        Alert.alert("Erro", "Tipo de registro desconhecido.");
    }
  };

  const handleSubmit = () => {
    router.push("/request-access")
  };

  return (
    <SafeAreaProvider>
      <Header />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Fichas compartilhadas</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.SubmitButton}>Solicitar</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#2A5C4E" />}

        {!loading && records.length === 0 && (
          <Text style={styles.noData}>Nenhuma ficha compartilhada.</Text>
        )}

        {!loading && records.length > 0 && (
          <ScrollView style={{ width: "100%" }}>
            {records.map((item) => (
              <View key={item.recordId} style={styles.card}>
                <Text style={styles.recordType}>{item.recordType}</Text>
                <Text style={styles.patientName}>
                  {item.name} {item.surname}
                </Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    handleViewRecord(item.recordType, item.patientId)
                  }
                >
                  <Text style={styles.viewButtonText}>Visualizar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {error && !loading && <Text style={styles.errorText}>{error}</Text>}
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
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  errorText: {
    textAlign: "center",
    color: "red",
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
  recordType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  patientName: {
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  SubmitButton: {
    fontSize: 16,
    backgroundColor: "#2A5C4E",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
  },
});
