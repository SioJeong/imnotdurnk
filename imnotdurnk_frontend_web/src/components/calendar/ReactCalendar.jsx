import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAllEventList } from '../../services/calendar';
import useCalendarStore from '../../stores/useCalendarStore';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

const ReactCalendar = ({ onChangeView, selectedDate, setSelectedDate }) => {
    const { setEventListOnSelectedDate, setStatusOnDate } = useCalendarStore();

    const year = 2024;
    const month = 8;

    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNzYWZ5QHNzYWZ5LmNvbSIsImlhdCI6MTcyMjU1OTQ1MywiZXhwIjoxNzIyNzM5NDUzfQ.HspCbdJAQh6x1L5Z25Vlf8zNGNdjrUjwOXq9gL8X4Yk';

    const {
        data: monthlyEventList,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['monthlyEventList', year, month],
        queryFn: () => getAllEventList({ token, year, month }),
    });

    useEffect(() => {
        if (selectedDate && monthlyEventList) {
            const eventListOnSelectedDate = monthlyEventList.filter((e) => {
                return (
                    e.date.getFullYear() === selectedDate.getFullYear() &&
                    e.date.getMonth() === selectedDate.getMonth() &&
                    e.date.getDate() === selectedDate.getDate()
                );
            });
            setEventListOnSelectedDate(eventListOnSelectedDate);
            if (eventListOnSelectedDate.length > 0) {
                const statusOnDate = eventListOnSelectedDate.sort(
                    (a, b) => b.alcoholLevel - a.alcoholLevel,
                )[0];
                setStatusOnDate(statusOnDate);
            } else {
                setStatusOnDate(0);
            }
        }
    }, [
        selectedDate,
        monthlyEventList,
        setEventListOnSelectedDate,
        setStatusOnDate,
    ]);

    // 일정 dot 커스텀 및 날짜 텍스트 숫자로 변환
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const statusOnDate =
                monthlyEventList &&
                monthlyEventList
                    .filter((e) => {
                        return (
                            e.date.getFullYear() === date.getFullYear() &&
                            e.date.getMonth() === date.getMonth() &&
                            e.date.getDate() === date.getDate()
                        );
                    })
                    .sort((a, b) => b.alcoholLevel - a.alcoholLevel)[0];

            return (
                <St.DateTile>
                    <St.DateNum>{date.getDate()}</St.DateNum>
                    {statusOnDate && (
                        <St.DateDot $alcoholLevel={statusOnDate.alcoholLevel} />
                    )}
                </St.DateTile>
            );
        }
    };

    if (isLoading) {
        return <p>달력 데이터 가져오는 중</p>;
    }

    if (isError) {
        return <p>오류 발생: {error.message}</p>;
    }

    return (
        <div>
            <Calendar
                onViewChange={({ view }) => onChangeView(view)} // view 변경 시 호출 (month/year)
                onChange={setSelectedDate}
                value={selectedDate}
                calendarType="gregory" // 일요일부터 시작
                minDetail="year" // 월/년도 보기 까지만 지원
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false} // 이번 달 날짜만 렌더링
                tileContent={tileContent}
            />
        </div>
    );
};

export default ReactCalendar;
