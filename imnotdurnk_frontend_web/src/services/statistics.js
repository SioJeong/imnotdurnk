import { api } from './api';

//개인별 음주 통계 api 호츌
const getStaticsticsData = async (formattedDate) => {
    console.log('fd', formattedDate);
    try {
        const response = await api.get(`/calendars/statistics`, {
            params: {
                dateStr: formattedDate,
            },
        });
        console.log('2', response.data);
        const { statusCode, httpStatus, message, data } = response.data;
        // apiErrorHandler(statusCode, httpStatus, message);
        console.log('통계데이터 얻기 response:', data);
        return {
            isSuccess: statusCode === 200,
            data: data,
            message: '통계 정보 가져오기 성공',
        };
    } catch (err) {
        return {
            isSuccess: false,
            message: err.message || '데이터 보내는 중 오류 발생',
        };
    }
};
export { getStaticsticsData };
