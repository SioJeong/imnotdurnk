import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCalendarStore = create(
    persist(
        (set) => ({
            // 1. 선택한 달에 해당하는 전체 이벤트 리스트
            monthlyEventList: [],
            setMonthlyEventList: (events) => set({ monthlyEventList: events }),

            // 2. 선택한 날짜
            selectedDate: new Date(), // TODO: 이거 왜 가끔 자꾸 null 뜨는 지 체크 좀
            setSelectedDate: (date) => set({ selectedDate: date }),

            // 3. 선택한 날짜에 해당하는 이벤트 리스트
            eventListOnSelectedDate: [],
            setEventListOnSelectedDate: (events) =>
                set({ eventListOnSelectedDate: events }),

            // 4. 선택한 날짜의 상태 (alcoholLevel)
            statusOnDate: 0,
            setStatusOnDate: (status) => set({ statusOnDate: status }),
        }),
        {
            name: 'calendar',
            onRehydrateStorage: () => (state) => {
                // 상태가 로드될 때 호출
                if (state) {
                    // selectedDate를 Date 객체로 변환
                    if (typeof state.selectedDate === 'string') {
                        state.selectedDate = new Date(state.selectedDate);
                    }

                    // monthlyEventList에서 날짜 필드를 Date 객체로 변환
                    state.monthlyEventList = state.monthlyEventList.map(
                        (event) => ({
                            ...event,
                            date: new Date(event.date),
                        }),
                    );
                }
            },
        },
    ),
);

export default useCalendarStore;
