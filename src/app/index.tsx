import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { setAuthToken } from "../services/api";
import { Redirect } from "expo-router";

export default function App() {
  const [loadingInit, setLoadingInit] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        const userData = await SecureStore.getItemAsync("user_id");
        const role = await SecureStore.getItemAsync("role");

        if (token && userData && role) {
          setAuthToken(token);

          switch (role) {
            case "PATIENT":
              setRedirectTo("/dashboard/patient");
              break;
            case "CLINICIAN":
              setRedirectTo("/dashboard/clinician");
              break;
            default:
              setRedirectTo("/user-type");
          }
        } else {
          setRedirectTo("/user-type");
        }
      } catch (error) {
        console.log("Erro ao carregar os dados do usuário", error);
        setRedirectTo("/user-type");
      } finally {
        setLoadingInit(false);
      }
    };

    loadUserData();
  }, []);

  if (redirectTo) {
    return <Redirect href={redirectTo} />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
