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
        }),
        {
            name: 'calendar',
        },
    ),
);

export default useCalendarStore;
