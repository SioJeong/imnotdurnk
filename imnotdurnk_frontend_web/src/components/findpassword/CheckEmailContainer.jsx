import Button from '@/components/_button/Button.jsx';
import InputBox from '@/components/_common/InputBox.jsx';
import * as St from './CheckEmailContainer.style';

const CheckEmailContainer = () => {
    return (
        <St.CheckEmailContainer>
            <St.StyledH2>이메일을 입력해주세요.</St.StyledH2>
            <InputBox
                labelText="Your Email"
                iconName="email"
                inputType="email"
                size=""
            />
            <Button text="새 비밀번호 보내기" size="big" isRed="true" />
        </St.CheckEmailContainer>
    );
};

export default CheckEmailContainer;
