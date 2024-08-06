import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavigationStore from '../stores/useNavigationStore';

const useMyPageNavigation = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path === '/mypage') {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', path: '/' },
                title: '통계',
                icon2: { iconname: 'profile', path: 'mypage/profile' },
            });
        } else if (path === '/mypage/profile') {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/' },
                title: '프로필',
                icon2: { iconname: 'modify', path: 'mypage/profile/update' },
            });
        } else if (path.startsWith('/mypage/profile/create/')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'empty' },
                title: '추가 정보 등록',
                icon2: { iconname: 'empty' },
            });
        } else if (path === '/mypage/profile/update') {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '프로필 변경',
                icon2: { iconname: 'check', isRed: 'true', path: 'submitPlan' },
            });
        }
    }, [location.pathname, setNavigation]);

    return { navigate };
};

export default useMyPageNavigation;
