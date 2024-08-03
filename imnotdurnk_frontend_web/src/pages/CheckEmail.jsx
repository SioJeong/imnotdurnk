import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';
import InformationMessage from '@/components/checkemail/InformationMessage';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const CheckEmail = () => {
    const location = useLocation();
    const { email } = location.state || {}; // 전달된 state에서 email을 추출합니다.

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
            <CertificationNumberInputContainer />
        </>
    );
};

export default CheckEmail;
