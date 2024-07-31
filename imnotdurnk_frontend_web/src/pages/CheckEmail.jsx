import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';
import InformationMessage from '@/components/checkemail/InformationMessage';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';

const CheckEmail = () => {
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
            <InformationMessage email="imnotdurnk@gmail.com" />
            <CertificationNumberInputContainer />
        </>
    );
};

export default CheckEmail;
