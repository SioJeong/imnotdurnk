import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ToastSuccess } from '../components/_common/alert';
import {
    convertDateToString,
    convertTimeToString,
    parseDateTime,
    parseTime,
} from '../hooks/useDateTimeFormatter';
import { createEvent, updateEvent } from '../services/calendar';
import { saveRestGameResult, saveVoiceGameResult } from '../services/game';

// 로컬 스토리지에 저장 O
const usePersistentStore = create(
    persist(
        (set, get) => ({
            // 1. 일정 상세 -> 수정을 위한 임시 저장용
            planDetail: {
                id: null,
                userId: null,
                date: convertDateToString(new Date()), // 오류 방지 위한 new Date 처리
                time: convertTimeToString(new Date()), // 오류 방지 위한 new Date 처리
                title: '',
                memo: '',
                sojuAmount: 0,
                beerAmount: 0,
                alcoholLevel: 0,
                arrivalTime: '',
                gameLogEntities: [],
            },
            setPlanDetail: (newPlanDetail) =>
                set((state) => ({
                    planDetail: { ...state.planDetail, ...newPlanDetail },
                })),
            resetPlanDetail: () =>
                set({
                    planDetail: {
                        id: null,
                        userId: null,
                        date: convertDateToString(new Date()), // 오류 방지 위한 new Date 처리
                        time: convertTimeToString(new Date()), // 오류 방지 위한 new Date 처리
                        title: '',
                        memo: '',
                        sojuAmount: 0,
                        beerAmount: 0,
                        alcoholLevel: 0,
                        arrivalTime: '',
                        gameLogEntities: [],
                    },
                }),
            setFullPlanDetail: (newPlanDetail) =>
                set({ planDetail: newPlanDetail }),
            editPlan: async () => {
                const { planDetail } = get();

                const formattedDateTime = parseDateTime(
                    planDetail.date,
                    planDetail.time,
                );

                const formattedPlan = {
                    id: planDetail.id,
                    userId: planDetail.userId,
                    date: formattedDateTime,
                    title: planDetail.title,
                    memo: planDetail.memo,
                    sojuAmount: planDetail.sojuAmount,
                    beerAmount: planDetail.beerAmount,
                    alcoholLevel: planDetail.alcoholLevel,
                    arrivalTime: planDetail.arrivalTime,
                };

                try {
                    const success = await updateEvent({
                        editedPlan: formattedPlan,
                    });

                    if (success) {
                        return true;
                    }
                } catch (error) {
                }

                return false;
            },
        }),
        {
            name: 'calendar',
        },
    ),
);

// 로컬 스토리지에 저장 X
const useNonPersistentStore = create((set, get) => ({
    // 1. 캘린더에서 선택한 날짜
    selectedDate: new Date(), // 초기 값 오늘
    setSelectedDate: (date) => set({ selectedDate: date }),

    // 2. 일정 등록
    plan: {
        date: convertDateToString(new Date()),
        time: convertTimeToString(new Date()),
        title: '',
        memo: '',
        sojuAmount: 0,
        beerAmount: 0,
        alcoholLevel: '0: 취하지 않음',
        arrivalTime: '-',
    },
    setPlan: (newPlan) =>
        set((state) => ({ plan: { ...state.plan, ...newPlan } })),
    resetPlan: () =>
        set({
            plan: {
                date: convertDateToString(new Date()),
                time: convertTimeToString(new Date()),
                title: '',
                memo: '',
                sojuAmount: 0,
                beerAmount: 0,
                alcoholLevel: '0: 취하지 않음',
                arrivalTime: '-',
            },
        }),
    submitPlan: async (
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
    ) => {
        const { plan } = get();

        const formattedDateTime = parseDateTime(plan.date, plan.time);

        const formattedPlan = {
            date: formattedDateTime,
            title: plan.title,
            memo: plan.memo,
            sojuAmount: plan.sojuAmount,
            beerAmount: plan.beerAmount,
            alcoholLevel: parseInt(plan.alcoholLevel.split(':')[0]),
            arrivalTime:
                plan.arrivalTime === '-' ? null : parseTime(plan.arrivalTime),
        };

        try {
            const eventId = await createEvent({ plan: formattedPlan });

            if (eventId) {
                if (isVoiceGameResultSet) {
                    voiceGameResultData.planId = eventId; // 생성된 일정 ID로 수정
                    const result = await saveVoiceGameResult({
                        data: voiceGameResultData,
                    });

                    if (result) {
                        resetPlan();
                        resetVoiceGameResult();
                        // 쿼리 무효화
                        queryClient.invalidateQueries(['planDetail', eventId]);
                        ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                        navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                        return true;
                    }
                } else if (isBalanceGameResultSet) {
                    balanceGameResultData.planId = eventId; // 생성된 일정 ID로 수정
                    const result = await saveRestGameResult({
                        data: balanceGameResultData,
                    });
                    if (result) {
                        resetPlan();
                        resetBalanceGameResult();
                        // 쿼리 무효화
                        queryClient.invalidateQueries(['planDetail', eventId]);
                        ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                        navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                    }
                } else if (isTypingGameResultSet) {
                    typingGameResultData.planId = eventId; // 생성된 일정 ID로 수정
                    const result = await saveRestGameResult({
                        data: typingGameResultData,
                    });
                    if (result) {
                        resetPlan();
                        resetTypingGameResult();
                        // 쿼리 무효화
                        queryClient.invalidateQueries(['planDetail', eventId]);
                        ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                        navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                    }
                } else if (isMemorizeGameResultSet) {
                    memorizeGameResultData.planId = eventId; // 생성된 일정 ID로 수정
                    const result = await saveRestGameResult({
                        data: memorizeGameResultData,
                    });
                    if (result) {
                        resetPlan();
                        resetMemorizeGameResult();
                        // 쿼리 무효화
                        queryClient.invalidateQueries(['planDetail', eventId]);
                        ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                        navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                    }
                } else {
                    resetPlan();
                    ToastSuccess('일정이 등록되었습니다!', true);
                    navigate('/calendar');
                    return true;
                }
            }
        } catch (error) {
        }

        return false;
    },
}));

const useCalendarStore = () => {
    const persistentState = usePersistentStore();
    const nonPersistentState = useNonPersistentStore();
    return { ...persistentState, ...nonPersistentState };
};

export default useCalendarStore;
