import CheckEmailContainer from '@/components/findpassword/CheckEmailContainer.jsx';
import InformationContainer from '@/components/findpassword/InformationContainer.jsx';
import { sendNewPassword } from '@/services/user';
import useNavigationStore from '@/stores/useNavigationStore';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
const FindPassword = () => {
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const [isSent, setIsSent] = useState(false);

    const handleIsSent = () => {
        setIsSent(true);
    };
    const handleSendNewPassword = async () => {
        const sendNewPasswordResult = await sendNewPassword(user.email);
        if (sendNewPasswordResult.isSuccess) {
            console.log(sendNewPasswordResult);
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
