import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthRecovery } from "../../hooks/useAuthRecovery";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { loading, handleForgotPassword } = useAuthRecovery();

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Erro", "Email em branco.");
      return;
    }

    try {
      const response = await handleForgotPassword(email);
      Alert.alert("Aviso", response.message, [
        { text: "OK", onPress: () => router.replace("/user-type") },
      ]);
      return;
    } catch (error) {
      const errorMessage = "Ocorreu um erro ao buscar o paciente.";
      Alert.alert("Erro", error?.toString() ?? errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Esqueceu a senha? </Text>

      <Text style={styles.label}>Insira seu email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Enviar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#2A5C4E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
