import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com', // TODO: 추후 backend 경로로 수정
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
});

export default api;
