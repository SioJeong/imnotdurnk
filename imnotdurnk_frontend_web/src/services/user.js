import api from './api';
import apiErrorHandler from './apiErrorHandler';
// response body 형식 : httpStatus, message, statusCode, dataList

//[예시] 사용자 정보 가져오는 함수
const getUser = async (token) => {
    try {
        const response = await api.get(`/users`, {
            headers: {
                Authorization: { token },
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
        const accessToken = response.headers['authorization'];
        if (accessToken) {
            console.log('accessToken:', accessToken);
            localStorage.setItem('accessToken', accessToken);
        }
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

//이메일 인증, 인증번호 일치 여부 확인 api
const checkCertificationNumber = async (email, inputCertNum) => {
    try {
        const response = await api.post(`/users/signup/verify-code`, {
            email: email,
            code: inputCertNum,
        });
        const { statusCode, httpStatus, message } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);

        return {
            isSuccess: statusCode === 200,
            message: '이메일 인증 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 가져오는 중 오류 발생',
        };
    }
};
//유저 추가 정보 저장
const putUserDetailedInfo = async (
    nickname,
    postalCode,
    address,
    detailedAddress,
    emergencyCall,
) => {
    try {
        const response = await api.put(`/users/profile`, {
            nickname: nickname,
            postalCode: postalCode,
            address: address,
            detailedAddress: detailedAddress,
            emergencyCall: emergencyCall,
        });
        const { statusCode, httpStatus, message } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);

        return {
            isSuccess: statusCode === 200,
            message: '프로필 업데이트 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 보내는 중 오류 발생',
        };
    }
};

const getUserProfile = async () => {
    try {
        const response = await api.get(`/users/profile`);
        const { statusCode, httpStatus, message, data } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);
        console.log('겟프로필 response:', response);
        return {
            isSuccess: statusCode === 200,
            data: data,
            message: '프로필 정보 가져오기 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 보내는 중 오류 발생',
        };
    }
};

export {
    getUser,
    getUserProfile,
    login,
    putUserDetailedInfo,
    sendCertificationNumber,
    signup,
};
