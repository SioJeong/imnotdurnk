import Profile from '@/components/mypage/Profile';
import Statistics from '@/components/mypage/Statistics';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
const MyPage = () => {
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
        <Container>
            <Routes>
                <Route path="/" element={<Statistics />} />
                <Route path="/profile/*" element={<Profile />} />
            </Routes>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 3rem);
    flex-direction: column;
    align-items: center;
    padding: 26px 24px;
    gap: 1.8125rem;
    border-radius: 1.25rem;
    background: var(--color-white2, #f7f7ec);
`;

export default MyPage;
