import React from 'react';
import {StyleSheet, TextInput, Text, View, ActivityIndicator} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { ConfirmationButton } from './Button';
import { LogoGPF } from './Logo';
import { MainText } from './MainText';
import { Link } from './Link';
import { customFonts } from '../hooks/useFonts';


export const TextLabel = () => {
    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');
    const fontsLoaded = customFonts();

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
            <SafeAreaProvider>
                <SafeAreaView>
                    <View style={styles.container}>
                        {LogoGPF()}
                        
                        {MainText(
                            'Entre com E-mail', 
                            'Insira seu e-mail e senha que foram adicionados no cadastro'
                        )}
                        
                        <View style={{alignSelf: 'center', width: 300}}>
                            <Text
                                style={styles.text}
                            >Email
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                        />

                        <View style={{alignSelf: 'center', width: 300}}>
                            <Text
                                style={styles.text}
                            >Senha
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                        />


                        <Link url='#' style={styles.recovery}>Esqueceu sua senha?</Link>

                        {ConfirmationButton(() => console.log('Entrar'))}

                        <Text style={styles.createAccount}>Não possui uma conta?</Text>
                        <Link url='#' style={{color: '#2A5C4E', }}>Cadastre-se</Link>
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
    input: {
        height: 40,
        marginBlock: 0,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 16,
        width: 300,
        backgroundColor: '#BDBFC1',
        opacity: 0.35,
    },
    text: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'medium',
        alignItems: 'flex-start',
        color: '#050404',
        fontFamily: 'Inter',
    },
    recovery: {
        fontSize: 14,
        fontFamily: 'RobotoSlab-Regular',
        color: '#2A5C4E',
        alignSelf: 'center',
        width: 300,
        marginBottom: 35,
    },
    createAccount: {
        fontSize: 14,
        fontFamily: 'RobotoSlab-Regular',
        color: '#000',
        alignSelf: 'center',
        marginTop: 40,
    }
});