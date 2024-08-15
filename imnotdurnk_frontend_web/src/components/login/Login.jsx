import Button from '@/components/_button/Button.jsx';
import Checkbox from '@/components/_common/Checkbox.jsx';
import InputBox from '@/components/_common/InputBox.jsx';
import { login } from '@/services/user.js';
import { useEffect, useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
// eslint-disable-next-line import/no-unresolved
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastError, ToastSuccess } from '../_common/alert';
import * as St from './Login.style';
const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
        isEmailSaved: false,
    });
    const [cookies, setCookie, removeCookie] = useCookies([
        'rememberUserId',
        'isNewUser',
    ]);

    const [alertMessages, setAlertMessages] = useState({
        email: '', //'올바른 이메일 양식이 아닙니다.',
        password: '', // '비밀번호를 입력하세요.',
    });

    const navigate = useNavigate();
    const { accessToken, setAccessToken } = useAuthStore();
    const handleLogin = async () => {
        const loginResult = await login(
            inputValues.email,
            inputValues.password,
        );
        if (loginResult.isSuccess) {
            if (inputValues.isEmailSaved) {
                ToastSuccess(
                    '나안취햄ㅅ어에 오신 것을 환영합니다.',
                    true,
                    true,
                );
                setAccessToken(loginResult.accessToken);
                setCookie('rememberUserId', inputValues.email, { path: '/' });
            } else {
                // 이메일 저장 체크가 해제된 경우 쿠키 제거
                removeCookie('rememberUserId');
            }
            // isNewUser 쿠기가 true면 mypage/profile/create/info로 이동
            if (cookies.isNewUser) {
                navigate('/mypage/profile/create/info');
                removeCookie('isNewUser');
            } else {
                navigate('/');
            }
        } else {
            // TODO: 임의로 Error 넣어두긴 했는데, 이메일/비번 틀린 경우 분기 하실 거면 추가하심 좋을 것 같습니다 !
            console.log(inputValues);
            ToastError('로그인 정보가 틀렸습니다.', false);
        }
    };

    //2. 유효성 검사
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

        if (inputValues.password === '') {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                password: '비밀번호를 입력해주세요.',
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

    //1. 입력 값 state로 저장
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 입력값을 콘솔에 출력
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    //1. 체크박스 상태값 변경
    const handleCheckboxChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            isEmailSaved: e.target.checked,
        }));
    };

    //페이지 이동
    const goToFindPasswordPage = () => {
        navigate('/find-password');
    };
    useEffect(() => {
        // 페이지가 로드될 때 쿠키에서 값 읽어오기
        const savedEmail = cookies.rememberUserId || '';
        setInputValues((prevValues) => ({
            ...prevValues,
            email: savedEmail,
            isEmailSaved: Boolean(savedEmail), // 이메일이 있으면 체크박스를 체크 상태로
        }));
    }, [cookies]);
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
                <St.ButtonBox>
                    <Button
                        text="로그인"
                        size="big"
                        isRed={true}
                        onClick={(e) => {
                            e.preventDefault(); // 기본 동작 방지
                            checkValidation(); // 유효성 검사 및 로그인 처리
                        }}
                    />
                    <Button
                        text="홈으로"
                        isRed={false}
                        onClick={(e) => {
                            e.preventDefault(); // 기본 동작 방지
                            navigate('/');
                        }}
                    />
                </St.ButtonBox>
            </St.FormContainer>
        </St.LoginContainer>
    );
};

export default Login;
