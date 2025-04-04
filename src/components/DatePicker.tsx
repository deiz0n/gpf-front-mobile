import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
    label: string;
    onDateChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (_: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            onDateChange(selectedDate.toISOString());
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Button title={date.toDateString()} onPress={() => setShowPicker(true)} />

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleChange}
                />
            )}
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
});
