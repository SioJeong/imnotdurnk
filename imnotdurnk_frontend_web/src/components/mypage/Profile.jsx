import InputBox from '@/components/_common/InputBox';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserProfile } from '../../services/user';
import MiniButton from '../_button/MiniButton';
import * as St from './Profile.style';
import ProfileCreateAlcoholCapacity from './ProfileCreateAlcoholCapacity';
import ProfileCreateInfo from './ProfileCreateInfo';
import ProfileCreateVoice from './ProfileCreateVoice';
import ProfileUpdate from './ProfileUpdate';
const Profile = () => {
    const [inputValues, setInputValues] = useState({
        name: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        detailedAddress: '',
        postalCode: '',
        emergencyCall: '',
    });
    useEffect(() => {
        const getProfileResult = getUserProfile();
        if (getProfileResult.isSuccess) {
            console.log('프로필 가져옴', getProfileResult.data);
        } else {
            console.log('프로필 가져오기 실패');
        }
    }, [inputValues]); // 빈 배열을 전달하여 한 번만 호출되도록 설정

    return (
        <>
            <St.ProfileContainer>
                <St.Title>{inputValues.nickname}님 안녕하세요.</St.Title>
                <St.InfoContainer>
                    <InputBox
                        labelText="이름"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.name}
                        name="name"
                        readOnly
                    />
                    <InputBox
                        labelText="닉네임"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.nickname}
                        name="nickname"
                        readOnly
                    />
                    <InputBox
                        labelText="이메일"
                        iconName="empty"
                        inputType="email"
                        value={inputValues.email}
                        name="email"
                        readOnly
                    />
                    <InputBox
                        labelText="연락처"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.phone}
                        name="phone"
                        readOnly
                    />
                    <St.AlcoholCapacityBox>
                        <St.StyledH6>주량</St.StyledH6>
                    </St.AlcoholCapacityBox>
                    <InputBox
                        labelText="주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.address}
                        name="address"
                        readOnly
                    />
                    <InputBox
                        labelText="상세 주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.detailedAddress}
                        name="detailedAddress"
                        readOnly
                    />
                    <InputBox
                        labelText="우편번호"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.postalCode}
                        name="postalCode"
                        readOnly
                    />
                    <InputBox
                        labelText="비상 연락망"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.emergencyCall}
                        name="emergencyCall"
                        readOnly
                    />
                    <St.VoiceBox>
                        <St.StyledH6>목소리</St.StyledH6>
                    </St.VoiceBox>
                </St.InfoContainer>
                <St.ButtonContainer>
                    <MiniButton text="회원탈퇴" icnonname="bin" isRed={false} />
                    <MiniButton
                        text="로그아웃"
                        icnonname="signout"
                        isRed={false}
                    />
                    <MiniButton
                        text="비밀번호 변경"
                        icnonname="key"
                        isRed={true}
                    />
                </St.ButtonContainer>
            </St.ProfileContainer>
            <Routes>
                {/* /create 하위 경로들 */}
                <Route path="create/*" element={null}>
                    <Route path="info" element={<ProfileCreateInfo />} />
                    <Route
                        path="alcohol-capacity"
                        element={<ProfileCreateAlcoholCapacity />}
                    />
                    <Route path="voice" element={<ProfileCreateVoice />} />
                </Route>
                {/* /update 경로 */}
                <Route path="update" element={<ProfileUpdate />} />
            </Routes>
        </>
    );
};

export default Profile;
