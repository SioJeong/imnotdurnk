import * as St from './Modal.style';

import InputBox from '../_common/InputBox';

const ModalPassword = () => {
    return (
        <St.StyledBox>
            <St.StyledFormBox>
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
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalPassword;
