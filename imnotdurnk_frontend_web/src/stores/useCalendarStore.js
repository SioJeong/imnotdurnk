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
import { saveVoiceGameResult } from '../services/game';

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
                    console.error('일정 수정 중 오류 발생:', error.message);
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
        navigate,
        todayUrl,
        resetPlan,
        resetVoiceGameResult,
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
                // TODO: 게임 기록이 있는 경우 게임 기록 저장
                if (voiceGameResultData.filename !== '') {
                    voiceGameResultData.planId = eventId; // 생성된 일정 ID로 수정
                    console.log(
                        '서버로 보낼 voiceGameResultData',
                        voiceGameResultData,
                    );

                    const result = await saveVoiceGameResult({
                        data: voiceGameResultData,
                    });

                    if (result) {
                        resetVoiceGameResult();
                        ToastSuccess('게임 기록이 등록되었습니다!', true, true);
                        navigate(`/calendar/${todayUrl}/plan/${eventId}`);
                        return true;
                    }
                } else {
                    resetPlan();
                    ToastSuccess('일정이 등록되었습니다!', true);
                    navigate('/calendar');
                    return true;
                }
            }
        } catch (error) {
            console.error('일정 등록 중 오류 발생:', error.message);
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
