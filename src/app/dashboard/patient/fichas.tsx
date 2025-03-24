import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useUniversalRecord } from "../../../hooks/useUniversalRecord";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Header } from "../../../components/Dashboard/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface RecordItem {
  id: string | null;
  type: string;
}

// Mapeia o tipo (rótulo) para a chave em specificMedicalRecordsIds
const recordTypes: RecordItem[] = [
  { type: "Cardiorespiratório", id: "cardiorespiratoryRecord" },
  { type: "Neurofuncional", id: "neurofunctionalRecord" },
  { type: "Trauma Ortopédico", id: "traumatoOrthopedicRecord" },
];

export default function MedicalRecordsList() {
  const { handleGetRecordById, loading, error } = useUniversalRecord();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync("user_id");
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      } catch (err) {
        Alert.alert("Erro", "Falha ao acessar o armazenamento seguro.");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!userId) return;
      const recordData = await handleGetRecordById(userId);
      // recordData deve ter a estrutura: { universalMedicalRecord: { ..., specificMedicalRecordsIds: { ... } } }
      if (
        recordData &&
        recordData.universalMedicalRecord &&
        recordData.universalMedicalRecord.specificMedicalRecordsIds
      ) {
        const availableRecords = recordTypes
          .map((record) => ({
            type: record.type,
            id: recordData.universalMedicalRecord.specificMedicalRecordsIds[
              record.id as keyof typeof recordData.universalMedicalRecord.specificMedicalRecordsIds
            ],
          }))
          .filter((record) => record.id !== null);
        setRecords(availableRecords);
      }
    };

    fetchRecords();
  }, [userId]);

  if (error) {
    Alert.alert("Erro", error);
  }

  const handleView = () => {
    console.log("Não implementado");
    Alert.alert("Aviso", "Funcionalidade não implementada.");
  };

  return (
    <SafeAreaProvider>
      <Header />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Fichas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2A5C4E"/>
        ) : (
          <>
            {records.length > 0 ? (
              records.map((record) => (
                <View key={record.id as string} style={styles.card}>
                  <Text style={styles.recordType}>{record.type}</Text>
                  <TouchableOpacity style={styles.viewButton} onPress={handleView}>
                    <Text style={styles.viewButtonText}>Visualizar</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noRecords}>Nenhuma ficha criada.</Text>
            )}
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#2A5C4E",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  viewButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  noRecords: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});
