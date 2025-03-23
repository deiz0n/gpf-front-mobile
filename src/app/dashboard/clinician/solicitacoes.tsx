import { StyleSheet, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../../../components/Dashboard/Header";

export default function Solicitacoes() {
  return (
    <SafeAreaProvider>
      <Header />
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Solicitações</Text>
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
