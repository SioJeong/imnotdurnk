import Button from '@/components/_button/Button.jsx';
import Checkbox from '@/components/_common/Checkbox';
import InputBox from '@/components/_common/InputBox';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastWarning } from '../_common/alert';
import * as St from './Signup.style';
const Signup = () => {
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));

    const [inputValues, setInputValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordCheck: '',
        agreeCheckBox: false,
    });

    const [alertMessages, setAlertMessages] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordCheck: '',
        agreeCheckBox: false,
    });

    useEffect(() => {
        setInputValues({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '',
            passwordCheck: '',
            agreeCheckBox: user.agreeCheckBox || false,
        });
    }, [user]);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['isNewUser']);
    //전역상태로 저장
    const handleSignup = async () => {
        setUser({
            name: inputValues.name,
            email: inputValues.email,
            phone: inputValues.phone,
            password: inputValues.password,
            passwordCheck: inputValues.passwordCheck,
            agreeCheckBox: inputValues.agreeCheckBox,
        });
        setCookie('isNewUser', true, { path: '/' });
        navigate('/check-email');
    };

    //유효성 검사
    const checkValidation = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex1 =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        const passwordRegex2 =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,16}$/;

        const nameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
        const phoneRegex = /^(010|011)-\d{4}-\d{4}$/;
        //이름 유효성 검사
        if (!nameRegex.test(inputValues.name)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                name: '2 ~ 10자 내 한국어로  입력해야 합니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                name: '',
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
        if (!phoneRegex.test(inputValues.phone)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                phone: '올바른 핸드폰 형식이 아닙니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                phone: '',
            }));
        }

        //비밀번호
        if (
            !passwordRegex1.test(inputValues.password) &&
            !passwordRegex2.test(inputValues.password)
        ) {
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
        if (
            !passwordRegex1.test(inputValues.password) &&
            !passwordRegex2.test(inputValues.password)
        ) {
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

        // 회원가입 약관 확인
        if (isValid) {
            if (!inputValues.agreeCheckBox) {
                isValid = false;
                ToastWarning('회원가입 약관에 동의해야 합니다.', false);
            } else {
                handleSignup();
            }
        }
    };

    const formatPhoneNumber = (value) => {
        const numericValue = value.replace(/\D/g, '').slice(0, 11); // 최대 11자리

        // 포맷팅된 전화번호를 반환
        if (numericValue.length === 11) {
            return numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (numericValue.length === 10) {
            return numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (numericValue.length > 6) {
            return numericValue.replace(/(\d{3})(\d{3,4})/, '$1-$2');
        } else if (numericValue.length > 3) {
            return numericValue.replace(/(\d{3})(\d{0,3})/, '$1-$2');
        }

        return numericValue;
    };

    //1. 입력 값 확인
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
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
                        value={inputValues.name}
                        onChange={handleInputChange}
                        name="name"
                        alertContents={alertMessages.name}
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
                        value={inputValues.phone}
                        onChange={handleInputChange}
                        name="phone"
                        alertContents={alertMessages.phone}
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
