import { useFonts } from 'expo-font';

export const customFonts = () => {
    const [fontsLoaded] = useFonts({
        'RobotoSlab-Bold': require('../assets/fonts/RobotoSlab-Bold.ttf'),
        'RobotoSlab-Regular': require('../assets/fonts/RobotoSlab-Regular.ttf'),
    });

    return fontsLoaded;
};
