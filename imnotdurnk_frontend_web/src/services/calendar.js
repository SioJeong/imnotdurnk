import api from './api';
import apiErrorHandler from './apiErrorHandler';

// response body 형식 : httpStatus, message, statusCode, dataList
// year, month를 쿼리 파라미터로 사용하여 해당 월의 모든 이벤트 가져오기
const getAllEventList = async ({ token, year, month }) => {
    try {
        const response = await api.get('/calendars', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { year, month },
        });

        const { statusCode, httpStatus, message, dataList } = response.data;

        apiErrorHandler(statusCode, httpStatus, message);

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
    } catch (err) {
        throw new Error(err.message || '데이터 가져오는 중 오류 발생');
    }
};

//개인별 음주 통계 api 호츌
const getStaticsticsData = async ({ formattedDate }) => {
    // try {
    //     const response = await api.get(`/calendars/statistics`, {
    //         params: {
    //             date: formattedDate,
    //         },
    //     });
    //     console.log('2', response);
    //     const { statusCode, httpStatus, message, data } = response.data;
    //     // apiErrorHandler(statusCode, httpStatus, message);
    //     console.log('통계데이터 얻기 response:', data);
    //     return {
    //         isSuccess: statusCode === 200,
    //         data: data,
    //         message: '통계 정보 가져오기 성공',
    //     };
    // } catch (err) {
    //     return {
    //         isSuccess: false,
    //         message: err.message || '데이터 보내는 중 오류 발생',
    //     };
    // }
};
export { getAllEventList, getStaticsticsData };
const createEvent = async ({ token, plan }) => {
    try {
        const response = await api.post('/calendars', plan, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { statusCode, httpStatus, message } = response.data;
        apiErrorHandler(statusCode, httpStatus, message);

        if (statusCode === 201) {
            return true;
        }
    } catch (err) {
        throw new Error(err.message || '이벤트 등록 중 오류 발생');
    }
};

export { createEvent, getAllEventList };
