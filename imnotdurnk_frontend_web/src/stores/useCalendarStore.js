import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    convertDateToString,
    convertTimeToString,
    parseDateTime,
    parseTime,
} from '../hooks/useDateTimeFormatter';
import { createEvent, updateEvent } from '../services/calendar';

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
    submitPlan: async () => {
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
            const success = await createEvent({ plan: formattedPlan });
            if (success) {
                return true;
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
