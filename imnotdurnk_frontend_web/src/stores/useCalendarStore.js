import { create } from 'zustand';

const useCalendarStore = create((set, get) => ({
    // 1. 선택한 달에 해당하는 전체 이벤트 리스트
    monthlyEventList: [],
    setMonthlyEventList: (events) => set({ monthlyEventList: events }),

    // 2. 선택한 날짜
    selectedDate: new Date(),
    setSelectedDate: (date) => set({ selectedDate: date }),

    // 3. 선택한 날짜에 해당하는 이벤트 리스트
    eventListOnSelectedDate: [],
    setEventListOnSelectedDate: (events) =>
        set({ eventListOnSelectedDate: events }),

    // 4. 선택한 날짜의 상태 (alcoholLevel)
    statusOnDate: 0,
    setStatusOnDate: (status) => set({ statusOnDate: status }),
}));

export default useCalendarStore;
