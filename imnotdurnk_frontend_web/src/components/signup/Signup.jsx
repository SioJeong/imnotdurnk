import Button from '@/components/_button/Button.jsx';
import Checkbox from '@/components/_common/Checkbox';
import InputBox from '@/components/_common/InputBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as St from './Signup.style';
const Signup = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        mobilephone: '',
        password: '',
        passwordCheck: '',
        agreeCheckBox: false,
    });

    const [alertMessages, setAlertMessages] = useState({
        username: '',
        email: '',
        mobilephone: '',
        password: '',
        passwordCheck: '',
        agreeCheckBox: false,
    });

    //버튼 동작
    const handleSignup = () => {
        console.log('회원가입 데이터 다 받아오기 성공', inputValues);
        // 중복 검사

        // 중복일시에

        // 중복이 없을 시에 페이지 이동
    };
    const navigate = useNavigate();
    const goToCheckEmailPage = () => {
        navigate('/check-email', {
            state: { inputValues },
        });
    };
    //유효성 검사
    const checkValidation = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        const nameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
        const phoneRegex = /^010-\d{4}-\d{4}$/;

        //이름 유효성 검사
        if (!nameRegex.test(inputValues.username)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                username: '2 ~ 10자 내 한국어로  입력해야 합니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                username: '',
            }));
        }

        //이메일
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

        //전화번호
        if (!phoneRegex.test(inputValues.mobilephone)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                mobilephone: '올바른 이메일 양식이 아닙니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                mobilephone: '',
            }));
        }

        //비밀번호
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
        //비밀번호 확인
        if (!passwordRegex.test(inputValues.passwordCheck)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                passwordCheck:
                    '비밀번호는 대문자, 소문자, 숫자를 포함하고 8~16자리여야 합니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                passwordCheck: '',
            }));
        }

        if (
            !inputValues.passwordCheck ||
            inputValues.password !== inputValues.passwordCheck
        ) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                passwordCheck: '비밀번호가 일치하지 않습니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                passwordCheck: '',
            }));
        }

        if (!inputValues.agreeCheckBox) {
            isValid = false;
        }

        if (isValid) {
            handleSignup();
        }
    };
    const formatPhoneNumber = (value) => {
        const numericValue = value.replace(/\D/g, '');

        // 포맷팅된 전화번호를 반환
        if (numericValue.length > 6) {
            return numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (numericValue.length > 3) {
            return numericValue.replace(/(\d{3})(\d{0,4})/, '$1-$2');
        }
        return numericValue;
    };
    //1. 입력 값 확인
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mobilephone') {
            const formattedValue = formatPhoneNumber(value);
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: formattedValue,
            }));
        } else {
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            agreeCheckBox: e.target.checked,
        }));
    };

    return (
        <St.SignupContainer>
            <St.TitleContainer>
                <St.SubTitle>
                    가입하고 건강한 음주 생활을 시작하세요!
                </St.SubTitle>
                <St.MainTitle>Sign Up</St.MainTitle>
            </St.TitleContainer>
            <St.FormContainer>
                <St.InputBoxWrapper>
                    <InputBox
                        labelText="Your Name"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.username}
                        onChange={handleInputChange}
                        name="username"
                        alertContents={alertMessages.username}
                    />
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
                        labelText="Your Mobile Phone"
                        iconName="phone"
                        inputType="text"
                        value={inputValues.mobilephone}
                        onChange={handleInputChange}
                        name="mobilephone"
                        alertContents={alertMessages.mobilephone}
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
                    <InputBox
                        labelText="Check Your Password"
                        iconName="invisible"
                        inputType="password"
                        value={inputValues.passwordCheck}
                        onChange={handleInputChange}
                        name="passwordCheck"
                        alertContents={alertMessages.passwordCheck}
                    />
                </St.InputBoxWrapper>
                <Checkbox
                    text="회원가입 및 이용약관에 동의합니다."
                    checked={inputValues.agreeCheckBox}
                    onChange={handleCheckboxChange}
                />
                <Button
                    text="이메일 인증하기"
                    size="big"
                    isRed="true"
                    onClick={(e) => {
                        e.preventDefault(); // 기본 동작 방지
                        checkValidation(); // 유효성 검사 및 로그인 처리
                    }}
                />
            </St.FormContainer>
        </St.SignupContainer>
    );
};

export default Signup;
