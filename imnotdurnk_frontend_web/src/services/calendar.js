import { formatDateTime } from '../hooks/useDateTimeFormatter';
import { api } from './api';
import apiErrorHandler from './apiErrorHandler';

// response body 형식 : httpStatus, message, statusCode, dataList
// year, month를 쿼리 파라미터로 사용하여 해당 월의 모든 이벤트 가져오기
const getAllEventList = async ({ year, month }) => {
    try {
        const response = await api.get('/calendars', {
            params: { year, month },
        });

        const { statusCode, httpStatus, message, dataList } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 0) {
            // dataList 변환 작업
            const eventList = dataList.map((e) => ({
                id: e.planId,
                title: e.title,
                date: new Date(e.datetime),
                alcoholLevel: e.alcoholLevel,
                time: new Date(e.datetime).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }));

            return eventList;
        }
    } catch (error) {
        throw new Error(
            error.message || '월별 전체 일정 가져오는 중 오류 발생',
        );
    }
};

const getDailyEventList = async ({ date }) => {
    try {
        const response = await api.get(`/calendars/${date}/plans`, {
            params: { date },
        });

        const { statusCode, httpStatus, message, dataList } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            // dataList 변환 작업
            const eventList = dataList.map((e) => {
                const { _, formattedTime } = formatDateTime(e.date);

                return {
                    id: e.planId,
                    title: e.title,
                    alcoholLevel: e.alcoholLevel,
                    time: formattedTime,
                };
            });

            return eventList;
        }
    } catch (error) {
        throw new Error(
            error.message || '일별 전체 일정 가져오는 중 오류 발생',
        );
    }
};

const createEvent = async ({ plan }) => {
    try {
        const response = await api.post('/calendars', plan, {});

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 201) {
            return true;
        }
    } catch (error) {
        throw new Error(error.message || '일정 등록 중 오류 발생');
    }
};

const getEventDetail = async ({ planId }) => {
    try {
        const response = await api.get(`/calendars/plans/${planId}`, {});

        const { statusCode, httpStatus, message, data } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return data;
        }
    } catch (error) {
        throw new Error(error.message || '일정 상세 가져오는 중 오류 발생');
    }
};

const updateEvent = async ({ editedPlan }) => {
    try {
        const response = await api.put(
            `/calendars/plans/${editedPlan.id}`,
            editedPlan,
            {},
        );

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return true;
        }
    } catch (error) {
        throw new Error(error.message || '일정 수정 중 오류 발생');
    }
};

const deleteEvent = async ({ planId }) => {
    try {
        const response = await api.delete(`calendars/${planId}`, {});

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 200) {
            return true;
        }
    } catch (error) {
        throw new Error(error.message || '일정 삭제 중 오류 발생');
    }
};

export {
    createEvent,
    deleteEvent,
    getAllEventList,
    getDailyEventList,
    getEventDetail,
    updateEvent,
};
