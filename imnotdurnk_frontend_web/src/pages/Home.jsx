import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { icons } from '../shared/constants/icons';
import useAuthStore from '../stores/useAuthStore';
import useCalendarStore from '../stores/useCalendarStore';

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();
    const { setSelectedDate } = useCalendarStore();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'empty' },
            title: 'Home',
            icon2: {
                iconname: 'profile',
                isRed: false,
                path: '/mypage/profile',
            },
        });
    }, [setNavigation]);

    // 홈으로 오면 selectedDate 상태를 오늘로 변경 (게임 기록 등록 시 날짜 위해)
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const goToCalender = () => navigate('/calendar');
    const goToAccount = () => navigate('/account');
    const goToMyPage = () => navigate('/mypage');
    const goToGame = () => navigate('/game');
    const goToNavigation = () => console.log('앱으로 이동');

    const tabContentsList = [
        {
            iconName: 'homeCalendar',
            text: '음주 기록 캘린더',
            onClick: goToCalender,
            backgroundColor: 'var(--color-white2)',
            fontColor: 'var(--color-green2)',
        },
        {
            iconName: 'homeMiniGame',
            text: '만취 판단 미니 게임',
            onClick: goToGame,
            backgroundColor: 'var(--color-red)',
            fontColor: 'var(--color-white1)',
        },
        {
            iconName: 'homeLocation',
            text: '최소 택시비 길찾기',
            onClick: goToNavigation,
            backgroundColor: 'var(--color-white2)',
            fontColor: 'var(--color-green2)',
        },
        {
            iconName: 'homeChart',
            text: '나의 음주 통계',
            onClick: goToMyPage,
            backgroundColor: 'var(--color-green2)',
            fontColor: 'var(--color-white1)',
        },
    ];

    return (
        <HomeContainer>
            <div onClick={goToAccount}> (임시)로그인으로 이동</div>
            {tabContentsList.map((item, index) => (
                <HomeBox
                    key={index}
                    onClick={item.onClick}
                    $backgroundColor={item.backgroundColor}
                >
                    <StyledImage
                        src={icons[`${item.iconName}`]}
                        alt={item.text}
                    />
                    <StyledH3 $fontColor={item.fontColor}>{item.text}</StyledH3>
                </HomeBox>
            ))}
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    display: flex;
    width: 25.7143rem;
    height: 38.7143rem;
    padding: 1rem 1rem 2rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 0.7143rem;
    flex-shrink: 0;
    cursor: pointer;
`;

const HomeBox = styled.div`
    display: flex;
    height: 7.6786rem;
    padding: 0.8571rem 1.7143rem;
    justify-content: center;
    align-items: center;
    gap: 1.4286rem;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 20px;
    background: ${(props) => props.$backgroundColor};
`;

const StyledImage = styled.img`
    width: 5.2857rem;
    height: 5.2857rem;
`;

const StyledH3 = styled.h3`
    display: flex;
    width: 11.4286rem;
    height: 1.7143rem;
    flex-direction: column;
    justify-content: center;
    text-align: right;
    color: ${(props) => props.$fontColor};
`;

export default Home;
