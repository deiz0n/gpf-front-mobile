import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChangeText }) => {
    const [secureText, setSecureText] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureText}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize="none"
                    keyboardType="default"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.icon}>
                    <Ionicons name={secureText ? "eye-off" : "eye"} size={20} color="#999" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E5E5E5",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 14,
    },
    icon: {
        padding: 10,
    },
});

