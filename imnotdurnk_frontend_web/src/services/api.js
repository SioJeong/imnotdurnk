import axios from 'axios';

const api = axios.create({
    baseURL: 'http://i11a609.p.ssafy.io/',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 자격 증명 포함
});

export default api;
