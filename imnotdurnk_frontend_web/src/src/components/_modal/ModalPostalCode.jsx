import DaumPostcode from 'react-daum-postcode';
import useModalStore from '../../stores/useModalStore';
import * as St from './Modal.style';
const ModalPostalCode = ({ handleSearchedPostalCode }) => {
    const themeObj = {
        bgColor: '#F7F7EC', //바탕 배경색
        pageBgColor: '#FFFFFF', //페이지 배경색
        textColor: '#252F2C', //기본 글자색
        queryTextColor: '#252F2C', //검색창 글자색
        postcodeTextColor: '#FF6A5F', //우편번호 글자색
        emphTextColor: '#4C92C9', //강조 글자색
        outlineColor: '#F7F7EC', //테두리
    };

    const postCodeStyle = {
        width: '300px',
        height: '360px',
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        //받은 데이터 위로 보내기
        handleSearchedPostalCode(address, zonecode);
    };

    const { openModal, closeModal } = useModalStore();
    const modalId = 'postalCodeModal';
    const closeHandler = (state) => {
        closeModal(modalId);
    };
    return (
        <St.StyledBox>
            {' '}
            <DaumPostcode
                theme={themeObj}
                style={postCodeStyle}
                onComplete={completeHandler}
                onClose={closeHandler}
            />
        </St.StyledBox>
    );
};

export default ModalPostalCode;
