import { useEffect } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';
import CheckEmailContainer from '@/components/checkEmail/CheckEmailContainer';

const CheckEmail = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

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
        </>
    );
};

export default CheckEmail;
