import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';
import { logout } from '../services/user';
import useLocationStore from '../stores/useLocationStore';


const Home = () => {
    const { resetDepartureAndDestination } = useLocationStore();
    const navi = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            // Home 화면으로 오면 전역의 출발지와 목적지 초기화
            resetDepartureAndDestination();
        }, [ resetDepartureAndDestination]),
    );

    const handleMessage = async (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log(data); // 추후 삭제 예정
            if (data.type === 'login') {
                // 로그인 토큰을 AsyncStorage에 저장
                await AsyncStorage.setItem('authToken', data.accessToken);
                await AsyncStorage.setItem('expiryTime', data.expiryTime);
                console.log('Token saved successfully:', data.accessToken);
                // 추가적인 로그인 후처리를 여기에 작성
            } else if (data.type === 'logout') {
                // 로그아웃 처리
                await logout();
            } else if (data.type === 'Map') {
                // Map 컴포넌트로 네비게이트
                console.log('Map 버튼을 누름'); // 추후 삭제 예정
                navi.navigate('Map');
            }
        } catch (error) {
            console.error('Failed to handle message:', error);
        }
    };

    return <WebView source={{ uri: 'https://i11a609.p.ssafy.io' }} onMessage={handleMessage} />;
};

export default Home;
