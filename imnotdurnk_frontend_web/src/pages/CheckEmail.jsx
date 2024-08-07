import Modal from '@/components/_modal/Modal';
import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';
import InformationMessage from '@/components/checkemail/InformationMessage';
import {
    checkCertificationNumber,
    sendCertificationNumber,
    signup,
} from '@/services/user';
import useModalStore from '@/stores/useModalStore';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalTextBox from '../components/_modal/ModalTextBox';
import useUserStore from '../stores/useUserStore';

const CheckEmail = () => {
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));

    const [alertContents, setAlertContents] = useState('');
    const navigate = useNavigate();
    const [inputCertNum, setInputCertNum] = useState('');
    const [isWrong, setIsWrong] = useState(false);

    // 모달
    const { openModal, closeModal } = useModalStore();
    const modalId = 'signupsuccessModal';
    //모달 열기
    const openSignupSuccessModal = (modalId) => {
        openModal(modalId);
    };
    // 인증번호 전송
    useEffect(() => {
        //  const sendCertNumList = async sendCertificationNumber(user.email);
        const sendEmailVerification = async () => {
            try {
                if (user.email !== '') {
                    const sendResult = await sendCertificationNumber(
                        user.email,
                    );
                }
            } catch (error) {
                console.error('이메일 인증 코드 발송 중 오류 발생', error);
            }
        };
        sendEmailVerification();
    }, []);

    //재전송하기
    const onClickResendButton = async () => {
        const resendResult = await sendCertificationNumber(user.email);
    };
    //인증번호 비교하기
    const compareCertificationNumber = async (certNumString) => {
        // 4자리로 변경되면 이걸로 사용
        console.log('컴페어 함수 내', certNumString);
        const comparedResult = await checkCertificationNumber(
            user.email,
            certNumString,
        );
        console.log(comparedResult, 'cr');
        if (comparedResult.isSuccess) {
            const signupResult = await signup(
                user.name,
                user.email,
                user.phone,
                user.password,
            );
            console.log('사인업 결과', signupResult);
            if (signupResult.isSuccess) {
                console.log('사인업 성공');
                openSignupSuccessModal(modalId);
            }
        } else {
            setIsWrong(true);
            setAlertContents('인증코드가 틀립니다.');
        }
    };
    //네비
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '-1' },
            title: '이메일 인증하기',
            icon2: { iconname: 'empty' },
        });
    }, [setNavigation]);

    return (
        <>
            <InformationMessage email={user.email} />
            <CertificationNumberInputContainer
                email={user.email}
                inputCertNum={inputCertNum}
                setInputCertNum={setInputCertNum}
                onClickResendButton={onClickResendButton}
                compareCertificationNumber={compareCertificationNumber}
                isWrong={isWrong}
                setIsWrong={setIsWrong}
                alertContents={alertContents}
                setAlertContents={setAlertContents}
            />

            <Modal
                modalId={modalId}
                contents={<ModalTextBox text="가입을 완료했습니다." />}
                buttonText={'로그인'}
                onButtonClick={() => {
                    closeModal();
                    navigate('/account');
                }}
            />
        </>
    );
};

export default CheckEmail;
