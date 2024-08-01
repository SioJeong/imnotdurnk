import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavigationStore from './../stores/useNavigationStore';

const useCalendarNavigation = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.match('/calendar/create-plan')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '일정 추가',
                icon2: { iconname: 'check', isRed: 'true', path: 'submitPlan' },
            });
        } else if (location.pathname.startsWith('/calendar/')) {
            const [year, month, day] = location.pathname
                .split('/')[2]
                .split('-');
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/calendar' },
                title: `${year}년 ${month}월 ${day}일`,
                icon2: { iconname: 'plus', path: '/calendar/create-plan' },
            });
        } else {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', path: '/' },
                title: '캘린더',
                icon2: { iconname: 'plus', path: '/calendar/create-plan' },
            });
        }
    }, [location, setNavigation]);

    return { navigate };
};

export default useCalendarNavigation;
