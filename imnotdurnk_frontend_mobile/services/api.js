import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiNoToken = axios.create({
    baseURL: 'https://i11a609.p.ssafy.io/api',
});

const api = axios.create({
    baseURL: 'https://i11a609.p.ssafy.io/api', // 원격용2
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

// API 요청 전의 처리
api.interceptors.request.use(
    async (config) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['Authorization'] = accessToken;
            }
        } catch (error) {
            console.error('Error reading token from AsyncStorage:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

let isTokenRefreshing = false; //토큰 요청 상태 저장

// API 요청 후의 처리
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { config, response } = error;

        if (response && response.data && response.data.statusCode === 401) {
            // AT가 없는 경우 401 에러가 발생
            const originalRequest = config;

            // AT 재발급 시도
            if (!isTokenRefreshing) {
                isTokenRefreshing = true;
                try {
                    const refreshResponse = await api.get('/auth/refresh', {
                        params: {
                            type: 'access',
                        },
                    });
                    const newAccessToken = refreshResponse.headers['authorization'];
                    await AsyncStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers['Authorization'] = newAccessToken;

                    isTokenRefreshing = false;
                    return api(originalRequest);
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    isTokenRefreshing = false;
                    
                    return Promise.reject(error);
                }
            }
        }
        return Promise.reject(error);
    },
);

export { api, apiNoToken };

