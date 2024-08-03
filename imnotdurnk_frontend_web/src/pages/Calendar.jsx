import { useCallback, useState } from 'react';
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
    const [selectedDate, setSelectedDate] = useState(new Date()); // 초기 값 오늘

    const { eventListOnSelectedDate, statusOnDate } = useCalendarStore();

    const { navigate } = useCalendarNavigation();

    // TODO: 뭐야 useCallback..
    const handleItemClick = useCallback(
        (date) => {
            const adjustedDate = new Date(date);
            adjustedDate.setDate(date.getDate() + 1); // 일자 +1 조정

            const formattedDate = adjustedDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
            navigate(`/calendar/${formattedDate}`);
        },
        [navigate],
    );

    const textColor =
        statusOnDate?.alcoholLevel >= 2
            ? 'var(--color-white1)'
            : 'var(--color-green3)';

    const moreTextColor =
        statusOnDate?.alcoholLevel < 2
            ? 'var(--color-green2)'
            : 'var(--color-green3)';

    const mainContainerCss = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7143rem',
    };

    const textColorCss = {
        color: textColor,
        margin: '0.2857rem 0',
    };

    const moreTextColorCss = {
        color: moreTextColor,
        marginTop: '5px',
    };

    const calendarMain = (
        <div style={mainContainerCss}>
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
                                    <h3 key={e.id} style={textColorCss}>
                                        - {e.title}
                                    </h3>
                                );
                            })}
                            {eventListOnSelectedDate.length > 3 && (
                                <p style={moreTextColorCss}>
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
