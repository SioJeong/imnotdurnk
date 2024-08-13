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

export { api, apiNoToken };

