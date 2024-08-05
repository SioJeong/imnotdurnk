import Button from '@/components/_button/Button';
import InputBox from '@/components/_common/InputBox';
import { putUserDetailedInfo } from '@/services/user.js';
import { useState } from 'react';
import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalPostalCode from '../_modal/ModalPostalCode';
import * as St from './ProfileCreateInfo.style';

import { useNavigate } from 'react-router-dom';
const ProfileCreateInfo = () => {
    const [inputValues, setInputValues] = useState({
        nickname: '',
        postalCode: '',
        address: '',
        detailedAddress: '',
        emergencyCall: '',
    });
    const [alertMessages, setAlertMessages] = useState({
        nickname: '',
        postalCode: '',
        address: '',
        detailedAddress: '',
        emergencyCall: '',
    });

    const navigate = useNavigate();
    //유효성 검사
    const checkValidation = () => {
        let isValid = true;
        const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
        const phoneRegex = /^010-\d{4}-\d{4}$/;

        //닉네임 유효성 검사(한글 2~10자)
        if (
            inputValues.nickname.length !== 0 &&
            !nicknameRegex.test(inputValues.nickname)
        ) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                nickname: '2 ~ 10자 내 한국어로  입력해야 합니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                nickname: '',
            }));
        }

        //비상연락망 유효성 검사(아예 안적거나 010-****-****형식)
        if (
            inputValues.emergencyCall.length !== 0 &&
            !phoneRegex.test(inputValues.emergencyCall)
        ) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                emergencyCall: '올바른 전화번호 양식이 아닙니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                emergencyCall: '',
            }));
        }

        return isValid;
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emergencyCall') {
            const formattedValue = formatPhoneNumber(value);
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: formattedValue,
            }));
        } else {
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };
    //모달
    const { openModal, closeModal } = useModalStore();
    const modalId = 'postalCodeModal';
    //모달 열기
    const openPostalCodeModal = (e) => {
        e.preventDefault();
        openModal(modalId);
    };

    const handleSearchedPostalCode = (address, zonecode) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            postalCode: zonecode,
            address: address,
        }));
    };
    const onClickNextButton = (e) => {
        e.preventDefault();
        if (checkValidation()) {
            putUserDetailedInfo(
                inputValues.nickname,
                inputValues.postalCode,
                inputValues.address,
                inputValues.detailedAddress,
                inputValues.emergencyCall,
            );
        }
    };
    const onClickSkipButton = () => {
        navigate('/');
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
                        inputType="text"
                        value={inputValues.postalCode}
                        onChange={handleInputChange}
                        name="postalCode"
                        size="small"
                        alertContents={alertMessages.postalCode}
                        readOnly
                    />
                    <Button
                        text="주소 검색"
                        size="medium"
                        isRed="true"
                        onClick={openPostalCodeModal}
                    />
                </St.PostalCodeSearchBox>

                <InputBox
                    labelText="주소"
                    iconName="empty"
                    inputType="text"
                    value={inputValues.address}
                    onChange={handleInputChange}
                    name="address"
                    alertContents={alertMessages.address}
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
                    labelText="비상 연락망"
                    iconName="empty"
                    inputType="text"
                    value={inputValues.emergencyCall}
                    onChange={handleInputChange}
                    name="emergencyCall"
                    alertContents={alertMessages.emergencyCall}
                />
            </St.InputContainer>
            <St.ButtonBox>
                <Button
                    text="Skip"
                    size="medium"
                    isRed={false}
                    onClick={onClickSkipButton}
                />
                <Button
                    text="Next"
                    size="medium"
                    isRed={true}
                    onClick={onClickNextButton}
                />
            </St.ButtonBox>

            <Modal
                modalId={modalId}
                contents={
                    <ModalPostalCode
                        handleSearchedPostalCode={handleSearchedPostalCode}
                    />
                }
                buttonText={'닫기'}
                onButtonClick={(e) => {
                    closeModal;
                }}
            />
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateInfo;
