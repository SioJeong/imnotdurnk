import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

const eventList = [
    { date: new Date(2024, 7, 17), title: 'Test1', alcoholLevel: 0 },
    { date: new Date(2024, 7, 18), title: 'Test2', alcoholLevel: 1 },
    { date: new Date(2024, 7, 18), title: 'Test3', alcoholLevel: 1 },
    { date: new Date(2024, 7, 25), title: 'Test4', alcoholLevel: 2 },
    { date: new Date(2024, 7, 26), title: 'Test5', alcoholLevel: 3 },
    { date: new Date(2024, 7, 26), title: 'Test6', alcoholLevel: 2 },
    { date: new Date(2024, 7, 26), title: 'Test7', alcoholLevel: 1 },
];

const ReactCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 일정 dot 커스텀 및 날짜 텍스트 숫자로 변환
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const statusOnDate = eventList
                .filter(
                    (e) =>
                        e.date.getFullYear() === date.getFullYear() &&
                        e.date.getMonth() === date.getMonth() + 1 &&
                        e.date.getDate() === date.getDate(),
                )
                .sort((a, b) => b.alcoholLevel - a.alcoholLevel)[0];

            return (
                <St.DateTile>
                    <St.DateNum>{date.getDate()}</St.DateNum>
                    {statusOnDate ? (
                        <St.EventItem
                            $alcoholLevel={statusOnDate.alcoholLevel}
                        />
                    ) : null}
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
