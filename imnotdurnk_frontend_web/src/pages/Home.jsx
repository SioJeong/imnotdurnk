import { useEffect } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';
import Pagenation from '@/components/_common/Pagination';

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
           <Pagenation totalPages ='4' />
        </>
    );
};

export default Home;
