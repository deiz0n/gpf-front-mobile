import { StyleSheet, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../../../components/Dashboard/Header";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import UniversalRecord from "../../../components/Dashboard/UniversalRecord";

export default function Prontuario() {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await SecureStore.getItemAsync("user_id");
      setUserId(id);
    };

    fetchUserId();
  }, []);

  return (
    <SafeAreaProvider>
      <Header />
      <SafeAreaView style={styles.container}>
        {userId ? <UniversalRecord userId={userId} editable={true} /> : <ActivityIndicator size="large" color="#2A5C4E" />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    color: "#000",
  },
});
