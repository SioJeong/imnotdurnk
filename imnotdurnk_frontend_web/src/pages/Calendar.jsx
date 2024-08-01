import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CalendarList from '../components/calendar/CalendarList';
import CalendarStatusBar from '../components/calendar/CalendarStatusBar';
import CreatePlan from '../components/calendar/CreatePlan';
import EventCard from '../components/calendar/EventCard';
import ReactCalendar from '../components/calendar/ReactCalendar';
import useCalendarNavigation from '../hooks/useCalendarNavigation';
import useCalendarStore from '../stores/useCalendarStore';

const Calendar = () => {
    const [view, setView] = useState('month'); // 초기 값 month 뷰
    const [selectedDate, setSelectedDate] = useState();

    const { eventListOnSelectedDate, statusOnDate } = useCalendarStore();

    const { navigate } = useCalendarNavigation();

    // 캘린더 렌더링 시 무조건 오늘 날짜로 돌아오도록
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const handleItemClick = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(date.getDate() + 1); // 일자 +1 조정

        const formattedDate = adjustedDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
        navigate(`/calendar/${formattedDate}`);
    };

    const textColor =
        statusOnDate?.alcoholLevel >= 2
            ? 'var(--color-white1)'
            : 'var(--color-green3)';

    const moreTextColor =
        statusOnDate?.alcoholLevel < 2
            ? 'var(--color-green2)'
            : 'var(--color-green3)';

    const calendarMain = (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7143rem',
            }}
        >
            <ReactCalendar
                onChangeView={setView}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <CalendarStatusBar />
            {view === 'month' && (
                <EventCard
                    alcoholLevel={statusOnDate?.alcoholLevel}
                    onItemClick={handleItemClick}
                    selectedDate={selectedDate}
                    fromCalendar={true}
                >
                    {eventListOnSelectedDate.length > 0 ? (
                        <>
                            {eventListOnSelectedDate.slice(0, 3).map((e) => {
                                return (
                                    <h3
                                        key={e.id}
                                        style={{
                                            color: textColor,
                                            margin: '0.2857rem 0',
                                        }}
                                    >
                                        - {e.title}
                                    </h3>
                                );
                            })}
                            {eventListOnSelectedDate.length > 3 && (
                                <p
                                    style={{
                                        color: moreTextColor,
                                        marginTop: '5px',
                                    }}
                                >
                                    (이외 {eventListOnSelectedDate.length - 3}
                                    개의 일정이 있습니다.)
                                </p>
                            )}
                        </>
                    ) : (
                        <h3>일정 없음</h3>
                    )}
                </EventCard>
            )}
        </div>
    );

    return (
        <>
            <Routes>
                <Route path="/" element={calendarMain} />
                <Route path="/:date" element={<CalendarList />} />
                <Route path="/create-plan" element={<CreatePlan />} />
            </Routes>
        </>
    );
};

export default Calendar;
