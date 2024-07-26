import * as St from './Login.style';
import InputBox from '@/components/_common/InputBox.jsx';
import Checkbox from '@/components/_common/Checkbox.jsx';
import Button from '@/components/_button/Button.jsx';
const Login = () => {
    return (
        <St.LoginContainer>
            <St.SubTitle>돌아온 걸 환영해요!</St.SubTitle>
            <St.MainTitle>Log In</St.MainTitle>
            <InputBox
                labelText="Your Email"
                iconName="email"
                inputType="email"
                size=""
            />
            <InputBox
                labelText="Your Password"
                iconName="invisible"
                inputType="password"
                size=""
            />
            <St.LoginSubQuestionContainer>
                <Checkbox text="내 정보 기억하기" />
                <St.ForgetPasswordMessage>
                    비밀번호를 잊으셨나요?
                </St.ForgetPasswordMessage>
            </St.LoginSubQuestionContainer>
            <Button text="로그인" size="big" isRed="true" />
        </St.LoginContainer>
    );
};

export default Login;
