import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import { customFonts } from '../hooks/useFonts';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LogoGPF } from '../components/Logo';
import { MainText } from '../components/MainText';
import { InputField } from '../components/InputField';
import { useState } from 'react';
import { ConfirmationButton } from '../components/Button';
import { PasswordInput } from '../components/PasswordInput';
import { EnumPicker } from '../components/EnumPicker';
import { GenderType } from '../../assets/enum';
import { DatePicker } from '../components/DatePicker';

export default function RegisterPatient() {
    const fontsLoaded = customFonts();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: 'male',
        birthDate: new Date().toISOString(),
        cpf: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
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
                        "Registre-se",
                        "Insira as informações abaixo para registrar uma conta"
                    )}

                    <InputField label="Nome" onChangeText={(text) => handleInputChange('name', text)} />
                    <InputField label="Sobrenome" onChangeText={(text) => handleInputChange('surname', text)} />
                    <EnumPicker
                        label="Selecione seu gênero"
                        enumValues={GenderType}
                        selectedValue={formData.gender}
                        onValueChange={(text) => handleInputChange('gender', text)}
                    />
                    <DatePicker
                        label="Data de nascimento"
                        onDateChange={(date) => handleInputChange("birthDate", date)}
                    />
                    <InputField label="CPF" onChangeText={(text) => handleInputChange('cpf', text)} />
                    <InputField label="Número de telefone" onChangeText={(text) => handleInputChange('phoneNumber', text)} />
                    <InputField label="Estado" onChangeText={(text) => handleInputChange('address', text)} />
                    <InputField label="Cidade" onChangeText={(text) => handleInputChange('city', text)} />
                    <InputField label="Rua" onChangeText={(text) => handleInputChange('state', text)} />
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

