import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';
import InformationMessage from '@/components/checkemail/InformationMessage';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendCertificationNumber } from '../services/user';
const CheckEmail = () => {
    const location = useLocation();
    const { email } = location.state || {}; // 전달된 state에서 email을 추출합니다.
    // 인증번호 전송
    useEffect(() => {
        const result = sendCertificationNumber(email);
        console.log('유즈이펙트내 콘솔', result);
    }, [email]);
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow' },
            title: '이메일 인증하기',
            icon2: { iconname: 'empty' },
        });
    }, [setNavigation]);

    return (
        <>
            <InformationMessage email={email} />
            <CertificationNumberInputContainer email={email} />
        </>
    );
};

export default CheckEmail;
