/* eslint-disable import/no-unused-modules */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Router from './Router';
import theme from './shared/styles/theme';

const queryClient = new QueryClient();

const App = () => {
    // pretendard font 적용
    const [fontsLoaded] = useFonts({
        'Pretendard-Light': require('./assets/fonts/Pretendard-Light.ttf'),
        'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>폰트 로딩 중</Text>; // TODO: 추후 loading 컴포넌트로 변경 필요
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
