import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';
import ReactCalendar from '../components/calendar/ReactCalendar';
import useCalendarStore from '../stores/useCalendarStore';

const eventList = [
    { date: new Date(2024, 7, 17), title: 'Test1', alcoholLevel: 0 },
    { date: new Date(2024, 7, 18), title: 'Test2', alcoholLevel: 1 },
    { date: new Date(2024, 7, 18), title: 'Test3', alcoholLevel: 1 },
    { date: new Date(2024, 7, 25), title: 'Test4', alcoholLevel: 2 },
    { date: new Date(2024, 7, 26), title: 'Test5', alcoholLevel: 3 },
    { date: new Date(2024, 7, 26), title: 'Test6', alcoholLevel: 2 },
    { date: new Date(2024, 7, 26), title: 'Test7', alcoholLevel: 1 },
];

const CalendarView = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);
    const {
        setMonthlyEventList,
        selectedDate,
        setSelectedDate,
        getEventListForDate,
    } = useCalendarStore();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: '캘린더',
            icon2: { iconname: 'plus' },
        });
    }, [setNavigation]);

    useEffect(() => {
        setMonthlyEventList(eventList);
    }, [setMonthlyEventList]);

    return (
        <div>
            <ReactCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                getEventListForDate={getEventListForDate}
            />
            <br />
            <br />
            {/* <CalendarItem eventListForDate={getEventListForDate} /> */}
        </div>
    );
};

export default CalendarView;
