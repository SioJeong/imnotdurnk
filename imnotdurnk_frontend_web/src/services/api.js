import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.35.18.155',
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
});

export default api;
