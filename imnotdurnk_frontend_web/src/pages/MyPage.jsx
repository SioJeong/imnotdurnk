import Profile from '@/components/mypage/Profile';
import Statistics from '@/components/statistics/Statistics';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
const MyPage = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address', path: '/' },
            title: '통계',
            icon2: { iconname: 'profile', path: 'mypage/profile' },
        });
    }, [setNavigation]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Statistics />} />
                <Route path="/profile/*" element={<Profile />} />
            </Routes>
        </>
    );
};

export default MyPage;
