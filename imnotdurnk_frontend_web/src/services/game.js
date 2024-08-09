import { apiNoToken } from './api';
import apiErrorHandler from './apiErrorHandler';

// response body 형식 : httpStatus, message, statusCode, dataList
const sendVoiceRecord = async ({ file }) => {
    try {
        const response = await apiNoToken.post('/voice/pronounce', file, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 20000, // 서버 요청 처리에 필요한 시간 20초로 설정.. 해도 안되네
        });

        const { statusCode, httpStatus, message } = response.data;
        console.log(statusCode);
        apiErrorHandler(statusCode, httpStatus, message);

        // if (statusCode === 201) {
        //     return true;
        // }
    } catch (error) {
        throw new Error(error.message || '일정 등록 중 오류 발생');
    }
};

export { sendVoiceRecord };
