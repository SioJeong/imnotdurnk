import CheckEmailContainer from '@/components/findpassword/CheckEmailContainer.jsx';
import InformationContainer from '@/components/findpassword/InformationContainer.jsx';
import { sendNewPassword } from '@/services/user';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { ToastError, ToastSuccess } from '../components/_common/alert';
const FindPassword = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');
    const [alertMessages, setAlertMessages] = useState({
        email: '',
        //'올바른 이메일 양식이 아닙니다.'
        // '해당 이메일이 없습니다.'
    });
    const handleIsSent = () => {
        setIsSent(true);
    };

    const handleSendNewPassword = async () => {
        if (email) {
            // 이메일이 유효한지 확인
            const sendNewPasswordResult = await sendNewPassword(email);
            if (sendNewPasswordResult.isSuccess) {
                ToastSuccess('임시 비밀번호가 전송되었습니다.', true);
            }
        } else {
            ToastError('임시 비밀번호가 전송에 실패했습니다.', true);
        }
    };
    const checkValidation = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            setAlertMessages((prev) => ({
                ...prev,
                email: '올바른 이메일 양식이 아닙니다.',
            }));
        } else {
            setAlertMessages((prev) => ({
                ...prev,
                email: '',
            }));
        }
        return isValid;
    };
    const onClickSendNewPasswordButton = (e) => {
        e.preventDefault();
        if (checkValidation()) {
            handleIsSent();
            handleSendNewPassword();
        }
    };
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '/account' },
            title: '비밀번호 찾기',
            icon2: { iconname: 'empty' },
        });
    }, [setNavigation]);

    return (
        <>
            <CheckEmailContainer
                handleIsSent={handleIsSent}
                handleSendNewPassword={handleSendNewPassword}
                setEmail={setEmail}
                email={email}
                alertMessages={alertMessages}
                setAlertMessages={setAlertMessages}
                checkValidation={checkValidation}
                onClickSendNewPasswordButton={onClickSendNewPasswordButton}
            />
            {isSent ? (
                <InformationContainer
                    handleSendNewPassword={handleSendNewPassword}
                />
            ) : null}
        </>
    );
};

export default FindPassword;
