import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import { customFonts } from '../hooks/useFonts';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LogoGPF } from '../components/Logo';
import { MainText } from '../components/MainText';
import InputField from '../components/InputField';
import { useState } from 'react';
import { ConfirmationButton } from '../components/Button';
import { PasswordInput } from '../components/PasswordInput';
import { EnumPicker } from '../components/EnumPicker';
import { GenderType } from '../../assets/enum';

export default function RegisterClinician() {
    const fontsLoaded = customFonts();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        occupation: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Dados do formulário:', formData);
    };

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <LogoGPF />

                    {MainText(
                        'Registre-se',
                        'Insira as informações abaixo para registrar uma conta'
                    )}

                    <InputField label="Nome" onChangeText={(text) => handleInputChange('name', text)} />
                    <InputField label="Sobrenome" onChangeText={(text) => handleInputChange('surname', text)} />
                    <EnumPicker
                        label="Selecione seu gênero"
                        enumValues={GenderType}
                        selectedValue={formData.gender}
                        onValueChange={(text) => handleInputChange('gender', text)}
                    />
                    <InputField label="Ocupação" onChangeText={(text) => handleInputChange('occupation', text)} />
                    <InputField label="Número de telefone" onChangeText={(text) => handleInputChange('phoneNumber', text)} />
                    <InputField label="Email" onChangeText={(text) => handleInputChange('email', text)} />
                    <PasswordInput
                        label="Senha"
                        value={formData.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                    />
                    <ConfirmationButton onPress={handleSubmit} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});
