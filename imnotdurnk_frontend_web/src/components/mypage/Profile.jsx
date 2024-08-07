import beerBottleImage from '@/assets/images/beerbottle.webp';
import sojuBottleImage from '@/assets/images/sojubottle.webp';
import InputBox from '@/components/_common/InputBox';
import { getUserProfile } from '@/services/user';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import MiniButton from '../_button/MiniButton';
import * as St from './Profile.style';
import ProfileCreateAlcoholCapacity from './ProfileCreateAlcoholCapacity';
import ProfileCreateInfo from './ProfileCreateInfo';
import ProfileCreateVoice from './ProfileCreateVoice';
import ProfileUpdate from './ProfileUpdate';
const Profile = () => {
    //입력되는 값
    const [inputValues, setInputValues] = useState({
        name: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        detailedAddress: '',
        postalCode: '',
        emergencyCall: '',
        beerCapacity: 0,
        sojuCapacity: 0,
        latitude: '',
        longitude: '',
        unsure: true,
        voice: '',
    });
    //전역으로 저장되는 값
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));
    const navigate = useNavigate();
    const onClickPasswordChangeButton = () => {
        navigate('/find-password');
    };

    //getUserProfile();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const getProfileResult = await getUserProfile();

                console.log('getProfileResult :', getProfileResult.data);
                if (getProfileResult.isSuccess) {
                    // api로 불러온 값 렌더링
                    setInputValues({
                        name: getProfileResult.data.name || '',
                        nickname: getProfileResult.data.nickname || '',
                        email: getProfileResult.data.email || '',
                        phone: getProfileResult.data.phone || '',
                        address: getProfileResult.data.address || '',
                        detailedAddress:
                            getProfileResult.data.detailedAddress || '',
                        postalCode: getProfileResult.data.postalCode || '',
                        emergencyCall:
                            getProfileResult.data.emergencyCall || '',
                    });
                    //  전역상태로 저장
                    setUser(getProfileResult.data);
                    console.log('전역저장 후 ', user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserProfile();
    }, []);
    return (
        <>
            <St.ProfileContainer>
                <St.Title>{inputValues.name}님 안녕하세요!</St.Title>
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
                                <St.Text>{inputValues.sojuCapacity} 병</St.Text>
                            </St.SojuBox>
                            <St.BeerBox>
                                <St.StyledStepperImage
                                    src={beerBottleImage}
                                    alt={`be`}
                                />
                                <St.Text>
                                    {' '}
                                    {inputValues.beerCapacity} 병
                                </St.Text>
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
