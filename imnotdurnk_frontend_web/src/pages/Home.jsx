import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ToastWarning } from '../components/_common/alert';
import { icons } from '../shared/constants/icons';
import useAuthStore from '../stores/useAuthStore';
import useCalendarStore from '../stores/useCalendarStore';

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const navigate = useNavigate();

    const { accessToken } = useAuthStore();
    const { setSelectedDate } = useCalendarStore();

    const beforeLogin = {
        iconname: 'login',
        isRed: false,
        path: '/account',
    };

    const afterLogin = {
        iconname: 'mypage',
        isRed: false,
        path: '/mypage',
    };

    const [icon2, setIcon2] = useState(beforeLogin);

    useEffect(() => {
        if (accessToken) {
            setIcon2(afterLogin);
        } else {
            setIcon2(beforeLogin);
        }
    }, [accessToken]);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'empty' },
            title: 'Home',
            icon2: icon2,
        });
    }, [setNavigation, icon2]);

    // 홈으로 오면 selectedDate 상태를 오늘로 변경 (게임 기록 등록 시 날짜 위해)
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const goToGame = () => navigate('/game');
    const goToCalender = () => navigate('/calendar');
    const goToMap = () => {
        // 웹 뷰 환경이라면 Map 메시지 전송
        if (
            window.ReactNativeWebView &&
            typeof window.ReactNativeWebView.postMessage === 'function'
        ) {
            console.log('Sending message to React Native');
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'Map',
                }),
            );
        } else {
            ToastWarning('모바일 환경에서 사용 가능합니다.', true, true);
        }
    };

    return (
        <HomeContainer>
            <h3>
                술자리 전천후 서비스, <br />
                <Title>나안취햄ㅅ어</Title>에 오신 것을 환영합니다
            </h3>
            <MenuItemList>
                <MenuItemDouble>
                    <MenuItem $menu="game" onClick={goToGame}>
                        <MenuItemTitle $dark={false}>
                            만취 판단 미니 게임
                        </MenuItemTitle>
                        <MenuItemIcon
                            src={icons['homeMiniGame']}
                            alt="mini-game"
                            $width="7.5rem"
                            $height="5.7rem"
                        />
                    </MenuItem>
                    <MenuItem $menu="taxi" onClick={goToMap}>
                        <MenuItemTitle $dark={false}>
                            최소 택시비 길 찾기
                        </MenuItemTitle>
                        <MenuItemIcon
                            src={icons['homeTaxi']}
                            alt="taxi"
                            $width="6.8rem"
                            $height="5.4rem"
                        />
                    </MenuItem>
                </MenuItemDouble>
                <MenuItemSingle $menu="calendar" onClick={goToCalender}>
                    <TitleAndIcon>
                        <MenuItemTitle $dark={true}>
                            음주 기록 캘린더
                        </MenuItemTitle>
                        <MenuItemIcon
                            src={icons['homeCalendar']}
                            alt="calendar"
                            $width="8rem"
                            $height="6.8rem"
                        />
                    </TitleAndIcon>
                    <MenuItemIcon
                        src={icons['homeCalendar2']}
                        alt="calendar2"
                        $width="11rem"
                        $height="10.5rem"
                    />
                </MenuItemSingle>
            </MenuItemList>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    text-align: center;
    line-height: normal;
`;

const Title = styled.span`
    font-weight: 500;
    font-size: var(--font-title-h2);
    color: var(--color-red);
`;

const MenuItemList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
`;

const MenuItemDouble = styled.div`
    display: flex;
    justify-content: space-between;
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 2rem 1.8rem 1rem 1.8rem;

    border-radius: 20px;
    background-color: ${({ $menu }) => {
        switch ($menu) {
            case 'game':
                return 'var(--color-green1)';
            case 'taxi':
                return 'var(--color-blue)';
            default:
                return 'var(--color-white2)';
        }
    }};

    cursor: pointer;
`;

const MenuItemTitle = styled.h3`
    color: ${({ $dark }) =>
        $dark ? 'var(--color-green2)' : 'var(--color-white2)'};
`;

const MenuItemIcon = styled.img`
    width: ${({ $width }) => $width || '7.5714rem'};
    height: ${({ $height }) => $height || ' 5.7143rem'};
`;

const MenuItemSingle = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    padding: 2rem;

    border-radius: 20px;
    background-color: ${({ $menu }) => {
        switch ($menu) {
            case 'calendar':
                return 'var(--color-yellow)';
            default:
                return 'var(--color-white2)';
        }
    }};

    cursor: pointer;
`;

const TitleAndIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.4rem;
`;
