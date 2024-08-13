import { api, apiNoToken } from './api';
import apiErrorHandler from './apiErrorHandler';

const getTestSentence = async () => {
    try {
        const response = await apiNoToken.get('/game-logs/question', {});

        const { statusCode, httpStatus, message, data } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return data;
        }
    } catch (error) {
        throw new Error(
            error.message || '발음 게임 테스트 문장 가져오는 중 오류 발생',
        );
    }
};

// response body 형식 : httpStatus, message, statusCode, dataList
const sendVoiceRecord = async ({ formData }) => {
    try {
        const response = await apiNoToken.post('/voice/pronounce', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 5000, // 서버 요청 처리에 필요한 시간 5초로 설정
        });

        const { statusCode, httpStatus, message, data } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return data;
        }
    } catch (error) {
        throw new Error(error.message || '음성 전송 요청 중 오류 발생');
    }
};

const saveVoiceGameResult = async ({ data }) => {
    try {
        const response = await api.post('/voice/pronounce/save', data, {});

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return true;
        }
    } catch (error) {
        throw new Error(error.message || '음성 게임 결과 저장 중 오류 발생');
    }
};

const deleteVoiceGameResult = async ({ data }) => {
    try {
        const response = await api.post('/voice/pronounce/not-save', data, {});

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return true;
        }
    } catch (error) {
        throw new Error(error.message || '음성 게임 결과 저장 중 오류 발생');
    }
};

const saveRestGameResult = async ({ data }) => {
    try {
        const response = await api.post('/game-logs/save', data, {});

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return true;
        }
    } catch (error) {
        throw new Error(error.message || '음성 게임 결과 저장 중 오류 발생');
    }
};

export {
    deleteVoiceGameResult,
    getTestSentence,
    saveRestGameResult,
    saveVoiceGameResult,
    sendVoiceRecord,
};
