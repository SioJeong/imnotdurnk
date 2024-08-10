import beerBottleImage from '@/assets/images/beerbottle.webp';
import sojuBottleImage from '@/assets/images/sojubottle.webp';
import InputBox from '@/components/_common/InputBox';
import Modal from '@/components/_modal/Modal';
import ModalPostalCode from '@/components/_modal/ModalPostalCode';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlcohol from '../_modal/ModalAlcohol';
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
    const [alertMessages, setAlertMessages] = useState({
        nickname: '', // 2~10자 한글만 가능
        phone: '',
        emergencyCall: '', //유효한 번호 형식이 아닙니다.
    });
    const { user, setTmpUser, tmpUser } = useUserStore((state) => ({
        user: state.user,
        setTmpUser: state.setTmpUser,
        tmpUser: state.tmpUser,
    }));
    const navigate = useNavigate();
    const onClickPasswordChangeButton = () => {
        navigate('/find-password');
    };
    const formatPhoneNumber = (value) => {
        const numericValue = value.replace(/\D/g, '');

        // 포맷팅된 전화번호를 반환
        if (numericValue.length > 6) {
            return numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (numericValue.length > 3) {
            return numericValue.replace(/(\d{3})(\d{0,4})/, '$1-$2');
        }
        return numericValue;
    };
    const validateInput = (name, value) => {
        let message = '';
        const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
        const phoneRegex = /^(010|011)-\d{4}-\d{4}$/;

        if (name === 'nickname') {
            if (value.length !== 0 && !nicknameRegex.test(value)) {
                message = '2 ~ 10자 내 한국어로 입력해야 합니다.';
            }
        } else if (name === 'emergencyCall') {
            if (value.length !== 0 && !phoneRegex.test(value)) {
                message = '올바른 전화번호 양식이 아닙니다.';
            }
        } else if (name === 'phone') {
            if (value.length !== 0 && !phoneRegex.test(value)) {
                message = '올바른 전화번호 양식이 아닙니다.';
            }
        }

        return message;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;
        if (name === 'emergencyCall' || name === 'phone') {
            formattedValue = formatPhoneNumber(value);
        }

        setInputValues((prevValues) => {
            const newValues = { ...prevValues, [name]: formattedValue };
            const message = validateInput(name, formattedValue);

            setAlertMessages((prevMessages) => ({
                ...prevMessages,
                [name]: message,
            }));

            return newValues;
        });
    };

    const handleSearchedPostalCode = (address, zonecode) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            postalCode: zonecode,
            address: address,
        }));
        // tmpUser 업데이트
    };

    // 소주, 맥주 마신 양 선택 모달
    // const [selectedSojuBottleCount, setSelectedSojuBottleCount] = useState(
    //     0, // Math.floor(plan.sojuAmount / 8),
    // );
    // const [selectedSojuGlassCount, setSelectedSojuGlassCount] = useState(
    //     0,
    //     //plan.sojuAmount % 8,
    // );
    // const [selectedBeerBottleCount, setSelectedBeerBottleCount] = useState(
    //     0, //   Math.floor(plan.beerAmount / 500),
    // );
    // const [selectedBeerGlassCount, setSelectedBeerGlassCount] = useState(
    //     0, //   Math.round((plan.beerAmount % 500) / 355),
    // );

    // const handleSelectedSojuBottleCount = (sojuBottleCount) => {
    //     setSelectedSojuBottleCount(sojuBottleCount);
    // };

    // const handleSelectedSojuGlassCount = (sojuGlassCount) => {
    //     setSelectedSojuGlassCount(sojuGlassCount);
    // };

    // const handleSelectedBeerBottleCount = (beerBottleCount) => {
    //     setSelectedBeerBottleCount(beerBottleCount);
    // };

    // const handleSelectedBeerGlassCount = (beerGlassCount) => {
    //     setSelectedBeerGlassCount(beerGlassCount);
    // };
    // const submitSelectedAlcohol = () => {
    //     console.log(
    //         selectedSojuBottleCount,
    //         selectedSojuGlassCount,
    //         selectedBeerGlassCount,
    //     );
    //     // setPlan({
    //     //     sojuAmount: selectedSojuBottleCount * 8 + selectedSojuGlassCount,
    //     //     beerAmount:
    //     //         selectedBeerBottleCount * 500 + selectedBeerGlassCount * 355,
    //     // });
    //     closeModal('alcoholModal');
    // };
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
                unsure: !user.unsure ? user.unsure : true,
                voice: user.voice || '',
            });
        }
    }, []);

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
                        alertContents={alertMessages.nickname}
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
                        alertContents={alertMessages.phone}
                    />
                    <St.AlcoholCapacityBox
                        onClick={(e) => {
                            openProfileEditModal(e, 'alcoholModal');
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
                        onChange={handleInputChange}
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
                        alertContents={alertMessages.detailedAddress}
                    />
                    <InputBox
                        labelText="우편번호"
                        iconName="empty"
                        inputType="text"
                        value={inputValues.postalCode}
                        name="postalCode"
                        readOnly
                        onChange={handleInputChange}
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
                        alertContents={alertMessages.emergencyCall}
                    />
                </St.InfoContainer>
            </St.ProfileContainer>
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
                modalId="alcoholModal"
                contents={
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.7143rem',
                        }}
                    >
                        <ModalAlcohol
                            drinkType={'소주'}
                            selectedSojuBottleCount={selectedSojuBottleCount}
                            // handleSelectedSojuBottleCount={
                            //     handleSelectedSojuBottleCount
                            // }
                            selectedSojuGlassCount={selectedSojuGlassCount}
                            // handleSelectedSojuGlassCount={
                            //     handleSelectedSojuGlassCount
                            // }
                        />
                        <ModalAlcohol
                            drinkType={'맥주'}
                            selectedBeerBottleCount={selectedBeerBottleCount}
                            // handleSelectedBeerBottleCount={
                            //     handleSelectedBeerBottleCount
                            // }
                            selectedBeerGlassCount={selectedBeerGlassCount}
                            // handleSelectedBeerGlassCount={
                            //     handleSelectedBeerGlassCount
                            // }
                        />
                    </div>
                }
                buttonText={'저장하기'}
                onButtonClick={submitSelectedAlcohol}
            />
        </>
    );
};

export default ProfileUpdate;
