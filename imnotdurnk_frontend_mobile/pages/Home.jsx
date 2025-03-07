import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';
import { checkLoginStatus, logout } from '../services/user';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';


const Home = () => {
    const { resetDepartureAndDestination } = useLocationStore();
    const { setNavigation } = useNavigationStore();
    const navi = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            // 네비게이션 제거
            setNavigation({
                isVisible: false,
                icon1: { iconname: 'empty', isRed: false },
                title: '',
                icon2: { iconname: 'empty', isRed: false },
            });

            const checkLogin = async () => {
                await checkLoginStatus();
            };
            
            checkLogin();

            // Home 화면으로 오면 전역의 출발지와 목적지 초기화
            resetDepartureAndDestination();
        }, [ resetDepartureAndDestination]),
    );

    const handleMessage = async (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'login') {
                // 로그인 토큰을 AsyncStorage에 저장
                await AsyncStorage.setItem('accessToken', data.accessToken);
                await AsyncStorage.setItem('expiryTime', String(data.expiryTime));
                // 추가적인 로그인 후처리를 여기에 작성
            } else if (data.type === 'logout') {
                // 로그아웃 처리
                await logout();
            } else if (data.type === 'Map') {
                // Map 컴포넌트로 네비게이트
                navi.navigate('Map');
            }
        } catch (error) {
        }
    };

    return <WebView source={{ uri: 'https://i11a609.p.ssafy.io' }} onMessage={handleMessage} injectedJavaScript={`
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = 'body { overflow-x: hidden; }';
        document.head.appendChild(style);
    `}/>;
};

export default Home;
