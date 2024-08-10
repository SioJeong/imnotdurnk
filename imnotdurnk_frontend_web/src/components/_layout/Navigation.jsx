import IconButton from '@/components/_button/IconButton.jsx';
import { dateStringToUrl } from '@/hooks/useDateTimeFormatter.js';
import useCalendarStore from '@/stores/useCalendarStore.js';
import useNavigationStore from '@/stores/useNavigationStore.js';
import useUserStore from '@/stores/useUserStore.js';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { putUserDetailedInfo } from '../../services/user.js';
import { ToastError, ToastSuccess, ToastWarning } from '../_common/alert.js';
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
    const { tmpUser, user, setUser, isValid } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
        tmpUser: state.tmpUser,
        isValid: state.isValid,
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
                ToastWarning('제목을 입력해야 합니다.', true);
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
                ToastSuccess('일정이 등록되었습니다!', true);
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
                ToastWarning('제목을 입력해야 합니다.', true);
                return;
            }

            const success = await editPlan(); // 일정 수정 함수 호출

            if (success) {
                queryClient.invalidateQueries(['planDetail', planId]);
                ToastSuccess('일정이 수정되었습니다!', true, true);
                resetPlanDetail();
                navigate(`/calendar/${date}/plan/${planId}`); // 일정 상세 페이지로 이동
            }
        } else if (path === 'updateProfile') {
            console.log(isValid, '프로필 업데잍확인', tmpUser);
            if (isValid) {
                // 프로필 변경 api
                const profileUpdateResult = await putUserDetailedInfo(
                    tmpUser.nickname,
                    tmpUser.postalCode,
                    tmpUser.address,
                    tmpUser.detailedAddress,
                    tmpUser.emergencyCall,
                    tmpUser.phone,
                    tmpUser.beerCapacity,
                    tmpUser.sojuCapacity,
                    //tmpUser.sojuUnsure,
                    //tmpUser.beerUnsure,
                );
                // User 전역 상태 변경

                // tmpUser 값 다 지우기

                //ToastSuccess('프로필을 변경했습니다', true);
                //navigate('/profile');
            } else {
                ToastError('프로필 변경에 실패했습니다', true);
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
