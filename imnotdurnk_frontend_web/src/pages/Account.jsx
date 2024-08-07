import ToggleButton from '@/components/_button/ToggleButton';
import Login from '@/components/login/Login';
import Signup from '@/components/signup/Signup';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Account = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const [isFirstSelected, setIsFirstSelected] = useState(false);

    const changeFirstToggle = () => {
        setIsFirstSelected(true);
    };
    const changeSecondToggle = () => {
        setIsFirstSelected(false);
    };

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
            <ToggleButton
                toggle1="Log in"
                toggle2="Sign up"
                isMono={true}
                isFirstSelected={isFirstSelected}
                changeFirstToggle={changeFirstToggle}
                changeSecondToggle={changeSecondToggle}
            />
            {isFirstSelected ? <Login /> : <Signup />}
        </AccountContainer>
    );
};

const AccountContainer = styled.div`
    display: flex;
    min-height: calc(100vh - 3rem);
    flex-direction: column;
    align-items: center;
    padding: 26px 24px;
    gap: 1.8125rem;
    border-radius: 1.25rem;
    background: var(--color-white2, #f7f7ec);
`;

export default Account;
