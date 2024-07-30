import AlertMessage from '@/components/_common/AlertMessage.jsx';
import * as St from './CertificationNumberInputContainer.style';
import Button from '@/components/_button/Button.jsx';
//import { useState } from 'react';
const CertificationNumberInputContainer = ({ isCertificationNumberWrong }) => {
    // const [inputValues, setInputValues] = useState(['', '', '', '']);
    return (
        <St.CertificationContainer>
            <St.MessageContainer>
                <St.StyledH2
                    $isCertificationNumberWrong={isCertificationNumberWrong}
                >
                    인증코드를 입력하세요.
                </St.StyledH2>
                {isCertificationNumberWrong ? (
                    <AlertMessage message={'인증번호가 잘못되었습니다.'} />
                ) : null}
            </St.MessageContainer>
            <St.InputContainer>
                <St.Input />
                <St.Input />
                <St.Input />
                <St.Input />
            </St.InputContainer>
            <St.StyledMessage>코드가 전송되지 않았나요?</St.StyledMessage>
            <Button text="인증하기" size="big" isRed="true" />
        </St.CertificationContainer>
    );
};

export default CertificationNumberInputContainer;
