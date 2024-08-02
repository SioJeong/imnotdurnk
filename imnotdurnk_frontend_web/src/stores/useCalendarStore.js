import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCalendarStore = create(
    persist(
        (set) => ({
            // 1. 선택한 날짜에 해당하는 이벤트 리스트
            eventListOnSelectedDate: [],
            setEventListOnSelectedDate: (events) =>
                set({ eventListOnSelectedDate: events }),

            // 2. 선택한 날짜의 상태 (alcoholLevel)
            statusOnDate: 0,
            setStatusOnDate: (status) => set({ statusOnDate: status }),

            // 3. 일정 등록 TODO: 로컬에서는 제외할 것
            plan: {
                date: '',
                time: '',
                title: '',
                memo: '',
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
                    },
                }),
            submitPlan: () => {
                set((state) => {
                    console.log(state.plan);
                    return {
                        plan: {
                            date: '',
                            time: '',
                            title: '',
                            memo: '',
                        },
                    };
                });
            },
        }),
        {
            name: 'calendar',
        },
    ),
);

export default useCalendarStore;
