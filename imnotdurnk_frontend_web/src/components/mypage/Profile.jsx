import beerBottleImage from '@/assets/images/beerbottle.webp';
import sojuBottleImage from '@/assets/images/sojubottle.webp';
import MiniButton from '@/components/_button/MiniButton';
import InputBox from '@/components/_common/InputBox';
import Modal from '@/components/_modal/Modal';
import { deleteAccount, getUserProfile, logout } from '@/services/user';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import useModalStore from '../../stores/useModalStore';
import ModalTextBox from '../_modal/ModalTextBox';
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
    const handlePasswordChange = () => {};

    const [removeCookie] = useCookies(['RefreshToken']);

    const handleLogout = async () => {
        const logoutResult = await logout();
        if (logoutResult.isSuccess) {
            //removeCookie('RefreshToken', { path: '/' });
            navigate('/account');
            console.log('로그아웃 성공');
        } else {
            console.log('로그아웃 실패');
        }
    };

    const { openModal, closeModal } = useModalStore();
    const closeHandler = (state) => {
        closeModal(state);
    };
    const onClickDeleteAccountButton = () => {
        openModal('deleteAccountModal');
    };
    const handleDeleteAccount = async () => {
        //삭제 api -> 성공시 -> account로 이동
        const deleteAccountResult = await deleteAccount();
        if (deleteAccountResult.isSuccess) {
            console.log('탈퇴 성공');
            navigate('/account');
        } else {
            console.log('탈티 실패');
        }
    };
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const getProfileResult = await getUserProfile();

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
                        beerCapacity: getProfileResult.data.beerCapacity || 0,
                        sojuCapacity: getProfileResult.data.sojuCapacity || 0,
                        latitude: getProfileResult.data.latitude || '',
                        longitude: getProfileResult.data.longitude || '',
                        unsure: !getProfileResult.data.unsure
                            ? getProfileResult.data.unsure
                            : true,
                        voice: getProfileResult.data.voice || '',
                    });
                    //  전역상태로 저장
                    setUser(getProfileResult.data);
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
                                <St.Text>
                                    {inputValues.unsure
                                        ? `모름`
                                        : `${inputValues.sojuCapacity} 병`}
                                </St.Text>
                            </St.SojuBox>
                            <St.BeerBox>
                                <St.StyledStepperImage
                                    src={beerBottleImage}
                                    alt={`be`}
                                />
                                <St.Text>
                                    {inputValues.unsure
                                        ? `모름`
                                        : `${inputValues.beerCapacity} 병`}
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
                </St.InfoContainer>
                <St.ButtonContainer>
                    <MiniButton
                        text="회원탈퇴"
                        iconname="bin"
                        isRed={false}
                        onClick={onClickDeleteAccountButton}
                    />
                    <MiniButton
                        text="로그아웃"
                        iconname="signout"
                        isRed={false}
                        onClick={handleLogout}
                    />
                    <MiniButton
                        text="비밀번호 변경"
                        iconname="key"
                        isRed={true}
                        onClick={handlePasswordChange}
                    />
                </St.ButtonContainer>
                <Modal
                    modalId="deleteAccountModal"
                    contents={
                        <ModalTextBox text="회원 정보를 삭제하시겠습니까?" />
                    }
                    buttonText={'탈퇴하기'}
                    onButtonClick={() => {
                        closeModal();
                        handleDeleteAccount();
                    }}
                />
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
