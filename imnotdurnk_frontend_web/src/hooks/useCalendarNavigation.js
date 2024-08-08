import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavigationStore from './../stores/useNavigationStore';

const useCalendarNavigation = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // PlanDetail 경로일 경우 네비게이션 설정을 하지 않음
        if (path.match('/calendar/\\d{4}-\\d{2}-\\d{2}/plan/\\d+')) {
            return;
        }

        if (path.match('/calendar/create-plan')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '일정 추가',
                icon2: { iconname: 'check', isRed: 'true', path: 'submitPlan' },
            });
        }
        // else if (path.match()) {
        //     const date = path.split('/')[2];
        //     setNavigation({
        //         isVisible: true,
        //         icon1: { iconname: 'backarrow', path: `/calendar/${date}` },
        //         title: '일정 상세',
        //         icon2: { iconname: 'modify', path: 'goEditPlan' },
        //     });
        // }
        else if (path.startsWith('/calendar/edit-plan/')) {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '-1' },
                title: '일정 수정',
                icon2: { iconname: 'check', isRed: 'true', path: 'editPlan' },
            });
        } else if (path.startsWith('/calendar/')) {
            const [year, month, day] = path.split('/')[2].split('-');
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
    }, [location.pathname, setNavigation]);

    return { navigate };
};

export default useCalendarNavigation;
