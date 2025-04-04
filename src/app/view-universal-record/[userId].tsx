import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView
} from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import UniversalRecord from "../../components/Dashboard/UniversalRecord";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ViewUniversalRecord() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.content}>
          <UniversalRecord userId={userId} editable={false} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  backText: {
    marginLeft: 4,
    fontSize: 16,
    color: "#000",
  },
  content: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 16,
  },
});
