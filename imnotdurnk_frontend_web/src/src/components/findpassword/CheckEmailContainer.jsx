import Button from '@/components/_button/Button.jsx';
import InputBox from '@/components/_common/InputBox.jsx';
import * as St from './CheckEmailContainer.style';
const CheckEmailContainer = ({
    handleIsSent,
    handleSendNewPassword,
    email,
    setEmail,
    alertMessages,
    setAlertMessages,
    checkValidation,
    onClickSendNewPasswordButton,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 입력값을 콘솔에 출력

        setEmail(value);
    };

    return (
        <St.CheckEmailContainer>
            <St.StyledH2>이메일을 입력해주세요.</St.StyledH2>
            <InputBox
                labelText="Your Email"
                iconName="email"
                inputType="email"
                value={email}
                onChange={handleInputChange}
                name="email"
                alertContents={alertMessages.email}
            />
            <Button
                text="새 비밀번호 보내기"
                size="big"
                isRed="true"
                onClick={(e) => {
                    onClickSendNewPasswordButton(e);
                }}
            />
        </St.CheckEmailContainer>
    );
};

export default CheckEmailContainer;
