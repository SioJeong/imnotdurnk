import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();
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
    const goToMyPage = () => navigate('/mypage');
    const goToGame = () => navigate('/game');

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <br />
            <button onClick={goToAccount}>로그인/회원가입 이동</button>
            <br />
            <br />
            <button onClick={goToCalender}>캘린더로 이동</button>
            <br />
            <br />
            <button onClick={goToMyPage}>마이페이지로 이동</button>
            <br />
            <br />
            <button onClick={goToGame}>게임으로 이동</button>
        </div>
    );
};

export default Home;
