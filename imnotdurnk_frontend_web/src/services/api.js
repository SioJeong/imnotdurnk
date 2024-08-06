import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';
const apiNoToken = axios.create({
    baseURL: 'http://i11a609.p.ssafy.io:8080',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
});
const api = axios.create({
    baseURL: 'https://i11a609.p.ssafy.io/api',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

//변수 저장 시도
//api 요청 전의 처리
api.interceptors.request.use(
    (config) => {
        // Zustand 이용해 useAuthStore에서 토큰을 가져와서 헤더에 추가
        const { accessToken } = useAuthStore.getState();
        console.log(config, 'api요청 직전 처리', accessToken);
        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }

        return config;
    },
    (error) => {
        console.log('pre에서 에러');
        return Promise.reject(error);
    },
);

let isTokenRefreshing = false; //토큰 요청 상태 저장

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
        const { config, response } = error;
        // const status = response ? response.statusCode : null;
        // const HttpStatus = response ? response.HttpStatus : null;
        console.log('인터셉터 어싱크 에러 1 response : ', response);
        console.log(
            '인터셉터 어싱크 에러 2 status code:',
            response.data.statusCode,
        );

        if (response.data.statusCode === 401) {
            //AT 없어?
            //기존 요청 우선 저장(추후에 재요청을 위해)
            const originalRequest = config;
            console.log('인터셉터 어싱크 에러 3 401 뜸');

            //AT 재발급 시도
            if (!isTokenRefreshing) {
                isTokenRefreshing = true;

                console.log('인터셉터 어싱크 에러 4 이프 토큰 리프레싱');
                try {
                    const refreshResponse = await api.get('/auth/refresh', {
                        params: {
                            type: 'access',
                        },
                    });
                    console.log('인터셉터 어싱크 에러 5');
                    const newAccessToken =
                        refreshResponse.headers['Authorization'];

                    console.log('인터셉터 어싱크 에러 6');
                    console.log('refreshResponse', refreshResponse);
                    console.log(newAccessToken, '새로 발급');
                    useAuthStore.getState().setAccessToken(newAccessToken);
                    originalRequest.headers['Authorization'] = newAccessToken;

                    console.log('인터셉터 어싱크 에러 7');
                    isTokenRefreshing = false;
                    return api(originalRequest);
                } catch (error) {
                    console.error('토큰 재발급 실패', error);

                    console.log('인터셉터 어싱크 에러안 에러 8');
                    //navigate('/login');
                    return Promise.reject(error);
                }
            } else {
                console.log('인터셉터 어싱크 에러 엘스 9');
                console.log('else');
            }
            // 재발급 시도에서 401이 뜨면 RT이 없는걸로 로그아웃상태로 됨
            // navigate('/login');
            // 401이 아니면 새로 발급 받은 토큰 이용해 originalRequest 재요청
        }
        return Promise.reject(error);
    },
);

export { api, apiNoToken };
