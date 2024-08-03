import useAuthStore from '@/stores/useAuthStore';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://i11a609.p.ssafy.io:8080/api',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

//만료될때의 새로 가져오는 로직이 필요한데 토큰 만료 확인을 서버/클라 어디서 하는질 모르겠어서 물어봐야함
api.interceptors.request.use(
    (config) => {
        // Zustand 스토어에서 토큰을 가져와서 헤더에 추가
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
export default api;
