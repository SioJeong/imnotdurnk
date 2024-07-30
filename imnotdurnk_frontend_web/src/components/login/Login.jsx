import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as St from './Login.style';
import InputBox from '@/components/_common/InputBox.jsx';
import Checkbox from '@/components/_common/Checkbox.jsx';
import Button from '@/components/_button/Button.jsx';

const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
        isEmailSaved: false,
    });

    const [alertMessages, setAlertMessages] = useState({
        email: '', //'올바른 이메일 양식이 아닙니다.',
        password: '', // '비밀번호를 입력하세요.',
    });

    //버튼 동작
    const handleLogin = () => {
        console.log('로그인 성공 ', inputValues);
    };

    //유효성 검사
    const checkValidation = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

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

        if (!passwordRegex.test(inputValues.password)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                password:
                    '비밀번호는 대문자, 소문자, 숫자를 포함하고 8~16자리여야 합니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                password: '',
            }));
        }

        if (isValid) {
            handleLogin();
        }
    };

    //1. 입력 값 저장
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 입력값을 콘솔에 출력
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    //체크박스 상태값 변경
    const handleCheckboxChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            isEmailSaved: e.target.checked,
        }));
    };
    //페이지 이동
    const navigate = useNavigate();

    const goToFindPasswordPage = () => {
        navigate('/find-password');
    };

    return (
        <St.LoginContainer>
            <St.TitleContainer>
                <St.SubTitle>돌아온 걸 환영해요!</St.SubTitle>
                <St.MainTitle>Log In</St.MainTitle>
            </St.TitleContainer>
            <St.FormContainer>
                <St.InputBoxWrapper>
                    <InputBox
                        labelText="Your Email"
                        iconName="email"
                        inputType="email"
                        value={inputValues.email}
                        onChange={handleInputChange}
                        name="email"
                        alertContents={alertMessages.email}
                    />

                    <InputBox
                        labelText="Your Password"
                        iconName="invisible"
                        inputType="password"
                        value={inputValues.password}
                        onChange={handleInputChange}
                        name="password"
                        alertContents={alertMessages.password}
                    />
                </St.InputBoxWrapper>
                <St.LoginSubQuestionContainer>
                    <Checkbox
                        text="내 정보 기억하기"
                        checked={inputValues.isEmailSaved}
                        onChange={handleCheckboxChange}
                    />
                    <St.ForgetPasswordMessage onClick={goToFindPasswordPage}>
                        비밀번호를 잊으셨나요?
                    </St.ForgetPasswordMessage>
                </St.LoginSubQuestionContainer>
                <Button
                    text="로그인"
                    size="big"
                    isRed="true"
                    onClick={(e) => {
                        e.preventDefault(); // 기본 동작 방지
                        checkValidation(); // 유효성 검사 및 로그인 처리
                    }}
                />
            </St.FormContainer>
        </St.LoginContainer>
    );
};

export default Login;
