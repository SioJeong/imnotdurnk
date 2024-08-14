import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAllEventList } from '../../services/calendar';
import useCalendarStore from '../../stores/useCalendarStore';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

const ReactCalendar = ({
    onChangeView,
    setEventListOnSelectedDate,
    setStatusOnDate,
}) => {
    const { selectedDate, setSelectedDate } = useCalendarStore();

    const fetchEventList = async ({ pageParam }) => {
        const response = await getAllEventList({
            year: pageParam.year,
            month: pageParam.month,
        });
        return { data: response, pageParam };
    };

    const {
        data,
        isLoading,
        isError,
        error,
        fetchPreviousPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['allEventList'],
        queryFn: fetchEventList,
        getNextPageParam: (lastPage) => {
            let { year, month } = lastPage.pageParam;
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
            return { year, month };
        },
        getPreviousPageParam: (firstPage) => {
            let { year, month } = firstPage.pageParam;
            month -= 1;
            if (month < 1) {
                month = 12;
                year -= 1;
            }
            return { year, month };
        },
        initialPageParam: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
        },
        staleTime: 1000 * 60 * 5, // 5분 동안은 동일한 쿼리가 다시 실행되지 않으며, 캐시된 데이터를 그대로 사용
        cacheTime: 1000 * 60 * 30, // 30분 동안 데이터를 캐시에 유지
    });

    // 초기 캘린더 렌더링 시 '오늘'로 설정
    useEffect(() => {
        if (!selectedDate) {
            setSelectedDate(new Date());
        }
    }, [selectedDate, setSelectedDate]);

    // NOTE: 성능 최적화 - data 변경될 때만 allEventList를 다시 계산 (data 변경 없으면, 이전에 계산된 allEventList 재사용)
    const allEventList = useMemo(() => {
        return data ? data.pages.flatMap((page) => page.data) : [];
    }, [data]);

    useEffect(() => {
        if (selectedDate && allEventList.length > 0) {
            const eventListOnSelectedDate = allEventList.filter((e) => {
                const eventDate = new Date(e.date);
                return (
                    eventDate.getFullYear() === selectedDate.getFullYear() &&
                    eventDate.getMonth() === selectedDate.getMonth() &&
                    eventDate.getDate() === selectedDate.getDate()
                );
            });
            setEventListOnSelectedDate(eventListOnSelectedDate);

            if (eventListOnSelectedDate.length > 0) {
                const topAlcoholLevelData = eventListOnSelectedDate.sort(
                    (a, b) => b.alcoholLevel - a.alcoholLevel,
                )[0];
                setStatusOnDate(topAlcoholLevelData.alcoholLevel);
            } else {
                setStatusOnDate(0);
            }
        }
    }, [
        selectedDate,
        allEventList,
        setEventListOnSelectedDate,
        setStatusOnDate,
    ]);

    // 달력 년/월 변경 감지
    const handleCalendarChange = useCallback(
        async ({ activeStartDate, view }) => {
            const newDate = new Date(activeStartDate);
            const newYear = newDate.getFullYear();
            const newMonth = newDate.getMonth() + 1;

            // data.pages에 이미 해당 연/월의 데이터가 로드되어 있는 지 확인
            const isDataAvailable = data?.pages.some(
                (page) =>
                    page.pageParam.year === newYear &&
                    page.pageParam.month === newMonth,
            );

            // 데이터가 없는 경우에만 추가 데이터 요청
            if (!isDataAvailable) {
                let currentYear = selectedDate.getFullYear();
                let currentMonth = selectedDate.getMonth() + 1;

                // 선택한 월까지 필요한 만큼 fetchNextPage 또는 fetchPreviousPage 호출
                while (currentYear !== newYear || currentMonth !== newMonth) {
                    if (
                        newYear > currentYear ||
                        (newYear === currentYear && newMonth > currentMonth)
                    ) {
                        await fetchNextPage();
                        currentMonth += 1;
                        if (currentMonth > 12) {
                            currentMonth = 1;
                            currentYear += 1;
                        }
                    } else {
                        await fetchPreviousPage();
                        currentMonth -= 1;
                        if (currentMonth < 1) {
                            currentMonth = 12;
                            currentYear -= 1;
                        }
                    }
                }
            }
        },
        [selectedDate, data, fetchNextPage, fetchPreviousPage],
    );

    // 일정 dot 커스텀 및 날짜 텍스트 숫자로 변환
    const tileContent = useCallback(
        ({ date, view }) => {
            if (view === 'month' && allEventList.length > 0) {
                const topAlcoholLevelDataForMonth = allEventList
                    .filter((e) => {
                        const eventDate = new Date(e.date);
                        return (
                            eventDate.getFullYear() === date.getFullYear() &&
                            eventDate.getMonth() === date.getMonth() &&
                            eventDate.getDate() === date.getDate()
                        );
                    })
                    .sort((a, b) => b.alcoholLevel - a.alcoholLevel)[0];

                return (
                    <St.DateTile>
                        <St.DateNum>{date.getDate()}</St.DateNum>
                        {topAlcoholLevelDataForMonth && (
                            <St.DateDot
                                $alcoholLevel={
                                    topAlcoholLevelDataForMonth.alcoholLevel
                                }
                            />
                        )}
                    </St.DateTile>
                );
            }
        },
        [allEventList],
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
                    onActiveStartDateChange={handleCalendarChange} // 년/월 변경 시 호출
                />
            )}
        </div>
    );
};

export default ReactCalendar;
