import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    convertDateToString,
    convertTimeToString,
    parseDateTime,
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
        // beerAmount: 0,
        // sojuAmount: 0,
        alcoholLevel: '0: 취하지 않음',
        arrivalTime: '오후 10시 00분',
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
                // beerAmount: 0,
                // sojuAmount: 0,
                alcoholLevel: '0: 취하지 않음',
                arrivalTime: '오후 10시 00분',
            },
        }),
    submitPlan: async () => {
        const { plan } = get();
        const formattedDateTime = parseDateTime(plan.date, plan.time);

        const formattedPlan = {
            date: formattedDateTime,
            title: plan.title,
            memo: plan.memo,
            alcoholLevel: parseInt(plan.alcoholLevel.split(':')[0]),
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
