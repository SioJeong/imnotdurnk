import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
        date: '',
        time: '',
        title: '',
        memo: '',
        // beerAmount: 0,
        // sojuAmount: 0,
        // alcoholLevel: 0,
        // arrivalTime: '',
    },
    setPlan: (newPlan) =>
        set((state) => ({ plan: { ...state.plan, ...newPlan } })),
    resetPlan: () =>
        set({
            plan: {
                date: '',
                time: '',
                title: '',
                memo: '',
                // beerAmount: 0,
                // sojuAmount: 0,
                // alcoholLevel: 0,
                // arrivalTime: '',
            },
        }),
    submitPlan: async () => {
        const { plan } = get();
        const token =
            'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNzYWZ5QHNzYWZ5LmNvbSIsImlhdCI6MTcyMjU1OTQ1MywiZXhwIjoxNzIyNzM5NDUzfQ.HspCbdJAQh6x1L5Z25Vlf8zNGNdjrUjwOXq9gL8X4Yk';

        // backend 요청 형식에 따라 변환 (yyyy-MM-ddThh:ss 형식의 문자열)
        const parseDateTime = (dateString, timeString) => {
            const [year, month, day] = dateString
                .replace('년', '')
                .replace('월', '')
                .replace('일', '')
                .split(' ')
                .map((item) => item.trim());

            const [ampm, hourStr, minuteStr] = timeString.split(' ');
            let hour = parseInt(hourStr.split('시')[0], 10);
            const minute = minuteStr.split('분')[0];

            if (ampm === '오후' && hour !== 12) {
                hour += 12;
            } else if (ampm === '오전' && hour === 12) {
                hour = 0;
            }

            return `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${minute.padStart(2, '0')}`;
        };

        const formattedDateTime = parseDateTime(plan.date, plan.time);

        const formattedPlan = {
            date: formattedDateTime,
            title: plan.title,
            memo: plan.memo,
        };

        try {
            const success = await createEvent({ token, plan: formattedPlan });
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
