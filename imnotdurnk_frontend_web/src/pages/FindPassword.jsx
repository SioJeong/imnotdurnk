import { useEffect, useState } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';

import CheckEmailContainer from '@/components/findpassword/CheckEmailContainer.jsx';
import InformationContainer from '@/components/findpassword/InformationContainer.jsx';

const FindPassword = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const [isSent] = useState(true);

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
            <CheckEmailContainer />
            {isSent ? <InformationContainer /> : null}
        </>
    );
};

export default FindPassword;
