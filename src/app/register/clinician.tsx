import { ActivityIndicator, StyleSheet, ScrollView, Alert } from "react-native";
import { customFonts } from "../../hooks/useFonts";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { LogoGPF } from "../../components/Logo";
import { MainText } from "../../components/MainText";
import { InputField } from "../../components/InputField";
import { useEffect, useState } from "react";
import { ConfirmationButton } from "../../components/Button";
import { PasswordInput } from "../../components/PasswordInput";
import { EnumPicker } from "../../components/EnumPicker";
import { GenderType } from "../../../assets/enum";
import { useRouter } from "expo-router";
import { useClinician } from "../../hooks/useCliniciansRequest";

export default function RegisterClinician() {
  const fontsLoaded = customFonts();
  const router = useRouter();
  const { loading, error, handleRegister } = useClinician();
  const [formData, setFormData] = useState({
    name: undefined,
    surname: undefined,
    gender: "male",
    occupation: undefined,
    phoneNumber: undefined,
    email: undefined,
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await handleRegister(formData);

      if (response) {
        console.log("Sucesso", "Clínico registrado com sucesso!");
        Alert.alert("Sucesso", "Clínico registrado com sucesso!", [
          {
            text: "OK",
            onPress: () => router.push("/login/clinician"),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        error?.toString() || "Ocorreu um erro ao registrar o paciente."
      );
      console.log("ERRO:", error);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error);
      console.log("ERRO:", error);
    }
  }, [error]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <LogoGPF />

          {MainText(
            "Registre-se",
            "Insira as informações abaixo para registrar uma conta"
          )}

          <InputField
            label="Nome"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <InputField
            label="Sobrenome"
            value={formData.surname}
            onChangeText={(text) => handleInputChange("surname", text)}
          />
          <EnumPicker
            label="Selecione seu gênero"
            enumValues={GenderType}
            selectedValue={formData.gender}
            onValueChange={(text) => handleInputChange("gender", text)}
          />
          <InputField
            label="Ocupação"
            value={formData.occupation}
            onChangeText={(text) => handleInputChange("occupation", text)}
          />
          <InputField
            label="Número de telefone"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
          <InputField
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <PasswordInput
            label="Senha"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <ConfirmationButton onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
