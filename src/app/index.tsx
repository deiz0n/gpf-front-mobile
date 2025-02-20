import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { registerRootComponent } from 'expo';
import { Link } from 'expo-router';

export default function App () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Index</Text>
            <Link href={"/user-type"} style={styles.textLink}>Ir para Tipo de usuário</Link>
            <Link href={"/login"} style={styles.textLink}>Ir para login</Link>
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