import Button from '@/components/_button/Button';
import InputBox from '@/components/_common/InputBox';
import { useState } from 'react';
import * as St from './ProfileCreateInfo.style';

const ProfileCreateInfo = () => {
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
                서비스를 더 활용할 수 있도록,
                <br /> 몇 가지 질문에 답변해주세요.
            </St.MessageWrapper>
            <St.InputContainer>
                <InputBox
                    labelText="사용하실 닉네임을 정해주세요"
                    iconName="empty"
                    inputType="text"
                    value={inputValues.nickname}
                    onChange={handleInputChange}
                    name="nickname"
                    alertContents={alertMessages.nickname}
                />
                <St.PostalCodeSearchBox>
                    <InputBox
                        labelText="우편번호"
                        iconName="empty"
                        inputType="Mailbox"
                        value={inputValues.username}
                        onChange={handleInputChange}
                        name="username"
                        size="small"
                        alertContents={alertMessages.username}
                    />
                    <Button text="주소 검색" size="medium" isRed="true" />
                </St.PostalCodeSearchBox>
                <InputBox
                    labelText="주소"
                    iconName="empty"
                    inputType="text"
                    value={inputValues.username}
                    onChange={handleInputChange}
                    name="username"
                    alertContents={alertMessages.username}
                />
                <InputBox
                    labelText="상세 주소"
                    iconName="empty"
                    inputType="text"
                    value={inputValues.username}
                    onChange={handleInputChange}
                    name="username"
                    alertContents={alertMessages.username}
                />
                <InputBox
                    labelText="비상 연락망"
                    iconName="empty"
                    inputType="text"
                    value={inputValues.username}
                    onChange={handleInputChange}
                    name="username"
                    alertContents={alertMessages.username}
                />
            </St.InputContainer>
            <St.ButtonBox>
                <Button text="Skip" size="medium" isRed={'false'} />
                <Button text="Next" size="medium" isRed={'true'} />
            </St.ButtonBox>
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateInfo;
