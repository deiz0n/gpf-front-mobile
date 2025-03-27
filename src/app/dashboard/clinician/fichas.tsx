import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Header } from "../../../components/Dashboard/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const fichas = [
  { id: "1", title: "Cardiorrespiratório", route: "/specific-record/cardiorespiratory-record/clinician-list" },
  { id: "2", title: "Neurofuncional", route: "/specific-record/neurofunctional-record/clinician-list" },
  { id: "3", title: "Trauma Ortopédico", route: "/specific-record/trauma-orthopedic-record/clinician-list" },
];

const FichaItem = ({ title, route }: { title: string; route: string }) => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push(route)}>
        <Text style={styles.buttonText}>Visualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Fichas() {
  return (
    <SafeAreaProvider>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Listas de fichas</Text>
        <FlatList
          data={fichas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FichaItem title={item.title} route={item.route} />}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1F4B38",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
