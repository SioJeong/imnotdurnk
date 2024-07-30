import api from './api';

// TODO: 추후 backend 데이터 형식 및 프론트 컨벤션 맞게 수정하여 사용
// [임시] response body 형식 : connect/process/data

// year, month를 쿼리 파라미터로 사용하여 해당 월의 모든 이벤트 가져오기
const getAllEventList = async ({ token, year, month }) => {
    try {
        const response = await api.get('/calendars', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { year, month },
        });
        const data = response.data.dataList;
        // const { connect, process, data } = response.data;

        // console.log('service 읽어올 떄: ', data);

        return response;

        // 네트워크 연결 확인
        // if (connect.status !== 'success') {
        //     throw new Error('네트워크 에러');
        // }

        // // 처리 결과 확인
        // if (process.errorCode !== 0) {
        //     throw new Error(process.message || '처리 중 오류 발생');
        // }

        // return data;
    } catch (err) {
        throw new Error(err.message || '데이터 가져오는 중 오류 발생');
    }
};

export { getAllEventList };
