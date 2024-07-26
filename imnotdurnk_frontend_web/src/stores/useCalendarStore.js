import { create } from 'zustand';

const useCalendarStore = create((set, get) => ({
    // 1. 선택한 달에 해당하는 전체 이벤트 리스트
    monthlyEventList: [],
    setMonthlyEventList: (events) => set({ monthlyEventList: events }),

    // 2. 선택한 날짜
    selectedDate: new Date(),
    setSelectedDate: (date) => set({ selectedDate: date }),

    // 3. 선택한 날짜에 해당하는 이벤트 리스트
    getEventListForDate: (date) => {
        return get().monthlyEventList.filter((e) => {
            e.date.getFullYear() === date.getFullYear() &&
                e.date.getMonth() === date.getMonth() + 1 &&
                e.date.getDate() === date.getDate();
        });
    },
}));

export default useCalendarStore;
