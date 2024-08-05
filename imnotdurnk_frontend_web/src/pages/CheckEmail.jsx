import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';
import InformationMessage from '@/components/checkemail/InformationMessage';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendCertificationNumber } from '../services/user';
import useUserStore from '../stores/useUserStore';
const CheckEmail = () => {
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }));
    const location = useLocation();

    // 인증번호 전송
    useEffect(() => {
        console.log(user);
        const result = sendCertificationNumber(user.email);
    }, []);

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
            <CertificationNumberInputContainer email={user.email} />
        </>
    );
};

export default CheckEmail;
