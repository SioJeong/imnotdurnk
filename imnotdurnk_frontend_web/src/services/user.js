import { jwtDecode } from 'jwt-decode';
import { api, apiNoToken } from './api';
import apiErrorHandler from './apiErrorHandler';
// response body 형식 : httpStatus, message, statusCode, dataList
//[예시] 사용자 정보 가져오는 함수
const getUser = async () => {
    try {
        const response = await api.get(`/users`, {});

        const { statusCode, httpStatus, message, dataList } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        return dataList;
    } catch (err) {
        throw new Error(err.message || '데이터 가져오는 중 오류 발생');
    }
};

//토큰->변수 저장 로그인
const login = async (email, password) => {
    try {
        const response = await api.post(`/users/login`, {
            email: email,
            password: password,
        });
        const accessToken = response.headers['authorization'];

        const { statusCode, httpStatus } = response.data;

        if (statusCode === 200) {
            // 토큰 디코딩
            const decodedToken = jwtDecode(accessToken);
            const expiryTime = decodedToken.exp * 1000; // 초 단위를 밀리초로 변환

            // 로그인 성공 시 네이티브 앱에 메시지 전송
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'login',
                    accessToken: accessToken,
                    expiryTime: expiryTime,
                }),
            );
        }

        return {
            isSuccess: statusCode === 200,
            message: '로그인 성공',
            accessToken: accessToken,
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
        const response = await apiNoToken.get(`/users/signup/verify`, {
            params: {
                email: email,
            },
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
        const response = await apiNoToken.post(`/users/signup/verify-code`, {
            email: email,
            verifyCode: inputCertNum,
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
const putUserDetailedInfo = async (editProfile) => {
    try {
        const response = await api.put(`/users/profile`, editProfile);
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
        const response = await api.get(`/users/profile`, {});
        const { statusCode, httpStatus, message, data } = response.data;
        //apiErrorHandler(statusCode, httpStatus, message);
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

//비번 재전송
const sendNewPassword = async (email) => {
    try {
        const response = await api.get(`/users/login/find-password`, {
            params: {
                email: email,
            },
        });
        const { statusCode, httpStatus, message, data } = response.data;
        //apiErrorHandler(statusCode, httpStatus, message);
        return {
            isSuccess: statusCode === 200,
            data: data,
            message: '인증번호 보내기 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 보내는 중 오류 발생',
        };
    }
};

const logout = async () => {
    try {
        const response = await api.post(`/users/logout`);

        const { statusCode, httpStatus } = response.data;

        if (statusCode === 200) {
            // 로그아웃 성공 시 네이티브 앱에 메시지 전송
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'logout',
                }),
            );
        }

        return {
            isSuccess: statusCode === 200,
            message: '로그아웃 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 가져오는 중 오류 발생',
        };
    }
};

const deleteAccount = async (passwordForDelete) => {
    try {
        const response = await api.post(`/users/delete-account`, {
            password: passwordForDelete,
        });

        const { statusCode, httpStatus } = response.data;

        return {
            isSuccess: statusCode === 200,
            message: '회원탈퇴 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 가져오는 중 오류 발생',
        };
    }
};

const changePassword = async (currentPassword, newpassword) => {
    try {
        const response = await api.post(`/users/update-password`, {
            prevPassword: currentPassword,
            newPassword: newpassword,
        });

        const { statusCode, httpStatus } = response.data;

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
export {
    changePassword,
    checkCertificationNumber,
    deleteAccount,
    getUser,
    getUserProfile,
    login,
    logout,
    putUserDetailedInfo,
    sendCertificationNumber,
    sendNewPassword,
    signup,
};
