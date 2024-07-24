import { useEffect } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';
import ToggleButton  from '@/components/_common/ToggleButton';

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
        </>
    );
};

export default Home;
