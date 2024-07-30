import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAllEventList } from '../../services/calendar';
import useCalendarStore from '../../stores/useCalendarStore';
import './ReactCalendar.css';
import * as St from './ReactCalendar.style';

// 여기에서 api 요청
const eventList = [
    {
        id: 1,
        date: new Date(2024, 7, 17),
        title: '잠실 롯데월드 갔다가 맥주 마시러',
        alcoholLevel: 0,
        time: '오후 5시 30분',
    },
    {
        id: 2,
        date: new Date(2024, 7, 18),
        title: '야장 삼겹살 친구랑',
        alcoholLevel: 1,
        time: '오후 6시 00분',
    },
    {
        id: 3,
        date: new Date(2024, 7, 18),
        title: '남자친구랑 오이도 조개 구이',
        alcoholLevel: 3,
        time: '오후 7시 15분',
    },
    {
        id: 4,
        date: new Date(2024, 7, 20),
        title: '한강 치맥',
        alcoholLevel: 2,
        time: '오후 8시 45분',
    },
    {
        id: 5,
        date: new Date(2024, 7, 26),
        title: '팀 프로젝트 회의 및 점심 식사 후 회의록 정리와 다음 주 계획 수립1',
        alcoholLevel: 1,
        time: '오후 1시 00분',
    },
    {
        id: 6,
        date: new Date(2024, 7, 26),
        title: '팀 프로젝트 회의 및 점심 식사 후 회의록 정리와 다음 주 계획 수립4',
        alcoholLevel: 2,
        time: '오후 3시 30분',
    },
    {
        id: 7,
        date: new Date(2024, 7, 26),
        title: '팀 프로젝트 회의 및 점심 식사 후 회의록 정리와 다음 주 계획 수립3',
        alcoholLevel: 1,
        time: '오후 4시 45분',
    },
    {
        id: 8,
        date: new Date(2024, 7, 26),
        title: '팀 프로젝트 회의 및 점심 식사 후 회의록 정리와 다음 주 계획 수립2',
        alcoholLevel: 0,
        time: '오후 6시 00분',
    },
    {
        id: 9,
        date: new Date(2024, 7, 29),
        title: '친구랑 밥먹기',
        alcoholLevel: 1,
        time: '오후 7시 30분',
    },
];

const ReactCalendar = ({ onChangeView, onStatusChange }) => {
    const {
        monthlyEventList,
        setMonthlyEventList,
        selectedDate,
        setSelectedDate,
        setEventListOnSelectedDate,
    } = useCalendarStore();

    const year = 2024;
    const month = 7;

    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNzYWZ5QHNzYWZ5LmNvbSIsImlhdCI6MTcyMjMwOTM4OCwiZXhwIjoxNzIyMzExMTg4fQ.MKt-yi1DD5TnXY4o18R4aScv2WnxG--VpHK5mK0Pc9U';

    const { data, error, isLoading } = useQuery({
        queryKey: ['monthlyEventList', year, month],
        queryFn: () => getAllEventList({ token, year, month }),
        onSuccess: (data) => {
            console.log('tanstack에서: ', data);
            setMonthlyEventList(data);
        },
        onError: (err) => {
            console.error('monthlyEventList 가져오기 오류: ', err);
        },
    });

    // useEffect(() => {
    //     setMonthlyEventList(eventList);
    // }, [monthlyEventList, setMonthlyEventList]);

    useEffect(() => {
        if (selectedDate && monthlyEventList) {
            const eventListOnSelectedDate = monthlyEventList.filter((e) => {
                return (
                    e.date.getFullYear() === selectedDate.getFullYear() &&
                    e.date.getMonth() === selectedDate.getMonth() + 1 &&
                    e.date.getDate() === selectedDate.getDate()
                );
            });
            setEventListOnSelectedDate(eventListOnSelectedDate);
            const statusOnDate = eventListOnSelectedDate.sort(
                (a, b) => b.alcoholLevel - a.alcoholLevel,
            )[0];
            onStatusChange(statusOnDate);
        }
    }, [
        selectedDate,
        monthlyEventList,
        setEventListOnSelectedDate,
        onStatusChange,
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
                            e.date.getMonth() === date.getMonth() + 1 &&
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
