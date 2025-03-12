import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { registerRootComponent } from 'expo';
import { Link } from 'expo-router';

export default function App () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Index</Text>
            <Link href={"/user-type"} style={styles.textLink}>Ir para Tipo de usuário</Link>
            <Link href={"/login/patient"} style={styles.textLink}>Ir para login de paciente</Link>
            <Link href={"/login/clinician"} style={styles.textLink}>Ir para login de clínico</Link>
            <Link href={"/register-clinician"} style={styles.textLink}>Ir para cadastro de clínico</Link>
            <Link href={"/register-patient"} style={styles.textLink}>Ir para cadastro de paciente</Link>
        </View>
    );
};

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
    },
    textLink: {
        fontSize: 20,
        color: 'blue',
    }
});

// registerRootComponent(App);