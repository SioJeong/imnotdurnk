import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import Button from '../components/_button/Button';
import Modal from '../components/_modal/Modal';
import ModalAlcohol from '../components/_modal/ModalAlcohol';
import ModalDropdown from '../components/_modal/ModalDropdown';
import ModalPassword from '../components/_modal/ModalPassword';
import ModalTextBox from '../components/_modal/ModalTextBox';
import ModalVoice from '../components/_modal/ModalVoice';
import useModalStore from '../stores/useModalStore';

const Test = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const [modalId, setModalId] = useState('');
    const [modalContents, setModalContents] = useState('');

    const { openModal, closeModal } = useModalStore();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: '캘린더',
            icon2: { iconname: 'plus' },
        });
    }, [setNavigation]);

    useEffect(() => {
        if (modalId) {
            openModal(modalId);
        }
    }, [modalId, openModal]);

    const submitFn = () => {
        // 버튼 클릭 시 수행할 동작
        setModalId('');
        closeModal(modalId);
    };

    const closeModalByBackground = (targetModalId) => {
        setModalId('');
        closeModal(targetModalId);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '2rem',
            }}
        >
            <Button
                text={'목소리'}
                isRed={true}
                onClick={() => {
                    setModalId('voiceModal');
                    setModalContents(<ModalVoice />);
                }}
            />
            <Button
                text={'비밀번호'}
                isRed={true}
                onClick={() => {
                    setModalId('passwordModal');
                    setModalContents(<ModalPassword />);
                }}
            />
            <Button
                text={'텍스트'}
                isRed={true}
                onClick={() => {
                    setModalId('textModal');
                    setModalContents(
                        <ModalTextBox
                            text={'텍스트를 입력할 수 있는 모달입니다.'}
                        />,
                    );
                }}
            />
            <Button
                text={'주량'}
                isRed={true}
                onClick={() => {
                    setModalId('alcoholModal');
                    setModalContents(
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.7143rem',
                            }}
                        >
                            <ModalAlcohol drinkType={'소주'} />
                            <ModalAlcohol drinkType={'맥주'} />
                        </div>,
                    );
                }}
            />
            <Button
                text={'드롭다운'}
                isRed={true}
                onClick={() => {
                    setModalId('dropdownModal');
                    setModalContents(<ModalDropdown />);
                }}
            />

            <Modal
                modalId={modalId}
                contents={modalContents}
                buttonText={'저장하기'}
                onButtonClick={submitFn}
                customCloseModal={() => closeModalByBackground(modalId)} // 모달 외부 클릭 시 호출
            />
        </div>
    );
};

export default Test;
