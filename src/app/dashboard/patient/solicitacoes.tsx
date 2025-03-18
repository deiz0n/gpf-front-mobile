import { View, StyleSheet, Text } from "react-native";

export default function Solicitacoes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Solicitações</Text>
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