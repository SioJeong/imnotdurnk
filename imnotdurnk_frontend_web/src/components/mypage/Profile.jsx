import miniBeerBottleImage from '@/assets/images/mini-beer-bottle.webp';
import miniSojuBottleImage from '@/assets/images/mini-soju-bottle.webp';
import MiniButton from '@/components/_button/MiniButton';
import InputBox from '@/components/_common/InputBox';
import Modal from '@/components/_modal/Modal';
import {
    changePassword,
    deleteAccount,
    getUserProfile,
    logout,
} from '@/services/user';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useModalStore from '../../stores/useModalStore';
import { ToastError, ToastSuccess } from '../_common/alert';
import ModalPassword from '../_modal/ModalPassword';
import ModalPasswordForDeleteAccount from '../_modal/ModalPasswordForDeleteAccount';
import ModalTextBox from '../_modal/ModalTextBox';
import * as St from './Profile.style';
import ProfileCreateAlcoholCapacity from './ProfileCreateAlcoholCapacity';
import ProfileCreateInfo from './ProfileCreateInfo';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
    const { clearUser } = useUserStore((state) => ({
        clearUser: state.clearUser,
    }));
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
        sojuUnsure: false,
        beerUnsure: false,
    });
    //전역으로 저장되는 값
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));
    const { clearAccessToken } = useAuthStore((state) => ({
        clearAccessToken: state.clearAccessToken,
    }));
    const navigate = useNavigate();

    // TODO: 배포 상태에서 되는지 확인 필요(로컬은 쿠키가 없어서 불가능.. )
    const handleLogout = async () => {
        const logoutResult = await logout();

        ToastSuccess('로그아웃 되었습니다!', true);
        clearUser();
        clearAccessToken();
        navigate('/account');
    };

    const { openModal, closeModal } = useModalStore();
    const closeHandler = (state) => {
        closeModal(state);
    };
    const onClickPasswordChangeButton = () => {
        openModal('changePasswordModal');
    };
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');
    const [alertMessages, setAlertMessages] = useState({
        newPassword: '', //1.현재 비번이랑 달라야함 2. 8-16자리 대소숫
        newPasswordCheck: '', // newPassword랑 같아야함
    });
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const handlePasswordChange = async () => {
        // 입력된 비밀번호 맞는지 확인
        // 새 비밀번호

        if (isPasswordValid) {
            //변경 API 요청
            const passwordChangeResult = await changePassword(
                currentPassword,
                newPassword,
            );
            if (passwordChangeResult.isSuccess) {
                ToastSuccess('비밀번호가 변경되었습니다!', true);
                closeModal('changePasswordModal');
                setCurrentPassword('');
                setNewPassword('');
                setNewPasswordCheck('');
                setAlertMessages({
                    newPassword: '',
                    newPasswordCheck: '',
                });
            } else {
                ToastError('비밀번호 변경에 실패하였습니다.', true);
            }
        }
    };
    const validatePassword = (name, value) => {
        let message = '';
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

        // 비밀번호 유효성 검사
        if (name === 'newPassword') {
            if (value.length > 0 && !passwordRegex.test(value)) {
                setIsPasswordValid(false);
                message =
                    '비밀번호는 대문자, 소문자, 숫자를 포함하고 8~16자리여야 합니다.';
            } else if (value === currentPassword) {
                setIsPasswordValid(false);
                message =
                    '이전 비밀번호와 같습니다. 다른 비밀번호를 입력해주세요.';
            } else {
                setIsPasswordValid(true);
            }
        } else if (name === 'newPasswordCheck') {
            if (value.length > 0 && value !== newPassword) {
                setIsPasswordValid(false);
                message = '새로 입력한 비밀번호와 일치하지 않습니다.';
            } else {
                setIsPasswordValid(true);
            }
        }
        return message;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'currentPassword') {
            setCurrentPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'newPasswordCheck') {
            setNewPasswordCheck(value);
        }
        const message = validatePassword(name, value);
        setAlertMessages((prevMessages) => ({
            ...prevMessages,
            [name]: message,
        }));
    };

    //계정 삭제 관련 함수 모음
    const [passwordForDelete, setPasswordForDelete] = useState('');
    const onClickDeleteAccountButton = () => {
        openModal('deleteAccountModal');
    };
    const onClickConfirmDeleteAccountButton = () => {
        closeModal('deleteAccountModal');
        openModal('InputPasswordForDeleteAccountModal');
    };
    const handleInputChangeForDelete = (e) => {
        const { name, value } = e.target;
        setPasswordForDelete(value);
    };

    const handleDeleteAccount = async () => {
        //삭제 api -> 성공시 -> account로 이동
        const deleteAccountResult = await deleteAccount(passwordForDelete);
        if (deleteAccountResult.isSuccess) {
            ToastSuccess('탈퇴되었습니다!', true);
            setPasswordForDelete('');
            navigate('/account');
        } else {
            ToastError('회원 탈퇴에 실패하였습니다.', true);
        }
    };
    //
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
                        sojuUnsure: getProfileResult.data.sojuUnsure,
                        beerUnsure: getProfileResult.data.beerUnsure,
                        voice: getProfileResult.data.voice || '',
                    });
                    //  전역상태로 저장
                    setUser(getProfileResult.data);
                }
            } catch (error) {
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
                        iconName="emptyWhite2"
                        inputType="text"
                        value={inputValues.name}
                        name="name"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="닉네임"
                        iconName="emptyWhite2"
                        inputType="text"
                        value={inputValues.nickname}
                        name="nickname"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="이메일"
                        iconName="emptyWhite2"
                        inputType="email"
                        value={inputValues.email}
                        name="email"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="연락처"
                        iconName="emptyWhite2"
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
                                    src={miniSojuBottleImage}
                                    alt={`so`}
                                />
                                <St.Text>
                                    {inputValues.sojuUnsure
                                        ? '모름'
                                        : `${Math.floor((inputValues.sojuCapacity / 8) * 10) / 10} 병`}
                                </St.Text>
                            </St.SojuBox>
                            <St.BeerBox>
                                <St.StyledStepperImage
                                    src={miniBeerBottleImage}
                                    alt={`be`}
                                />
                                <St.Text>
                                    {inputValues.beerUnsure
                                        ? `모름`
                                        : `${Math.floor((inputValues.beerCapacity / 500) * 10) / 10} 병`}
                                </St.Text>
                            </St.BeerBox>
                        </St.AlcolBox>
                    </St.AlcoholCapacityBox>
                    <InputBox
                        labelText="주소"
                        iconName="emptyWhite2"
                        inputType="text"
                        value={inputValues.address}
                        name="address"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="상세 주소"
                        iconName="emptyWhite2"
                        inputType="text"
                        value={inputValues.detailedAddress}
                        name="detailedAddress"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="우편번호"
                        iconName="emptyWhite2"
                        inputType="text"
                        value={inputValues.postalCode}
                        name="postalCode"
                        readOnly
                        isProfileViewPage={true}
                    />
                    <InputBox
                        labelText="비상 연락망"
                        iconName="emptyWhite2"
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
                        onClick={onClickPasswordChangeButton}
                    />
                </St.ButtonContainer>
                <Modal
                    modalId="deleteAccountModal"
                    contents={
                        <ModalTextBox text="회원 정보를 삭제하시겠습니까?" />
                    }
                    buttonText={'탈퇴하기'}
                    onButtonClick={onClickConfirmDeleteAccountButton}
                />
                <Modal
                    modalId="changePasswordModal"
                    contents={
                        <ModalPassword
                            currentPassword={currentPassword}
                            newPasswordCheck={newPasswordCheck}
                            newPassword={newPassword}
                            handleInputChange={handleInputChange}
                            alertMessages={alertMessages}
                        />
                    }
                    buttonText={'비밀번호 변경하기'}
                    onButtonClick={() => {
                        closeModal();
                        handlePasswordChange();
                    }}
                />
                <Modal
                    modalId="InputPasswordForDeleteAccountModal"
                    contents={
                        <ModalPasswordForDeleteAccount
                            passwordForDelete={passwordForDelete}
                            handleInputChangeForDelete={
                                handleInputChangeForDelete
                            }
                        />
                    }
                    buttonText={'탈퇴하기'}
                    onButtonClick={() => {
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
                </Route>
                {/* /update 경로 */}
                <Route path="update" element={<ProfileUpdate />} />
            </Routes>
        </>
    );
};

export default Profile;
