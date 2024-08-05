/* eslint-disable import/no-unused-modules */
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Layout from './components/_layout/Layout';
import Router from './Router';
import theme from './shared/styles/theme';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5분 동안 캐시된 데이터를 최신 값으로 간주하여 데이터 재요청 X (SNS의 일반적인 데이터 갱신 주기)
            cacheTime: 1000 * 60 * 10, // 10분 동안 캐시에 데이터를 유지
            retry: 3, // 네트워크 오류 등으로 쿼리 실패 시 3번 재시도
            refetchOnWindowFocus: true, // 브라우저 창이 다시 포커스 될 때 데이터 리패치
            refetchOnReconnect: true, // 네트워크가 다시 연결될 때 데이터 리패치
            refetchOnMount: true, // 컴포넌트가 마운트 될 때마다 데이터 리패치
            suspense: false, // 데이터 로딩 상태는 useQuery에서 직접 처리
        },
        mutations: {
            retry: 2, // 데이터 CRUD 실패 시 2번 재시도
        },
    },
});

const App = () => {
    // pretendard font 적용
    const [fontsLoaded] = useFonts({
        'Pretendard-Light': require('./assets/fonts/Pretendard-Light.ttf'),
        'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>폰트 로딩 중</Text>; // TODO: 추후 loading 컴포넌트로 변경 필요
    }

    const styles = StyleSheet.create({
        safeArea: {
            backgroundColor: theme.colors.white1,
            flex: 1,
        },
    });

    return (
        <>
            <SafeAreaView style={styles.safeArea}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <NavigationContainer>
                            <Layout>
                                <Router />
                            </Layout>
                        </NavigationContainer>
                    </ThemeProvider>
                </QueryClientProvider>
            </SafeAreaView>
            <StatusBar
                style="dark"
                translucent={false}
                backgroundColor="transparent"
            />
        </>
    );
};

export default App;
