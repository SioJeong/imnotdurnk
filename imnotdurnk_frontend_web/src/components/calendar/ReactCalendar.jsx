import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAllEventList } from '../../services/calendar';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

const ReactCalendar = ({
    onChangeView,
    selectedDate,
    setSelectedDate,
    setEventListOnSelectedDate,
    setStatusOnDate,
}) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const {
        data: monthlyEventList,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['monthlyEventList', year, month],
        queryFn: () => getAllEventList({ year, month }),
        keepPreviousData: true, // 새 데이터 가져오는 동안 이전 데이터 유지
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
                setStatusOnDate(statusOnDate.alcoholLevel);
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

    // 달력 월 변경 감지
    const handleMonthChange = ({ activeStartDate }) => {
        const newYear = activeStartDate.getFullYear();
        const newMonth = activeStartDate.getMonth() + 1;

        if (newYear !== year || newMonth !== month) {
            setYear(newYear);
            setMonth(newMonth);
        }
    };

    // 일정 dot 커스텀 및 날짜 텍스트 숫자로 변환
    const tileContent = useCallback(
        ({ date, view }) => {
            if (view === 'month') {
                const statusOnDate =
                    monthlyEventList &&
                    monthlyEventList
                        .filter((e) => {
                            const eventDate = new Date(e.date);
                            return (
                                eventDate.getFullYear() ===
                                    date.getFullYear() &&
                                eventDate.getMonth() === date.getMonth() &&
                                eventDate.getDate() === date.getDate()
                            );
                        })
                        .sort((a, b) => b.alcoholLevel - a.alcoholLevel)[0];

                return (
                    <St.DateTile>
                        <St.DateNum>{date.getDate()}</St.DateNum>
                        {statusOnDate && (
                            <St.DateDot
                                $alcoholLevel={statusOnDate.alcoholLevel}
                            />
                        )}
                    </St.DateTile>
                );
            }
        },
        [monthlyEventList],
    );

    return (
        <div>
            {isLoading ? (
                <St.LoadingAndErrorText>
                    달력 데이터를 가져오는 중입니다.
                </St.LoadingAndErrorText>
            ) : isError ? (
                <St.LoadingAndErrorText>
                    Error: {error.message}
                </St.LoadingAndErrorText>
            ) : (
                <Calendar
                    onViewChange={({ view }) => onChangeView(view)} // view 변경 시 호출 (month/year)
                    onChange={setSelectedDate}
                    value={selectedDate}
                    calendarType="gregory" // 일요일부터 시작
                    minDetail="year" // 월, 년도 보기 까지만 지원
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={false} // 이번 달 날짜만 렌더링
                    tileContent={tileContent}
                    onActiveStartDateChange={handleMonthChange} // 월 변경 시 호출
                />
            )}
        </div>
    );
};

export default ReactCalendar;
