import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 50 },
      }}
    >
      <Tabs.Screen
        name="pacientes"
        options={{
          headerShown: false,
          tabBarLabel: "Pacientes",
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <FontAwesome name="home" size={size} color={color} />;
            }

            return <FontAwesome name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="fichas"
        options={{
          headerShown: false,
          tabBarLabel: "Fichas",
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <FontAwesome name="book" size={size} color={color} />;
            }

            return <FontAwesome name="book" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="solicitacoes"
        options={{
          tabBarLabel: "Solicitações",
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <FontAwesome name="universal-access" size={size} color={color} />;
            }

            return <FontAwesome name="universal-access" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          tabBarLabel: "Sobre",
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <FontAwesome name="info-circle" size={size} color={color} />;
            }

            return <FontAwesome name="info-circle" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
