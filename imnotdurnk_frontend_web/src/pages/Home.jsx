import { useEffect } from 'react';
import useNavigationStore from '../stores/useNavigationStore';

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: false,
            icon1: 'address',
            title: 'Home',
            icon2: 'empty',
        });
    }, [setNavigation]);

    return (
        <>
            <p>홈입니다.</p>
        </>
    );
};

export default Home;
