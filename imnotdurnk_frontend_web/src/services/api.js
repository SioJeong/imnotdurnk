import axios from 'axios';

import useAuthStore from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
const apinologin = axios.create({
    baseURL: 'http://i11a609.p.ssafy.io:8080/api',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
});
const api = axios.create({
    baseURL: 'http://i11a609.p.ssafy.io:8080/api',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

//api 요청 전의 처리
api.interceptors.request.use(
    (config) => {
        // Zustand 이용해 useAuthStore에서 토큰을 가져와서 헤더에 추가
        const { accessToken } = useAuthStore();
        console.log(config, 'api요청 직전 처리', accessToken);
        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

//api 요청 후의 처리
api.interceptors.response.use(
    (response) => {
        // console.log('인터셉터 response : ', response);
        // const accessToken = response.headers['authorization'];
        // if (accessToken) {
        //     console.log('accessToken:', accessToken);
        //     useAuthStore.getState().setAccessToken(accessToken);
        // }
        return response;
    },
    async (error) => {
        const navigate = useNavigate();
        const { config, response } = error;
        const status = response ? response.status : null;
        const HttpStatus = response ? response.data.message : null;
        console.log('1.에러', HttpStatus, status);

        if (HttpStatus == 'UNAUTHORIZED' || status == 401) {
            //AT 없어?
            //기존 요청 우선 저장(추후에 재요청을 위해)
            const originalRequest = config;
            console.log('권한없음');
            //AT 재발급 시도
            try {
                const refreshResponse = await api.get('/auth/refresh', {
                    params: {
                        type: 'access',
                    },
                });
                const newAccessToken = refreshResponse.headers['Authorization'];
                console.log(newAccessToken, '새로 발급');
                useAuthStore.getState().setAccessToken(newAccessToken);
                originalRequest.headers['Authorization'] = { newAccessToken };
                console.log('되니?');
                return api(originalRequest);
            } catch (error) {
                console.error('Refresh token failed', error);
                //navigate('/login');
                return Promise.reject(error);
            }
            // 재발급 시도에서 401이 뜨면 RT이 없는걸로 로그아웃상태로 됨
            // navigate('/login');
            // 401이 아니면 새로 발급 받은 토큰 이용해 originalRequest 재요청
        }
        return Promise.reject(error);
    },
);
export default api;
