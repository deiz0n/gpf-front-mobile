import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

interface LinkProps {
    url: string;
    children: React.ReactNode;
    style: TextStyle;
}

export const Link = ({ url, children, style }: LinkProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(url)
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.linkText, style]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    linkText: {
        color: '#1E90FF',
        textDecorationLine: 'none',
        // width: 300,
    },
});

