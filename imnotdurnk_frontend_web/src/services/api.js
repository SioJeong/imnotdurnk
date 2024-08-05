import axios from 'axios';
const api = axios.create({
    baseURL: 'http://i11a609.p.ssafy.io:8080/api',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

//토큰 헤더에 담기
api.interceptors.request.use(
    (config) => {
        // Zustand 이용해 useAuthStore에서 토큰을 가져와서 헤더에 추가
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

//만료된 토큰 관리
//만료되면 refresh 이용해 access 재발급
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // const originalRequest = error.config;
        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true; // 토큰 재시도 플래그 설정
        //     try {
        //         // refreshToken 가져오기
        //         const refreshToken = useAuthStore.getState().refreshToken;
        //         // 서버에 refreshToken을 사용하여 새로운 accessToken 요청
        //         const response = await axios.get('/auth/refresh', {
        //             headers: {
        //                 Authorization: { refreshToken },
        //             },
        //         });
        //         const newAccessToken = response.data.accessToken;
        //         // 새로운 accessToken으로 originalRequest 재시도
        //         originalRequest.headers.Authorization = { newAccessToken };
        //         return axios(originalRequest);
        //     } catch (error) {
        //         // refreshToken이 만료되었거나 다른 오류 발생 시 예외 처리
        //         console.error('토큰 갱신 실패:', error);
        //         // 예: 로그아웃 처리 등
        //     }
        // }
        // return Promise.reject(error);
    },
);
export default api;
