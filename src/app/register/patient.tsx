import { ActivityIndicator, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { customFonts } from '../../hooks/useFonts';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LogoGPF } from '../../components/Logo';
import { MainText } from '../../components/MainText';
import { InputField } from '../../components/InputField';
import { useEffect, useState } from 'react';
import { ConfirmationButton } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import { EnumPicker } from '../../components/EnumPicker';
import { GenderType } from '../../../assets/enum';
import { DatePicker } from '../../components/DatePicker';
import { usePatient } from '../../hooks/usePatientRequests';
import { useRouter } from 'expo-router';

export default function RegisterPatient() {
    const fontsLoaded = customFonts();
    const router = useRouter();
    const { loading, error, handleRegister } = usePatient();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        gender: 'male',
        birthDate: new Date().toISOString(),
        cpf: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        email: "",
        password: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await handleRegister(formData);

            if (response) {
                console.log("Sucesso", "Paciente registrado com sucesso!")
                Alert.alert("Sucesso", "Paciente registrado com sucesso!", [
                    {
                        text: "OK",
                        onPress: () => router.push('/login/patient'),
                    }
                ]);
            }
        } catch (error) {
            Alert.alert("Erro", error?.toString() || "Ocorreu um erro ao registrar o paciente.");
            console.log("ERRO:", error)
        }
    };

    useEffect(() => {
        if (error) {
            Alert.alert("Erro", error);
            console.log("ERRO:", error)
        }
    }, [error]);

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

                    <InputField
                        label="Nome"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                    />
                    <InputField
                        label="Sobrenome"
                        value={formData.surname}
                        onChangeText={(text) => handleInputChange('surname', text)}
                    />
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
                    <InputField
                        label="CPF"
                        value={formData.cpf}
                        onChangeText={(text) => handleInputChange('cpf', text)}
                    />
                    <InputField
                        label="Número de telefone"
                        value={formData.phoneNumber}
                        onChangeText={(text) => handleInputChange('phoneNumber', text)}
                    />
                    <InputField
                        label="Estado"
                        value={formData.state}
                        onChangeText={(text) => handleInputChange('state', text)}
                    />
                    <InputField
                        label="Cidade"
                        value={formData.city}
                        onChangeText={(text) => handleInputChange('city', text)}
                    />
                    <InputField
                        label="Rua"
                        value={formData.address}
                        onChangeText={(text) => handleInputChange('address', text)}
                    />
                    <InputField
                        label="Email"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                    />
                    <PasswordInput
                        label="Senha"
                        value={formData.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                    />

                    {loading && <ActivityIndicator size="large" color="#0000ff" />}

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