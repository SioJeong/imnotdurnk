import IconButton from '@/components/_button/IconButton.jsx';
import { dateStringToUrl } from '@/hooks/useDateTimeFormatter.js';
import useCalendarStore from '@/stores/useCalendarStore.js';
import useNavigationStore from '@/stores/useNavigationStore.js';
import useUserStore from '@/stores/useUserStore.js';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import * as St from './Navigation.style.js';
const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);
    const {
        plan,
        resetPlan,
        submitPlan,
        planDetail,
        resetPlanDetail,
        editPlan,
    } = useCalendarStore();
    const { tmpUser, user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
        tmpUser: state.tmpUser,
    }));
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const handleNavigation = async (path) => {
        if (path === '-1') {
            navigate(-1);
        } else if (path === 'submitPlan') {
            let [year, month] = dateStringToUrl(plan.date).split('-');
            month = parseInt(month);

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
            const planId = planDetail.id;
            const date = dateStringToUrl(planDetail.date);

            // 제목 필수! 빈 값이면 반환
            if (!planDetail.title || planDetail.title.trim() === '') {
                alert('제목을 입력해야 합니다.');
                return;
            }

            const success = await editPlan(); // 일정 수정 함수 호출

            if (success) {
                queryClient.invalidateQueries(['planDetail', planId]);
                // TODO: 일정 수정 완료 alert 커스텀
                alert('일정이 수정 되었습니다.');
                resetPlanDetail();
                navigate(`/calendar/${date}/plan/${planId}`); // 일정 상세 페이지로 이동
            }
        } else if (path === 'updateProfile') {
            console.log('프로필 업데잍확인', tmpUser);
            if (tmpUser.isAvailable) {
                console.log('있음');
            } else {
                console.log('없음');
            }
            //api 요청

            //성공하면 전역상태 user에 저장
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
