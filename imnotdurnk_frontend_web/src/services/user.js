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
    console.log(email, password);
    try {
        const response = await api.post(`/users/login`, {
            email: email,
            password: password,
        });

        console.log('성공', response);
        // const { statusCode, httpStatus, message, dataList } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);
        // return dataList;
    } catch (err) {
        console.log('실패');
        throw new Error(err.message || '데이터 가져오는 중 오류 발생');
    }
};

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
        console.log(
            'ddd',
            statusCode,
            httpStatus,
            message,
            statusCode === 201 ? true : false,
        );
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
export { getUser, login, signup };
