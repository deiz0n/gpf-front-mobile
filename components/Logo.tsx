import React from "react";
import { Image, StyleSheet } from "react-native";

export const LogoGPF = () => {
    return (
        <Image
            source={require('../assets/images/logo.png')}
            style={styles.image}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        // width: 100,
        // height: 100,
        // marginTop: 0,
        // paddingTop: 0,
        // resizeMode: 'cover',
        // alignSelf: 'center',
    }
});