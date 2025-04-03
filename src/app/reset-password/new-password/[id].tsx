import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthRecovery } from "../../../hooks/useAuthRecovery";
import { PasswordInput } from "../../../components/PasswordInput";

export default function ForgotPassword() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { loading, error, handleResetPassword } = useAuthRecovery();

  const handleSubmit = async () => {
    if (!password) {
      Alert.alert("Erro", "A senha não pode ficar em branco.");
      return;
    }

    const response = await handleResetPassword(id, password);

    if (response && response.message === "Successfully reset password") {
      Alert.alert("Sucesso", "Sua senha foi atualizada com sucesso.", [
        {
          text: "OK",
          onPress: () => router.replace("/user-type"),
        },
      ]);
    } else {
      const errorMsg = response?.message || "Não foi possível atualizar a senha.";
      Alert.alert("Aviso", errorMsg);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Insira sua nova senha</Text>

      <PasswordInput
        value={password}
        label="Senha"
        onChangeText={setPassword}
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
