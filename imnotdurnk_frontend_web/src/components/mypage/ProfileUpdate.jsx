import beerBottleImage from '@/assets/images/beerbottle.webp';
import sojuBottleImage from '@/assets/images/sojubottle.webp';
import MiniButton from '@/components/_button/MiniButton';
import InputBox from '@/components/_common/InputBox';
import Modal from '@/components/_modal/Modal';
import ModalAlcoholLevelDropdown from '@/components/_modal/ModalAlcoholLevelDropdown';
import ModalPostalCode from '@/components/_modal/ModalPostalCode';
import ModalVoice from '@/components/_modal/ModalVoice';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as St from './Profile.style';
const ProfileUpdate = () => {
    const { openModal, closeModal } = useModalStore();
    //모달 열기
    const openProfileEditModal = (e, modalId) => {
        e.preventDefault();
        openModal(modalId);
    };
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
    const navigate = useNavigate();
    const onClickPasswordChangeButton = () => {
        navigate('/find-password');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target; // 입력값을 콘솔에 출력
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));

    const handleSearchedPostalCode = (address, zonecode) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            postalCode: zonecode,
            address: address,
        }));
    };
    useEffect(() => {
        if (user) {
            setInputValues({
                name: user.name || '',
                nickname: user.nickname || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                detailedAddress: user.detailedAddress || '',
                postalCode: user.postalCode || '',
                emergencyCall: user.emergencyCall || '',
                beerCapacity: user.beerCapacity || 0,
                sojuCapacity: user.sojuCapacity || 0,
                latitude: user.latitude || '',
                longitude: user.longitude || '',
                unsure: user.unsure !== undefined ? user.unsure : true,
                voice: user.voice || '',
            });
        }
    }, [user]);
    return (
        <>
            <St.ProfileContainer>
                <St.Title>원하시는 정보를 변경해주세요.</St.Title>
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
                        onChange={handleInputChange}
                        name="nickname"
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
                        onChange={handleInputChange}
                        name="phone"
                    />
                    <St.AlcoholCapacityBox
                        onClick={(e) => {
                            openProfileEditModal(e, 'alcoholLevelModal');
                        }}
                    >
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
                                <St.Text>{inputValues.beerCapacity} 병</St.Text>
                            </St.BeerBox>
                        </St.AlcolBox>
                    </St.AlcoholCapacityBox>
                    <InputBox
                        labelText="주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.address}
                        name="address"
                        onClickInputBox={(e) => {
                            openProfileEditModal(e, 'postalCodeModal');
                        }}
                        readOnly
                    />
                    <InputBox
                        labelText="상세 주소"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.detailedAddress}
                        onChange={handleInputChange}
                        name="detailedAddress"
                    />
                    <InputBox
                        labelText="우편번호"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.postalCode}
                        name="postalCode"
                        readOnly
                        onClickInputBox={(e) => {
                            openProfileEditModal(e, 'postalCodeModal');
                        }}
                    />
                    <InputBox
                        labelText="비상 연락망"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.emergencyCall}
                        onChange={handleInputChange}
                        name="emergencyCall"
                    />
                    <St.VoiceBox
                        onClick={(e) => {
                            openProfileEditModal(e, 'voiceModal');
                        }}
                    >
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
            <Modal
                modalId="alcoholLevelModal"
                contents={<ModalAlcoholLevelDropdown />}
                buttonText={'저장하기'}
            />
            <Modal
                modalId="postalCodeModal"
                contents={
                    <ModalPostalCode
                        handleSearchedPostalCode={handleSearchedPostalCode}
                    />
                }
                buttonText={'저장하기'}
            />
            <Modal
                modalId="voiceModal"
                contents={<ModalVoice />}
                buttonText={'저장하기'}
            />
        </>
    );
};

export default ProfileUpdate;
