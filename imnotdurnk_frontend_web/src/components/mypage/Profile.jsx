import beerBottleImage from '@/assets/images/beerbottle.webp';
import sojuBottleImage from '@/assets/images/sojubottle.webp';
import InputBox from '@/components/_common/InputBox';
import useMyPageNavigation from '@/hooks/useMyPageNavigation';
import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/user';
import useAuthStore from '../../stores/useAuthStore';
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

    const navigate = useNavigate();
    const onClickPasswordChangeButton = () => {
        navigate('/find-password');
    };

    const { accessToken } = useAuthStore();
    useEffect(() => {
        console.log('at', accessToken);
        const getProfileResult = getUserProfile(); // getUserProfile 함수
        // if (getProfileResult.isSuccess) {
        //     // 사용자 정보를 inputValues에 업데이트
        //     setInputValues({
        //         name: getProfileResult.data.name,
        //         nickname: getProfileResult.data.nickname,
        //         email: getProfileResult.data.email,
        //         phone: getProfileResult.data.phone,
        //         address: getProfileResult.data.address,
        //         detailedAddress: getProfileResult.data.detailedAddress,
        //         postalCode: getProfileResult.data.postalCode,
        //         emergencyCall: getProfileResult.data.emergencyCall,
        //     });
        //     console.log('프로필 가져옴', getProfileResult.data);
        // }
    }, []);
    return (
        <>
            <St.ProfileContainer>
                <St.Title>{inputValues.nickname}님 안녕하세요!</St.Title>
                <St.InfoContainer>
                    <InputBox
                        labelText="이름"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.name}
                        name="name"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="닉네임"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.nickname}
                        name="nickname"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="이메일"
                        iconName="empty"
                        inputType="email"
                        value={inputValues.email}
                        name="email"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="연락처"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.phone}
                        name="phone"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <St.AlcoholCapacityBox>
                        <St.StyledH6>주량</St.StyledH6>
                        <St.AlcolBox>
                            <St.SojuBox>
                                <St.StyledStepperImage
                                    src={sojuBottleImage}
                                    alt={`so`}
                                />
                                <St.Text>2병</St.Text>
                            </St.SojuBox>
                            <St.BeerBox>
                                <St.StyledStepperImage
                                    src={beerBottleImage}
                                    alt={`be`}
                                />
                                <St.Text>2병</St.Text>
                            </St.BeerBox>
                        </St.AlcolBox>
                    </St.AlcoholCapacityBox>
                    <InputBox
                        labelText="주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.address}
                        name="address"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="상세 주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.detailedAddress}
                        name="detailedAddress"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="우편번호"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.postalCode}
                        name="postalCode"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="비상 연락망"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.emergencyCall}
                        name="emergencyCall"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <St.VoiceBox>
                        <St.StyledH6>목소리</St.StyledH6>
                        <St.VoiceButton />
                    </St.VoiceBox>
                </St.InfoContainer>
                <St.ButtonContainer>
                    <MiniButton text="회원탈퇴" iconname="bin" isRed={false} />
                    <MiniButton
                        text="로그아웃"
                        iconname="signout"
                        isRed={false}
                    />
                    <MiniButton
                        text="비밀번호 변경"
                        iconname="key"
                        isRed={true}
                        onClick={onClickPasswordChangeButton}
                    />
                </St.ButtonContainer>
            </St.ProfileContainer>
            <Routes>
                {/* /create 하위 경로들 */}
                <Route path="create/*" element={<Outlet />}>
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
