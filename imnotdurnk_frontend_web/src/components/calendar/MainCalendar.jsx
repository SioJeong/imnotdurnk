import { useState } from 'react';
import useCalendarNavigation from '../../hooks/useCalendarNavigation';
import CalendarStatusBar from './CalendarStatusBar';
import EventCard from './EventCard';
import * as St from './MainCalendar.style';
import ReactCalendar from './ReactCalendar';

const MainCalendar = () => {
    const [view, setView] = useState('month'); // 초기 값 month 뷰

    // TODO: 여유 생기면 selectedDate도 전역에 저장하고, '오늘' 버튼 만들기
    const [selectedDate, setSelectedDate] = useState(new Date()); // 초기 값 오늘
    const [eventListOnSelectedDate, setEventListOnSelectedDate] = useState([]);
    const [statusOnDate, setStatusOnDate] = useState(0);

    const { navigate } = useCalendarNavigation();

    const handleItemClick = (date) => {
        // date를 UTC로 변환
        const utcDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        );
        const formattedDate = utcDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
        navigate(`/calendar/${formattedDate}`);
    };

    return (
        <St.MainContainer>
            <ReactCalendar
                onChangeView={setView}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setEventListOnSelectedDate={setEventListOnSelectedDate}
                setStatusOnDate={setStatusOnDate}
            />
            <CalendarStatusBar />
            {view === 'month' && (
                <EventCard
                    alcoholLevel={statusOnDate}
                    onItemClick={handleItemClick}
                    selectedDate={selectedDate}
                    fromCalendar={true}
                >
                    {eventListOnSelectedDate.length > 0 ? (
                        <>
                            {eventListOnSelectedDate.slice(0, 3).map((e) => {
                                return (
                                    <St.EventCardTitle
                                        key={e.id}
                                        $alcoholLevel={statusOnDate}
                                    >
                                        - {e.title}
                                    </St.EventCardTitle>
                                );
                            })}
                            {eventListOnSelectedDate.length > 3 && (
                                <St.EventCardMorePlan
                                    $alcoholLevel={statusOnDate}
                                >
                                    (이외 {eventListOnSelectedDate.length - 3}
                                    개의 일정이 있습니다.)
                                </St.EventCardMorePlan>
                            )}
                        </>
                    ) : (
                        <h3>일정 없음</h3>
                    )}
                </EventCard>
            )}
        </St.MainContainer>
    );
};

export default MainCalendar;
