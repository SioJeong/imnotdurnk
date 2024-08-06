import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    convertDateToString,
    convertTimeToString,
    parseDateTime,
    parseTime,
} from '../hooks/useDateTimeFormatter';
import { createEvent } from '../services/calendar';

// 로컬 스토리지에 저장 O
const usePersistentStore = create(
    persist(
        (set) => ({
            // 1. 선택한 날짜에 해당하는 이벤트 리스트
            eventListOnSelectedDate: [],
            setEventListOnSelectedDate: (events) =>
                set({ eventListOnSelectedDate: events }),

            // 2. 선택한 날짜의 상태 (alcoholLevel)
            statusOnDate: 0,
            setStatusOnDate: (status) => set({ statusOnDate: status }),
        }),
        {
            name: 'calendar',
        },
    ),
);

// 로컬 스토리지에 저장 X
const useNonPersistentStore = create((set, get) => ({
    // 1. 일정 등록
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
        arrivalTime: null,
        gameLogEntities: [],
    },
    setPlanDetail: (newPlanDetail) =>
        set((state) => ({
            planDetail: { ...state.planDetail, ...newPlanDetail },
        })),
    setFullPlanDetail: (newPlanDetail) => set({ planDetail: newPlanDetail }),
}));

const useCalendarStore = () => {
    const persistentState = usePersistentStore();
    const nonPersistentState = useNonPersistentStore();
    return { ...persistentState, ...nonPersistentState };
};

export default useCalendarStore;
