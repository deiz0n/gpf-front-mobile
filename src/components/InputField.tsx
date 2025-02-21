import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...textInputProps }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                style={styles.input} 
                placeholderTextColor="#999" 
                {...textInputProps}
            />
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
    input: {
        height: 48,
        backgroundColor: '#E5E5E5',
        borderRadius: 8, 
        paddingHorizontal: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default InputField;
