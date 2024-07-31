import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';

import CheckEmailContainer from '@/components/findpassword/CheckEmailContainer.jsx';
import InformationContainer from '@/components/findpassword/InformationContainer.jsx';

const FindPassword = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const [isSent, setIsSent] = useState(true);

    const handleIsSent = () => {
        setIsSent(true);
    };
    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow' },
            title: '비밀번호 찾기',
            icon2: { iconname: 'empty' },
        });
    }, [setNavigation]);

    return (
        <>
            <CheckEmailContainer handleIsSent={handleIsSent} />
            {isSent ? <InformationContainer /> : null}
        </>
    );
};

export default FindPassword;
