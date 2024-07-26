import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

const eventList = [
    { date: new Date(2024, 7, 23), title: 'Meeting' },
    { date: new Date(2024, 7, 23), title: 'Conference' },
    { date: new Date(2024, 7, 23), title: 'Conference' },
    { date: new Date(2024, 7, 23), title: 'Conference' },
    { date: new Date(2024, 7, 23), title: 'Conference' },
];

const ReactCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 일정 dot 커스텀 및 날짜 텍스트 숫자로 변환
    // 달력에서 dot은 최대 3개까지만 찍기
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventsOnDate = eventList.filter(
                (e) =>
                    e.date.getFullYear() === date.getFullYear() &&
                    e.date.getMonth() === date.getMonth() + 1 &&
                    e.date.getDate() === date.getDate(),
            );
            return (
                <St.DateTile>
                    <St.Date>{date.getDate()}</St.Date>
                    {eventsOnDate.length > 0 && (
                        <St.EventList>
                            {eventsOnDate.map((_, index) => (
                                <St.EventItem key={index}></St.EventItem>
                            ))}
                        </St.EventList>
                    )}
                </St.DateTile>
            );
        }
    };

    return (
        <div>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                calendarType="gregory" // 일요일부터 시작
                minDetail="year" // 월/년도 보기 까지만 지원
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false} // 이번 달 날짜만 렌더링
                tileContent={tileContent}
            />
            <div>{`${selectedDate}`}</div>
        </div>
    );
};

export default ReactCalendar;
