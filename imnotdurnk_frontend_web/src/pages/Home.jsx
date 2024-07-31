import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const navigate = useNavigate();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: 'Home',
            icon2: { iconname: 'check', isRed: true },
        });
    }, [setNavigation]);

    const goToCalender = () => navigate('/calendar');
    const goToAccount = () => navigate('/account');

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <br />
            <button onClick={goToAccount}>로그인/회원가입 이동</button>
            <br />
            <br />
            <button onClick={goToCalender}>캘린더로 이동</button>
        </div>
    );
};

export default Home;
