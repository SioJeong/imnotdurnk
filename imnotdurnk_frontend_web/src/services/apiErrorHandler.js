// 공통 오류 처리 유틸 함수
const apiErrorHandler = (statusCode, httpStatus, message) => {
    if (statusCode !== 0) {
        switch (httpStatus) {
            case 'UNAUTHORIZED':
                throw new Error('인증 오류: 다시 로그인해주세요.');
            case 'BAD_REQUEST':
                throw new Error('잘못된 요청: 입력 데이터를 확인하세요.');
            case 'NOT_FOUND':
                throw new Error('데이터를 찾을 수 없습니다.');
            // 필요한 경우 다른 상태 처리 추가
            default:
                throw new Error(message || '알 수 없는 오류 발생');
        }
    }
};

export default apiErrorHandler;
