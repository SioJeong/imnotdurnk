import Button from '@/components/_button/Button';
import InputBox from '@/components/_common/InputBox';
import { useState } from 'react';
import * as St from './ProfileCreateInfo.style';

import useModalStore from '../../stores/useModalStore';
import Modal from '../_modal/Modal';
import ModalPostalCode from '../_modal/ModalPostalCode';
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
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
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
                    value={inputValues.detailedAdddress}
                    onChange={handleInputChange}
                    name="detailedAddress"
                    alertContents={alertMessages.detailedAdddress}
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
                <Button text="Skip" size="medium" isRed={false} />
                <Button text="Next" size="medium" isRed={true} />
            </St.ButtonBox>

            <Modal
                modalId={modalId}
                contents={
                    <ModalPostalCode
                        handleSearchedPostalCode={handleSearchedPostalCode}
                    />
                }
                buttonText={'닫기'}
                onButtonClick={closeModal}
            />
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateInfo;
