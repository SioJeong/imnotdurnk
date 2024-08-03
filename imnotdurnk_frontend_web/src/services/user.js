import useAuthStore from '@/stores/useAuthStore';
import api from './api';
import apiErrorHandler from './apiErrorHandler';
// response body 형식 : httpStatus, message, statusCode, dataList

//[예시] 사용자 정보 가져오는 함수
const getUser = async (token) => {
    try {
        const response = await api.get(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { statusCode, httpStatus, message, dataList } = response.data;

        apiErrorHandler(statusCode, httpStatus, message);

        return dataList;
    } catch (err) {
        throw new Error(err.message || '데이터 가져오는 중 오류 발생');
    }
};

//로그인
const login = async (email, password) => {
    try {
        const response = await api.post(`/users/login`, {
            email: email,
            password: password,
        });
        const { accessToken } = response.headers.authorization;

        if (accessToken) {
            useAuthStore.getState().setAccessToken(accessToken);
        }
        console.log(accessToken, '로그인 결과 토큰여기있음', response);

        const { statusCode, httpStatus, message, dataList } = response.data;

        // apiErrorHandler(statusCode, httpStatus, message);
        return {
            isSuccess: statusCode === 200,
            message: '로그인 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 가져오는 중 오류 발생',
        };
    }
};

//회원가입 api 연결
const signup = async (name, email, phone, password) => {
    try {
        const response = await api.post(`/users/signup`, {
            name: name,
            email: email,
            phone: phone,
            password: password,
        });
        const { statusCode, httpStatus, message } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);

        return {
            isSuccess: statusCode === 201,
            message: '회원가입 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 가져오는 중 오류 발생',
        };
    }
};

//인증번호 보내기
const sendCertificationNumber = async (email) => {
    try {
        const response = await api.get(`/users/signup/verify`, {
            email: email,
        });
        const { statusCode, httpStatus, message } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);
        console.log(response.data);
        return {
            isSuccess: statusCode === 200,
            message: '인증번호 보내기 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 가져오는 중 오류 발생',
        };
    }
};
export { getUser, login, sendCertificationNumber, signup };
