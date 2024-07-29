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

// year, month를 쿼리 파라미터로 사용하여 해당 월의 모든 이벤트 가져오기
const getAllEventList = async ({ year, month }) => {
    const response = await AudioParam.get('/calendars', {
        params: { year, month },
    });
    const { connect, process, data } = response.data;
    return data;
};

export { createEvent };
