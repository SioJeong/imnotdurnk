import { useEffect } from 'react';
import { styled } from 'styled-components';
import ToggleButton from '@/components/button/ToggleButton';
import useNavigationStore from '@/stores/useNavigationStore';
import Login from '@/components/login/Login';

const Account = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: false,
            icon1: { iconname: 'address' },
            title: 'Home',
            icon2: { iconname: 'check', isRed: true },
        });
    }, [setNavigation]);

    return (
        <AccountContainer>
            <ToggleButton toggle1="Log in" toggle2="Sign up" isMono={true} />
            <Login></Login>
        </AccountContainer>
    );
};

const AccountContainer = styled.div`
    display: flex;
    min-height: calc(100vh - 3rem);
    padding: 1.625rem 1.5rem;
    flex-direction: column;
    align-items: center;
    gap: 1.8125rem;
    border-radius: 1.25rem;
    background: var(----color-white2, #f7f7ec);
`;

export default Account;
