import * as St from './Modal.style';

import InputBox from '../_common/InputBox';

const ModalTextBox = () => {
    return (
        <St.StyledBox>
            <St.StyledForm>
                <InputBox
                    labelText={'Check Your Current Password'}
                    iconName={'invisible'}
                    inputType={'password'}
                    autocomplete={'current-password'}
                />

                <InputBox
                    labelText={'Your New Password'}
                    iconName={'invisible'}
                    inputType={'password'}
                    autocomplete={'new-password'}
                />

                <InputBox
                    labelText={'Check Your New Password'}
                    iconName={'invisible'}
                    inputType={'password'}
                    autocomplete={'new-password'}
                />
            </St.StyledForm>
        </St.StyledBox>
    );
};

export default ModalTextBox;
