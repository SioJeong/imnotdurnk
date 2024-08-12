import * as St from './Modal.style';

import InputBox from '../_common/InputBox';

const ModalPasswordForDeleteAccount = ({
    passwordForDelete,
    handleInputChangeForDelete,
}) => {
    return (
        <St.StyledBox>
            <St.StyledFormBox>
                <InputBox
                    labelText="비밀번호를 입력하세요."
                    iconName="invisible"
                    inputType="password"
                    value={passwordForDelete}
                    autocomplete="passwordForDelete"
                    name="passwordForDelete"
                    onChange={handleInputChangeForDelete}
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalPasswordForDeleteAccount;
