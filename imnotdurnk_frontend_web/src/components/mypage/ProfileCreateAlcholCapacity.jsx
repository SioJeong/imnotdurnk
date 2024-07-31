import Button from '@/components/_button/Button';
import { useState } from 'react';
import * as St from './ProfileCreateAlcholCapacity.style';

const ProfileCreateAboutAlcholCapacity = () => {
    const [inputValues, setInputValues] = useState({
        nickname: '',
        postalCode: '',
        address: '',
        detailedAdddress: '',
        passwordCheck: '',
        emergencyCall: '',
    });
    const [alertMessages, setAlertMessages] = useState({
        nickname: '',
        postalCode: '',
        address: '',
        detailedAdddress: '',
        passwordCheck: '',
        emergencyCall: '',
    });
    const handleInputChange = (e) => {
        console.log('아직');
    };
    return (
        <St.ProfileCreateContainer>
            <St.MessageWrapper>
                <St.Title>주량을 알려주세요</St.Title>
                <St.SubTitle>
                    알려주신 주량으로 음주 습관을 알려드릴게요.
                </St.SubTitle>
            </St.MessageWrapper>
            <St.InputContainer></St.InputContainer>
            <St.ButtonBox>
                <Button text="Skip" size="medium" isRed={'false'} />
                <Button text="Next" size="medium" isRed={'true'} />
            </St.ButtonBox>
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateAboutAlcholCapacity;
