import React from 'react';
import {StyleSheet, View, ActivityIndicator, Pressable, Image, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { LogoGPF } from '../components/Logo';
import { MainText } from '../components/MainText';
import { customFonts } from '../hooks/useFonts';

export default function UserType() { 
    const fontsLoaded = customFonts();
    const router = useRouter();

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
            <SafeAreaProvider>
                <SafeAreaView>
                    <View style={styles.container}>
                        {LogoGPF()}
                        
                        {MainText(
                            'Quem é você?', 
                            'Selecione o tipo de usuário para continuar'
                        )}

                        <Pressable style={styles.button} onPress={() => router.push('/login/patient')}>
                            <Image source={require('../../assets/images/user-type/paciente.png')} style={styles.icon} />
                        </Pressable>

                        <Text style={styles.text}>Paciente</Text>

                        <Pressable style={styles.button} onPress={() => router.push('/login/clinician')}>
                            <Image source={require('../../assets/images/user-type/clinico.png')} style={styles.icon} />
                        </Pressable>

                        <Text style={styles.text}>Clínico</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        fontSize: 14,
        fontFamily: 'RobotoSlab-Regular',
        color: '#2A5C4E',
        alignSelf: 'center',
        width: 300,
        marginBottom: 35,
    },
    button: {
        width: 150,  
        height: 150, 
        borderRadius: 100,  
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2A5C4E'
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 16,
        fontFamily: 'RobotoSlab-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    }
});