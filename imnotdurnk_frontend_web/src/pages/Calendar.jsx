import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CalendarList from '../components/calendar/CalendarList';
import CalendarStatusBar from '../components/calendar/CalendarStatusBar';
import EventCard from '../components/calendar/EventCard';
import ReactCalendar from '../components/calendar/ReactCalendar';
import useCalendarStore from '../stores/useCalendarStore';

const Calendar = () => {
    const [view, setView] = useState('month'); // 초기 값 month 뷰
    const {
        eventListOnSelectedDate,
        setSelectedDate,
        statusOnDate,
        setStatusOnDate,
    } = useCalendarStore();
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/calendar/')) {
            const [year, month, day] = location.pathname
                .split('/')[2]
                .split('-');
            const selected = new Date(year, month - 1, day);
            setSelectedDate(selected);
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', path: '/calendar' },
                title: `${year}년 ${month}월 ${day}일`,
                icon2: { iconname: 'plus' },
            });
        } else {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', path: '/' },
                title: '캘린더',
                icon2: { iconname: 'plus' },
            });
        }
    }, [location, setSelectedDate, setNavigation]);

    const handleItemClick = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(date.getDate() + 1); // 일자 +1 조정

        const formattedDate = adjustedDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
        navigate(`/calendar/${formattedDate}`);
    };

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <ReactCalendar
                                onChangeView={setView}
                                onStatusChange={setStatusOnDate}
                            />
                            <br />
                            <CalendarStatusBar />
                            <br />
                            {view === 'month' && (
                                <EventCard
                                    alcoholLevel={statusOnDate?.alcoholLevel}
                                    onItemClick={handleItemClick}
                                >
                                    {eventListOnSelectedDate.length > 0 ? (
                                        eventListOnSelectedDate
                                            .slice(0, 3)
                                            .map((e) => {
                                                const textColor =
                                                    statusOnDate.alcoholLevel >=
                                                    2
                                                        ? 'var(--color-white1)'
                                                        : 'var(--color-green3)';
                                                return (
                                                    <h3
                                                        key={e.id}
                                                        style={{
                                                            color: textColor,
                                                        }}
                                                    >
                                                        - {e.title}
                                                    </h3>
                                                );
                                            })
                                    ) : (
                                        <h3>일정 없음</h3>
                                    )}
                                </EventCard>
                            )}
                        </>
                    }
                />
                <Route path="/:date" element={<CalendarList />} />
            </Routes>
        </>
    );
};

export default Calendar;
