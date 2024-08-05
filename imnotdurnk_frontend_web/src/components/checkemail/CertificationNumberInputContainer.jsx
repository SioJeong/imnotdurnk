import Button from '@/components/_button/Button.jsx';
import AlertMessage from '@/components/_common/AlertMessage.jsx';

import { sendCertificationNumber } from '@/services/user';
import { useRef, useState } from 'react';
import * as St from './CertificationNumberInputContainer.style';

//import { useState } from 'react';
const CertificationNumberInputContainer = ({ email }) => {
    const [certNumList, setCertNumList] = useState(['', '', '', '']);
    const [certNum, setCertNum] = useState('');
    const inputsRef = useRef([]); // input에서 현위치 추적용
    const [alertContents, setAlertContents] = useState('');
    //하나의 input의 유효성 판별
    const validateInput = (value) => {
        // 0-9 사이의 숫자만 허용
        let certNumRegex = /^[0-9]$/;
        return certNumRegex.test(value);
    };

    //입력 과정 관리- 키보드 이동 및 값 저장
    const handleChange = (e, index) => {
        const { value } = e.target;

        if (validateInput(value)) {
            const newOtp = [...certNumList];
            newOtp[index] = value;
            setCertNumList(newOtp);

            // 다음 입력 필드로 포커스 이동
            if (index < certNumList.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...certNumList];
            newOtp[index] = '';
            setCertNumList(newOtp);
            if (index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };
    //작성했던 인증번호 전체 삭제
    const removeCertNumList = () => {
        setCertNumList(['', '', '', '']);

        // 포커스를 첫 번째 입력 필드로 이동
        inputsRef.current[0].focus();
    };

    //배열 -> 문자열로 전환 함수
    const convertCertNum = () => {
        setCertNum(certNumList.join(''));
        if (certNum.length < 4) {
            // 이거나 api 요청해서 비교하는 함수 조건에 추가해야함

            setAlertContents('인증코드가 잘못되었습니다.');
        } else {
            setAlertContents('');
            // 인증 성공창 뜨기
            // 다음 페이지로 이동
        }
    };
    const onClickResendButton = () => {
        const result = sendCertificationNumber(email);
    };
    return (
        <St.CertificationContainer>
            <St.MessageContainer>
                <St.StyledH2>인증코드를 입력하세요.</St.StyledH2>
                <AlertMessage message={alertContents} size={'big'} />
            </St.MessageContainer>
            <St.InputContainer onClick={removeCertNumList}>
                {certNumList.map((value, index) => (
                    <St.Input
                        key={index}
                        type="text"
                        value={value}
                        maxLength="1"
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </St.InputContainer>
            <St.StyledMessage onClick={onClickResendButton}>
                코드가 전송되지 않았나요?
            </St.StyledMessage>
            <Button
                text="인증하기"
                size="big"
                isRed="true"
                onClick={(e) => {
                    e.preventDefault();
                    convertCertNum();
                }}
            />
        </St.CertificationContainer>
    );
};

export default CertificationNumberInputContainer;
