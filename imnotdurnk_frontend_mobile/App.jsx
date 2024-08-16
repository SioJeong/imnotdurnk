/* eslint-disable import/no-unused-modules */
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Router from './Router';
import theme from './shared/styles/theme';
import useLocationStore from './stores/useLocationStore';

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

const BACKGROUND_LOCATION_TASK = 'background-location-task';

const defineBackgroundTask = () => {
    if (!TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK)) {
        TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }) => {
            if (error) {
                console.error('Background location task error:', error);
                return;
            }
            if (data) {
                const { locations } = data;
                if (locations && locations.length > 0) {
                    const { latitude, longitude } = locations[0].coords;
                    const coords = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    };
                    useLocationStore.getState().setCurrentLocation(coords);
                    console.log('Background location update:', coords);
                }
            }
        });
    }
};

const App = () => {
    // pretendard font 적용
    const [fontsLoaded] = useFonts({
        'Pretendard-Light': require('./assets/fonts/Pretendard-Light.ttf'),
        'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.ttf'),
    });

    // 앱 실행 시 위치 추적 권한 요청
    useEffect(() => {
        const requestLocationPermissions = async () => {
            try {
                const foregroundPermission =
                    await Location.requestForegroundPermissionsAsync();
                const backgroundPermission =
                    await Location.requestBackgroundPermissionsAsync();

                if (
                    foregroundPermission.status !== 'granted' ||
                    backgroundPermission.status !== 'granted'
                ) {
                    console.log('위치 권한이 거부되었습니다.');
                } else {
                    console.log('위치 권한이 허용되었습니다.');
                    defineBackgroundTask();
                }
            } catch (error) {
                console.error('위치 권한 요청 중 오류 발생:', error);
            }
        };

        requestLocationPermissions();
    }, []);

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
                        <NavigationContainer theme={theme}>
                            <Router />
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
