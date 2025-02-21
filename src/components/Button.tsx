import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ConfirmationButtonProps {
    onPress: () => unknown;
}

export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        marginTop: 40,
        margin: 12,
        padding: 10,
        borderRadius: 16,
        width: 278,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A5C4E',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Roboto Slab',
    },
});
