import axios from 'axios';

const api = axios.create({
    baseURL: 'https://i11a609.p.ssafy.io/api',
});

export { api };

