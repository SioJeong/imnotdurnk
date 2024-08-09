import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavigationStore from './../stores/useNavigationStore';

const useGameNavigation = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path.match('/game/voicegame')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '발음 게임',
                icon2: { iconname: 'empty' },
            });
        } else if (path.match('/game/balancegame')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '밸런스 게임',
                icon2: { iconname: 'empty' },
            });
        } else {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '게임 목록',
                icon2: { iconname: 'empty' },
            });
        }
    }, [location.pathname, setNavigation]);

    return { navigate };
};

export default useGameNavigation;
