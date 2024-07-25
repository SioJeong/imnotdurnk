import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css';

const ReactCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                calendarType="hebrew" // 일요일부터 시작
                view="month" // 월 단위만 렌더링
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false} // 이번 달 날짜만 렌더링
            />
            <div>{`${selectedDate}`}</div>
        </div>
    );
};

export default ReactCalendar;
