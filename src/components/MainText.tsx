import React from "react";
import { Text, StyleSheet, View } from "react-native";

export const MainText = (mainText: string, subTitle: string) => {
    return (
        <View>
            <Text style={styles.text}>{mainText}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontFamily: 'RobotoSlab-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    subTitle: {
        fontFamily: 'RobotoSlab-Regular',
        textAlign: 'center',
        fontSize: 14,
        width: 250,
        marginBottom: 35,
    }
});