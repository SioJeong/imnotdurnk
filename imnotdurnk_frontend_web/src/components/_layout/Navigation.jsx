import IconButton from '@/components/_button/IconButton.jsx';
import {
    convertDateToString,
    dateStringToUrl,
    parseDateTime,
} from '@/hooks/useDateTimeFormatter.js';
import useCalendarStore from '@/stores/useCalendarStore.js';
import useNavigationStore from '@/stores/useNavigationStore.js';
import useUserStore from '@/stores/useUserStore.js';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteGameFromPlan } from '../../services/game.js';
import { putUserDetailedInfo } from '../../services/user.js';
import useGameStore from '../../stores/useGameStore.js';
import { ToastError, ToastSuccess, ToastWarning } from '../_common/alert.js';
import * as St from './Navigation.style.js';

const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);
    const {
        plan,
        resetPlan,
        submitPlan,
        planDetail,
        setPlanDetail,
        resetPlanDetail,
        editPlan,
    } = useCalendarStore();
    const { tmpUser, user, setUser, isValid, setUserFromTmp } = useUserStore(
        (state) => ({
            user: state.user,
            setUser: state.setUser,
            tmpUser: state.tmpUser,
            isValid: state.isValid,
            setUserFromTmp: state.setUserFromTmp,
        }),
    );
    const {
        voiceGameResult,
        resetVoiceGameResult,
        isVoiceGameResultSet,
        balanceGameResult,
        resetBalanceGameResult,
        isBalanceGameResultSet,
        typingGameResult,
        resetTypingGameResult,
        isTypingGameResultSet,
        memorizeGameResult,
        resetMemorizeGameResult,
        isMemorizeGameResultSet,
    } = useGameStore();

    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const handleNavigation = async (path) => {
        if (path === '-1') {
            navigate(-1);
        } else if (path === 'submitPlan') {
            const [year, monthStr, day] = dateStringToUrl(plan.date).split('-');
            const month = parseInt(monthStr);
            const todayUrl = `${year}-${monthStr}-${day}`;

            // 제목 필수! 빈 값이면 반환
            if (!plan.title || plan.title.trim() === '') {
                ToastWarning('제목을 입력해야 합니다.', true);
                return;
            }

            const voiceGameResultData = {
                planId: voiceGameResult.planId, // 아직 일정 생성 전 (0)
                score: voiceGameResult.score,
                filename: voiceGameResult.filename,
                script: voiceGameResult.script,
            };

            const balanceGameResultData = {
                planId: balanceGameResult.planId, // 아직 일정 생성 전 (0)
                gameType: balanceGameResult.gameType,
                score: balanceGameResult.score,
            };

            const typingGameResultData = {
                planId: typingGameResult.planId, // 아직 일정 생성 전 (0)
                gameType: typingGameResult.gameType,
                score: typingGameResult.score,
            };

            const memorizeGameResultData = {
                planId: memorizeGameResult.planId, // 아직 일정 생성 전 (0)
                gameType: memorizeGameResult.gameType,
                score: memorizeGameResult.score,
            };

            // 일정 제출 함수 호출
            const success = await submitPlan(
                voiceGameResultData,
                resetVoiceGameResult,
                isVoiceGameResultSet,
                balanceGameResultData,
                resetBalanceGameResult,
                isBalanceGameResultSet,
                typingGameResultData,
                resetTypingGameResult,
                isTypingGameResultSet,
                memorizeGameResultData,
                resetMemorizeGameResult,
                isMemorizeGameResultSet,
                navigate,
                todayUrl,
                resetPlan,
                queryClient,
            );

            if (success) {
                // 쿼리 무효화
                queryClient.invalidateQueries(['allEventList']);
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

            // planDetail.date가 내일 이후라면 -> 음주 관련 기록은 모두 초기화
            const today = parseDateTime(
                convertDateToString(new Date()),
                '오전 12시 00분',
            );
            const planDetailDate = parseDateTime(
                planDetail.date,
                '오전 12시 00분',
            );

            // 미래 일정으로 수정한 경우, 음주 및 게임 기록 제거 및 초기화
            if (planDetailDate > today) {
                if (planDetail.gameLogDtos.length > 0) {
                    await deleteGameFromPlan({ planId: planDetail.id });
                }
                setPlanDetail({
                    sojuAmount: 0,
                    beerAmount: 0,
                    alcoholLevel: 0,
                    arrivalTime: '',
                    gameLogEntities: [],
                });
            }

            const success = await editPlan(); // 일정 수정 함수 호출

            if (success) {
                // 쿼리 무효화
                queryClient.invalidateQueries(['allEventList']);
                queryClient.invalidateQueries(['planDetail', planId]);
                ToastSuccess('일정이 수정되었습니다!', true, true);
                resetPlanDetail();
                navigate(`/calendar/${date}/plan/${planId}`); // 일정 상세 페이지로 이동
            }
        } else if (path === 'updateProfile') {
            if (isValid) {
                // 프로필 변경 api
                const profileUpdateResult = await putUserDetailedInfo({
                    nickname: tmpUser.nickname,
                    postalCode: tmpUser.postalCode,
                    address: tmpUser.address,
                    detailedAddress: tmpUser.detailedAddress,
                    emergencyCall: tmpUser.emergencyCall,
                    phone: tmpUser.phone,
                    beerCapacity: tmpUser.beerCapacity,
                    sojuCapacity: tmpUser.sojuCapacity,
                    sojuUnsure: tmpUser.sojuUnsure,
                    beerUnsure: tmpUser.beerUnsure,
                });
                if (profileUpdateResult.isSuccess) {
                    // tmpUser값으로  User 변경 tmpUser 값 다 지우기
                    setUserFromTmp();
                    ToastSuccess('프로필을 변경했습니다', true);
                    navigate('/mypage/profile');
                } else {
                    ToastError('프로필 업데이트를 실패했습니다.', true);
                }
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
