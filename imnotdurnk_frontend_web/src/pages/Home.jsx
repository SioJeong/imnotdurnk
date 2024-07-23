import { useEffect } from 'react';
import useNavigationStore from '../stores/useNavigationStore';
import MiniButton from '../components/_common/MiniButton';

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: 'Home',
            icon2: { iconname: 'check', isRed: true },
        });
    }, [setNavigation]);

    return (
        <>
            <MiniButton text={'회원탈퇴'} iconname={'bin'} />
        </>
    );
};

export default Home;
