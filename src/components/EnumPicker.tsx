import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface EnumPickerProps<T extends Record<string, string>> {
    label: string;
    enumValues: T;
    selectedValue: string;
    onValueChange: (value: string) => void;
}

export const EnumPicker = <T extends Record<string, string>>({
    label,
    enumValues,
    selectedValue,
    onValueChange,
}: EnumPickerProps<T>) => {
    const enumKeys = Object.keys(enumValues).filter(
        (key) => typeof enumValues[key as keyof T] === "string"
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                    mode="dropdown"
                >
                    {enumKeys.map((key) => (
                        <Picker.Item
                            key={key}
                            label={enumValues[key as keyof T]}
                            value={key}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#000",
        marginBottom: 5,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#E5E5E5",
        minHeight: 48,
    },
    picker: {
        height: 50,
        width: "100%",
    },
});
