import Button from '@/components/_button/Button';
import { useState } from 'react';
import useMyPageNavigation from '../../hooks/useMyPageNavigation';
import * as St from './ProfileCreateAlcoholCapacity.style';
const ProfileCreateAlcoholCapacity = () => {
    useMyPageNavigation();
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
            <St.RecordContainer>
                <St.InputContainer></St.InputContainer>
                <St.ButtonBox>
                    <Button text="Skip" size="" isRed="true" />
                    <Button text="Next" size="medium" isRed={'true'} />
                </St.ButtonBox>
            </St.RecordContainer>
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateAlcoholCapacity;
