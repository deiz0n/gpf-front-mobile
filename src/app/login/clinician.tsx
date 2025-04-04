import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { ConfirmationButton } from "../../components/Button";
import { LogoGPF } from "../../components/Logo";
import { MainText } from "../../components/MainText";
import { Link } from "../../components/Link";
import { customFonts } from "../../hooks/useFonts";
import { useAuth } from "../../hooks/useLoginRequest";
import { PasswordInput } from "../../components/PasswordInput";
import { InputField } from "../../components/InputField";
import { useRouter } from "expo-router";

export default function Login() {
  const fontsLoaded = customFonts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, handleClinicianLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
      console.log("ERRO:", error);
    }
  }, [error]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  const handleSubmit = async () => {
    try {
      const success = await handleClinicianLogin({ email, password });
      if (success) {
        router.replace("/dashboard/clinician");
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        error?.toString() || "Ocorreu um erro ao logar o clínico."
      );
      console.log("ERRO:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            {LogoGPF()}

            {MainText(
              "Entre com E-mail",
              "Insira seu e-mail e senha que foram adicionados no cadastro"
            )}

            <InputField label="Email" value={email} onChangeText={setEmail} />

            <PasswordInput
              value={password}
              label="Senha"
              onChangeText={setPassword}
            />

            <Link url="/reset-password/forgot-password" style={styles.recovery}>Esqueceu sua senha?</Link>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <ConfirmationButton onPress={() => handleSubmit()} />

            <Text style={styles.createAccount}>Não possui uma conta?</Text>
            <Link url="/register/clinician" style={{ color: "#2A5C4E" }}>
              Cadastre-se
            </Link>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    marginBlock: 0,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    width: 300,
    backgroundColor: "#BDBFC1",
    opacity: 0.35,
  },
  text: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "medium",
    alignItems: "flex-start",
    color: "#050404",
    fontFamily: "Inter",
  },
  recovery: {
    fontSize: 14,
    fontFamily: "RobotoSlab-Regular",
    color: "#2A5C4E",
    alignSelf: "center",
    width: 300,
    marginBottom: 35,
  },
  createAccount: {
    fontSize: 14,
    fontFamily: "RobotoSlab-Regular",
    color: "#000",
    alignSelf: "center",
    marginTop: 40,
  },
});
