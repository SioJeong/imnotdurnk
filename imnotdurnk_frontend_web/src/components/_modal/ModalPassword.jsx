import * as St from './Modal.style';

import InputBox from '../_common/InputBox';

const ModalPassword = ({
    newPassword,
    currentPassword,
    newPasswordCheck,
    handleInputChange,
    alertMessages,
}) => {
    return (
        <St.StyledBox>
            <St.StyledFormBox>
                <InputBox
                    labelText="현재 비밀번호"
                    iconName="invisible"
                    inputType="password"
                    value={currentPassword}
                    autocomplete="current-password"
                    name="currentPassword"
                    onChange={handleInputChange}
                />

                <InputBox
                    labelText="새 비밀번호"
                    iconName="invisible"
                    inputType="password"
                    onChange={handleInputChange}
                    value={newPassword}
                    name="newPassword"
                    autocomplete="new-password-check"
                    alertContents={alertMessages.newPassword}
                />

                <InputBox
                    labelText="새 비밀번호 확인"
                    iconName="invisible"
                    inputType="password"
                    onChange={handleInputChange}
                    value={newPasswordCheck}
                    name="newPasswordCheck"
                    autocomplete="new-password-check"
                    alertContents={alertMessages.newPasswordCheck}
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalPassword;
