import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../../../components/Dashboard/Header";
import { useRecordAccess } from "../../../hooks/useRecordAccess";

interface PendingUser {
  userId: string;
  name: string;
  surname: string;
  recordType: string;
}

export default function PendingAuthorizations() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handlePendingAuthorization, handleAuthorize } = useRecordAccess();

  useEffect(() => {
    const loadPendingUsers = async () => {
      try {
        const response = await handlePendingAuthorization();
        if (response) {
          setPendingUsers(response.pendingAuthorizationUsers);
        } else {
          setPendingUsers([]);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as solicitações.");
        console.log("ERRO:", error);
      } finally {
        setLoading(false);
      }
    };

    if (error) {
      Alert.alert("Erro", error);
      console.log("ERRO:", error);
    }

    loadPendingUsers();
  }, [error]);

  const handleAccept = async (user: PendingUser) => {
    const success = await handleAuthorize(user.userId, user.recordType, "accept");
  
    if (success) {
      Alert.alert("Sucesso", "Solicitação aceita.");
      setPendingUsers((prev) => prev.filter((u) => u.userId !== user.userId));
    } else {
      Alert.alert("Erro", "Não foi possível aceitar a solicitação.");
    }
  };
  
  const handleReject = async (user: PendingUser) => {
    const success = await handleAuthorize(user.userId, user.recordType, "reject");
  
    if (success) {
      Alert.alert("Sucesso", "Solicitação recusada.");
      setPendingUsers((prev) => prev.filter((u) => u.userId !== user.userId));
    } else {
      Alert.alert("Erro", "Não foi possível recusar a solicitação.");
    }
  };
  

  return (
    <SafeAreaProvider>
      <Header />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Solicitações</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2A5C4E" />
        ) : pendingUsers.length === 0 ? (
          <Text style={styles.noRequests}>
            Nenhum prontuário foi compartilhado com você
          </Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {pendingUsers.map((user) => (
              <View key={user.userId} style={styles.card}>
                <Text style={styles.userName}>
                  {user.name} {user.surname}
                </Text>
                <Text style={styles.recordType}>Ficha: {user.recordType}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAccept(user)}
                  >
                    <Text style={styles.buttonText}>Aceitar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(user)}
                  >
                    <Text style={styles.buttonText}>Recusar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  noRequests: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recordType: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: "#2A5C4E",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#B00020",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
