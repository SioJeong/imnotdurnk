import IconButton from '@/components/_button/IconButton.jsx';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import useCalendarStore from '../../stores/useCalendarStore.js';
import useNavigationStore from '../../stores/useNavigationStore.js';
import * as St from './Navigation.style.js';

const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);
    const { plan, resetPlan, submitPlan, planDetail } = useCalendarStore();

    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const handleNavigation = async (path) => {
        if (path === '-1') {
            navigate(-1);
        } else if (path === 'submitPlan') {
            const [year, month] = plan.date
                .replace('년', '')
                .replace('월', '')
                .replace('일', '')
                .split(' ')
                .map((item) => item.trim());

            // 제목 필수! 빈 값이면 반환
            if (!plan.title || plan.title.trim() === '') {
                alert('제목을 입력해야 합니다.');
                return;
            }

            const success = await submitPlan(); // 일정 제출 함수 호출

            if (success) {
                // 쿼리 무효화
                queryClient.invalidateQueries([
                    'monthlyEventList',
                    year,
                    month,
                ]);
                // TODO: 일정 등록 완료 alert 커스텀
                alert('일정이 등록 되었습니다.');
                resetPlan();
                navigate('/calendar');
            }
        } else if (path === 'goEditPlan') {
            const planId = location.pathname.split('/')[4];
            navigate(`/calendar/edit-plan/${planId}`);
        } else if (path === 'editPlan') {
            console.log('수정할 때 보낼 데이터: ', planDetail);
        } else if (path) {
            navigate(path);
        }
    };

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                    onClick={() => handleNavigation(navigation.icon1.path)}
                />
            )}
            <h4>{navigation.title}</h4>
            {navigation.icon2 && (
                <IconButton
                    iconname={navigation.icon2.iconname}
                    isRed={navigation.icon2.isRed}
                    onClick={() => handleNavigation(navigation.icon2.path)}
                />
            )}
        </St.NavContainer>
    );
};

export default Navigation;
