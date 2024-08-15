import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavigationStore from './../stores/useNavigationStore';

const useGameNavigation = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // GameResult, AddGameToPlan 경로일 경우 네비게이션 설정을 하지 않음
        if (
            path.match('/game/game-result') ||
            path.match('/game/game-result/add-to-plan')
        ) {
            return;
        }

        if (path.match('/game/voicegame')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/game' },
                title: '발음 게임',
                icon2: { iconname: 'empty' },
            });
        } else if (path.match('/game/balancegame')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/game' },
                title: '밸런스 게임',
                icon2: { iconname: 'empty' },
            });
        } else if (path.match('/game/typinggame')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/game' },
                title: '타이핑 게임',
                icon2: { iconname: 'empty' },
            });
        } else if (path.match('/game/memorizegame')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/game' },
                title: '기억력 게임',
                icon2: { iconname: 'empty' },
            });
        } else {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', path: '/' },
                title: '게임 목록',
                icon2: { iconname: 'empty' },
            });
        }
    }, [location.pathname, setNavigation]);

    return { navigate };
};

export default useGameNavigation;
