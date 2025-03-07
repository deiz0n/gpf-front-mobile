import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { ConfirmationButton } from '../components/Button';
import { LogoGPF } from '../components/Logo';
import { MainText } from '../components/MainText';
import { Link } from '../components/Link';
import { customFonts } from '../hooks/useFonts';
import { useLoginRequest } from '../hooks/useLoginRequest';


export default function Login() {
    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');
    const fontsLoaded = customFonts();
    const { postData, loading, error, response } = useLoginRequest("https://blackwell.onrender.com/auth/patient");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const handleLogin = async () => {
        if (!email || !password) return;
        const requestLogin = { email, password };
        await postData(requestLogin);
        setEmail("");
        setPassword("");
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

                    <View style={{ alignSelf: 'center', width: 300 }}>
                        <Text
                            style={styles.text}
                        >Email
                        </Text>
                    </View>
                    <TextInput
                        value={email}
                        style={styles.input}
                        onChangeText={setEmail}
                    />

                    <View style={{ alignSelf: 'center', width: 300 }}>
                        <Text
                            style={styles.text}
                        >Senha
                        </Text>
                    </View>
                    <TextInput
                        value={password}
                        style={styles.input}
                        onChangeText={setPassword}
                    />

                    <Link url='#' style={styles.recovery}>Esqueceu sua senha?</Link>

                    <ConfirmationButton onPress={() => handleLogin()} />

                    <Text style={styles.createAccount}>Não possui uma conta?</Text>
                    <Link url='#' style={{ color: '#2A5C4E', }}>Cadastre-se</Link>
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