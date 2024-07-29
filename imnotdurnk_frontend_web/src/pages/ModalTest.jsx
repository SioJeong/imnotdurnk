import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import Modal from '../components/_modal/Modal';
import ModalAlcohol from '../components/_modal/ModalAlcohol';
import ModalVoice from '../components/_modal/ModalVoice';
import ModalPassword from '../components/_modal/ModalPassword';
import ModalTextBox from '../components/_modal/ModalTextBox';
import Button from '../components/_button/Button';

const Test = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const [isModalOpend, setIsModalOpend] = useState(false);
    const [modalContents, setModalContents] = useState('');

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: '캘린더',
            icon2: { iconname: 'plus' },
        });
    }, [setNavigation]);

    return (
        <>
            <Button
                text={'목소리'}
                isRed={true}
                onClick={() => {
                    setIsModalOpend(true);
                    setModalContents(<ModalVoice />);
                }}
            />
            <Button
                text={'비밀번호'}
                isRed={true}
                onClick={() => {
                    setIsModalOpend(true);
                    setModalContents(<ModalPassword />);
                }}
            />
            <Button
                text={'텍스트'}
                isRed={true}
                onClick={() => {
                    setIsModalOpend(true);
                    setModalContents(<ModalTextBox text={'테스트 중입니다'} />);
                }}
            />
            <Button
                text={'주량'}
                isRed={true}
                onClick={() => {
                    setIsModalOpend(true);
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

            <Modal
                isModalOpend={isModalOpend}
                onClose={() => setIsModalOpend(false)}
                contents={modalContents}
                buttonText={'저장하기'}
            />
        </>
    );
};

export default Test;
