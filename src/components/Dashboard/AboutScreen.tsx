import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "./Header";

export default function AboutScreen() {
  return (
    <SafeAreaProvider>
      <Header />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>
            Sistema de Gestão de Prontuários de Fisioterapia
          </Text>
          <View style={styles.card}>
            <Text style={styles.text}>
              Nosso sistema foi desenvolvido para fornecer uma plataforma
              segura, intuitiva e eficiente para o acompanhamento de prontuários
              de fisioterapia. Com ele, pacientes e profissionais de saúde podem
              acessar e gerenciar informações de saúde de forma ágil e
              confiável.
            </Text>
            <Text style={styles.subtitle}>Funcionalidades Principais:</Text>
            <Text style={styles.boldText}>Acesso Simplificado:</Text>
            <Text style={styles.text}>
              Usuários podem fazer login e visualizar seus dados de saúde com
              apenas alguns cliques.
            </Text>
            <Text style={styles.boldText}>Informações Detalhadas:</Text>
            <Text style={styles.text}>
              Inclui seções abrangentes para diagnóstico fisioterapêutico,
              exames, anamnese e muito mais.
            </Text>
            <Text style={styles.boldText}>Segurança Prioritária:</Text>
            <Text style={styles.text}>
              Garantimos a proteção dos dados através de autenticação segura e
              criptografia.
            </Text>
            <Text style={styles.boldText}>Navegação Intuitiva:</Text>
            <Text style={styles.text}>
              Interface moderna e amigável para todos, independentemente de
              habilidades técnicas.
            </Text>
            <Text style={styles.boldText}>Suporte Multidisciplinar:</Text>
            <Text style={styles.text}>
              Integra diferentes tipos de fichas, como Neurofuncional,
              Cardiopulmonar e Ortopédica.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#E0E0E0",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});
