import CheckEmailContainer from '@/components/findpassword/CheckEmailContainer.jsx';
import InformationContainer from '@/components/findpassword/InformationContainer.jsx';
import { sendNewPassword } from '@/services/user';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
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
        console.log('hs', email);
    };

    const handleSendNewPassword = async () => {
        console.log('Sending new password for email:', email); // 상태 확인
        if (email) {
            // 이메일이 유효한지 확인
            const sendNewPasswordResult = await sendNewPassword(email);
            if (sendNewPasswordResult.isSuccess) {
                console.log(sendNewPasswordResult);
            }
        } else {
            console.error('No email provided');
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
            console.log('유효성 검사 ㄱ성공', email);
            handleIsSent();
            handleSendNewPassword();
        }
    };
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '-1' },
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
