import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface EnumPickerProps<T> {
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
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    {Object.entries(enumValues).map(([key, value]) => (
                        <Picker.Item 
                            key={key} 
                            label={value} 
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
    },
    picker: {
        height: 48,
        width: "100%",
        flex: 1,
    },
});
