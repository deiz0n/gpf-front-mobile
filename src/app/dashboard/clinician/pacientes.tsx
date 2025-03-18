import { View, StyleSheet, Text } from "react-native";

export default function Pacientes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pacientes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        color: '#000',
    }
});