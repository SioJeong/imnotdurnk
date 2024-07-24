import api from './api';

// TODO: 추후 backend 데이터 형식 및 프론트 컨벤션 맞게 수정하여 사용
// [임시] response body 형식 : connect/process/data
// [예시] 일정 추가하는 함수
const createEvent = async (eventData) => {
    const response = await api.post(`/calendars`, eventData);
    const { connect, process, data } = response.data;

    if (connect.status !== 'success') {
        throw new Error('네트워크 에러');
    }

    if (process.errorCode !== 0) {
        throw new Error(process.message);
    }

    return data;
};

export { createEvent };
