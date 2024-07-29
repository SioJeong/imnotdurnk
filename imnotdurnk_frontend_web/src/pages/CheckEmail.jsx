import { useEffect, useState } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';
import InformationMessage from '@/components/checkemail/InformationMessage';
import CertificationNumberInputContainer from '@/components/checkemail/CertificationNumberInputContainer.jsx';

const CheckEmail = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const [isCertificationNumberWrong] = useState(false);
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
            <CertificationNumberInputContainer
                isCertificationNumberWrong={isCertificationNumberWrong}
            />
        </>
    );
};

export default CheckEmail;
