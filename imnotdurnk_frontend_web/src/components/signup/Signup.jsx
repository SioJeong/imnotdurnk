import * as St from './Signup.style';
import InputBox from '@/components/_common/InputBox';
import Checkbox from '@/components/_common/Checkbox';
import Button from '@/components/button/Button';
const Signup = () => {
    return (
        <St.SignupContainer>
            <St.SubTitle>가입하고 건강한 음주 생활을 시작하세요!</St.SubTitle>
            <St.MainTitle>Sign Up</St.MainTitle>
            <InputBox
                labelText="Your Name"
                iconName="empty"
                inputType="text"
                size=""
            />
            <InputBox
                labelText="Your Email"
                iconName="email"
                inputType="email"
                size=""
            />
            <InputBox
                labelText="Your Mobile Phone"
                iconName="phone"
                inputType="text"
                size=""
            />
            <InputBox
                labelText="Your Password"
                iconName="invisible"
                inputType="password"
                size=""
            />
            <InputBox
                labelText="Check Your Password"
                iconName="invisible"
                inputType="password"
                size=""
            />
            <Checkbox text="회원가입 및 이용약관에 동의합니다." />
            <Button text="이메일 인증하기" size="big" isRed="true" />
        </St.SignupContainer>
    );
};

export default Signup;
