import beerBottleImage from '@/assets/images/beerbottle.webp';
import sojuBottleImage from '@/assets/images/sojubottle.webp';
import InputBox from '@/components/_common/InputBox';
import Modal from '@/components/_modal/Modal';
import ModalPostalCode from '@/components/_modal/ModalPostalCode';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEditDrinkingCapacity from '../_modal/ModalEditDrinkingCapacity';
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
        latitude: '',
        longitude: '',
        sojuUnsure: false,
        beerUnsure: false,
    });
    const [alertMessages, setAlertMessages] = useState({
        nickname: '', // 2~10자 한글만 가능
        phone: '',
        emergencyCall: '', //유효한 번호 형식이 아닙니다.
    });

    const { user, setTmpUser, tmpUser, isValid, setIsValid } = useUserStore(
        (state) => ({
            user: state.user,
            setTmpUser: state.setTmpUser,
            tmpUser: state.tmpUser,
            isValid: state.isValid,
            setIsValid: state.setIsValid,
        }),
    );

    // TODO : alcoholModal용
    const [selectedSojuBottleCount, setSelectedSojuBottleCount] = useState(0);
    const [selectedSojuGlassCount, setSelectedSojuGlassCount] = useState(0);
    const [selectedBeerBottleCount, setSelectedBeerBottleCount] = useState(0);
    const [selectedBeerGlassCount, setSelectedBeerGlassCount] = useState(0);
    const toggleSojuUnsure = () => {
        setInputValues((prevValues) => ({
            ...prevValues, // 현재 상태를 유지
            sojuUnsure: !prevValues.sojuUnsure,
        }));
    };
    const toggleBeerUnsure = () => {
        setInputValues((prevValues) => ({
            ...prevValues, // 현재 상태를 유지
            beerUnsure: !prevValues.beerUnsure,
        }));
    };
    const handleModalEditDrinkingCapacity = () => {
        console.log(
            '결과는?',
            selectedBeerBottleCount,
            selectedBeerGlassCount,
            selectedSojuBottleCount,
            selectedSojuGlassCount,
        );
        console.log(
            '잔단위로 계산 값',
            selectedBeerBottleCount * 500 + selectedBeerGlassCount * 355,
        );
        console.log(
            '잔단위로 계산 값',
            selectedSojuBottleCount * 8 + selectedSojuGlassCount,
        );
        if (!inputValues.beerUnsure) {
            setInputValues((prevValues) => ({
                ...prevValues, // 현재 상태를 유지
                beerCapacity:
                    selectedBeerBottleCount * 500 +
                    selectedBeerGlassCount * 355,
            }));
        } else {
            setInputValues((prevValues) => ({
                ...prevValues, // 현재 상태를 유지
                beerCapacity: 0,
            }));
        }
        if (!inputValues.sojuUnsure) {
            setInputValues((prevValues) => ({
                ...prevValues, // 현재 상태를 유지
                sojuCapacity:
                    selectedSojuBottleCount * 8 + selectedSojuGlassCount,
            }));
        } else {
            setInputValues((prevValues) => ({
                ...prevValues, // 현재 상태를 유지
                sojuCapacity: 0,
            }));
        }
        closeModal('alcoholModal');
    };

    //
    const navigate = useNavigate();

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
                setIsValid(false);
            } else {
                setIsValid(true);
            }
        } else if (name === 'emergencyCall') {
            if (value.length !== 0 && !phoneRegex.test(value)) {
                message = '올바른 전화번호 양식이 아닙니다.';
                setIsValid(false);
            } else {
                setIsValid(true);
            }
        } else if (name === 'phone') {
            if (value.length !== 0 && !phoneRegex.test(value)) {
                message = '올바른 전화번호 양식이 아닙니다.';
                setIsValid(false);
            } else {
                setIsValid(true);
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
                latitude: user.latitude || '',
                longitude: user.longitude || '',
                beerCapacity: user.beerCapacity,
                sojuCapacity: user.sojuCapacity,
                sojuUnsure: user.sojuUnsure || false,
                beerUnsure: user.beerUnsure || false,
            });
            setSelectedBeerBottleCount(user.beerCapacity / 500);
            setSelectedBeerGlassCount((user.beerCapacity % 500) / 355);
            setSelectedSojuBottleCount(user.sojuCapacity / 8);
            setSelectedSojuGlassCount(user.sojuCapacity % 8);
        }
    }, []);

    // inputValues 변경 시 tmpUser 업데이트(추후 API 요청시 tmpUser 데이터로 진행)
    useEffect(() => {
        setTmpUser(inputValues);
    }, [inputValues, setTmpUser]);

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
                                <St.Text>
                                    {' '}
                                    {inputValues.sojuUnsure
                                        ? `모름`
                                        : `${Math.floor((inputValues.sojuCapacity / 8) * 10) / 10} 병`}
                                </St.Text>
                            </St.SojuBox>
                            <St.BeerBox>
                                <St.StyledStepperImage
                                    src={beerBottleImage}
                                    alt={`be`}
                                />
                                <St.Text>
                                    {' '}
                                    {inputValues.beerUnsure
                                        ? `모름`
                                        : `${Math.floor((inputValues.beerCapacity / 500) * 10) / 10} 병`}
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
                    <ModalEditDrinkingCapacity
                        selectedSojuBottleCount={selectedSojuBottleCount}
                        setSelectedSojuBottleCount={setSelectedSojuBottleCount}
                        selectedSojuGlassCount={selectedSojuGlassCount}
                        setSelectedSojuGlassCount={setSelectedSojuGlassCount}
                        selectedBeerBottleCount={selectedBeerBottleCount}
                        setSelectedBeerBottleCount={setSelectedBeerBottleCount}
                        selectedBeerGlassCount={selectedBeerGlassCount}
                        setSelectedBeerGlassCount={setSelectedBeerGlassCount}
                        toggleSojuUnsure={toggleSojuUnsure}
                        toggleBeerUnsure={toggleBeerUnsure}
                        sojuUnsure={inputValues.sojuUnsure}
                        beerUnsure={inputValues.beerUnsure}
                    />
                }
                buttonText={'저장하기'}
                onButtonClick={handleModalEditDrinkingCapacity}
            />
        </>
    );
};

export default ProfileUpdate;
