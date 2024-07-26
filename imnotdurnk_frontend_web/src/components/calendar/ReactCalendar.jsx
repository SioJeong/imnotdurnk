import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

const ReactCalendar = ({
    selectedDate,
    setSelectedDate,
    getEventListForDate,
}) => {
    // 일정 dot 커스텀 및 날짜 텍스트 숫자로 변환
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventListOnDate = getEventListForDate(date);
            let statusOnDate;
            if (eventListOnDate.length > 0) {
                // statusOnDate = eventListOnDate.sort(
                //     (a, b) => b.alcoholLevel - a.alcoholLevel,
                // )[0];
                console.log(statusOnDate);
            }

            return (
                <St.DateTile>
                    <St.DateNum>{date.getDate()}</St.DateNum>
                    {/* <St.DateDot $alcoholLevel={statusOnDate.alcoholLevel} /> */}
                </St.DateTile>
            );
        }
    };

    // console.log(monthlyEventList);

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
