import { useState } from 'react';
import Button from '@/components/_button/Button.jsx';
import InputBox from '@/components/_common/InputBox.jsx';
import * as St from './CheckEmailContainer.style';
import useSendNewPassword from '@/hooks/useSendNewPassword.jsx';
const CheckEmailContainer = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
    });
    const [alertMessages, setAlertMessages] = useState({
        email: '',
        //'올바른 이메일 양식이 아닙니다.'
        // '해당 이메일이 없습니다.'
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 입력값을 콘솔에 출력
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const checkValidation = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValues.email)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                email: '올바른 이메일 양식이 아닙니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                email: '',
            }));
        }
        return isValid;
    };
    const handleSendNewPassword = () => {
        if (checkValidation()) {
            useSendNewPassword;
        }
    };
    return (
        <St.CheckEmailContainer>
            <St.StyledH2>이메일을 입력해주세요.</St.StyledH2>
            <InputBox
                labelText="Your Email"
                iconName="email"
                inputType="email"
                value={inputValues.email}
                onChange={handleInputChange}
                name="email"
                alertContents={alertMessages.email}
            />
            <Button
                text="새 비밀번호 보내기"
                size="big"
                isRed="true"
                onClick={(e) => {
                    e.preventDefault();
                    handleSendNewPassword();
                }}
            />
        </St.CheckEmailContainer>
    );
};

export default CheckEmailContainer;
