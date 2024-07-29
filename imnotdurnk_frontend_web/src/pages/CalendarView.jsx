import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import CalendarItem from '../components/calendar/CalendarItem';
import CalendarStatusBar from '../components/calendar/CalendarStatusBar';
import ReactCalendar from '../components/calendar/ReactCalendar';

const CalendarView = () => {
    const [view, setView] = useState('month'); // 초기 값 month 뷰
    const [statusOnDate, setStatusOnDate] = useState(0);
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: '캘린더',
            icon2: { iconname: 'plus' },
        });
    }, [setNavigation]);

    return (
        <div>
            <ReactCalendar
                onChangeView={setView}
                onStatusChange={setStatusOnDate}
            />

            <br />
            <CalendarStatusBar />
            <br />
            {view === 'month' && <CalendarItem statusOnDate={statusOnDate} />}
        </div>
    );
};

export default CalendarView;
