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

const login = async (userEmail, userPassword) => {
    // try {
    //     const response = await api.post(`/users/login`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    //     const { statusCode, httpStatus, message, dataList } = response.data;
    //     apiErrorHandler(statusCode, httpStatus, message);
    //     return dataList;
    // } catch (err) {
    //     throw new Error(err.message || '데이터 가져오는 중 오류 발생');
    // }
};

export { getUser, login };
