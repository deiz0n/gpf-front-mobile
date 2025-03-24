import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Header = () => {
  const router = useRouter();
  
  const onProfilePress = () => {
    router.push("/profile");
  };

  const onNotificationsPress = () => {
    console.log("Não implementado");
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onNotificationsPress}>
          <MaterialIcons name="notifications" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress}>
          <MaterialIcons name="account-circle" size={28} color="#2F5D4E" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  logo: {
    width: 120,
    height: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
