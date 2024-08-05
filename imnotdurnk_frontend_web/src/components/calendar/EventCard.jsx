import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as St from './EventCard.style';

const EventCard = ({
    alcoholLevel,
    onItemClick,
    selectedDate,
    fromCalendar,
    eventId,
    children,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedDateFromPath, setSelectedDateFromPath] = useState(null);

    useEffect(() => {
        if (location.pathname.startsWith('/calendar/')) {
            const pathDate = location.pathname.split('/')[2];
            const [year, month, day] = pathDate.split('-').map(Number);
            if (year && month && day) {
                setSelectedDateFromPath(new Date(year, month - 1, day));
            }
        }
    }, [location.pathname]);

    const selectedDateForDisplay = fromCalendar
        ? selectedDate
        : selectedDateFromPath;

    // 요일 index -> 문자열로 변환하는 함수
    const getDayName = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return date ? days[date.getDay()] : null; // TODO: selectedDate 널 체크 사항 -> 이거 뭐야
    };

    // 카드 클릭 시 페이지 이동 동작
    const handleOnClick = () => {
        if (fromCalendar) {
            onItemClick(selectedDate);
        } else {
            const currentPath = location.pathname;
            navigate(`${currentPath}/plan/${eventId}`);
        }
    };

    return (
        <St.CalendarItemBox
            $alcoholLevel={alcoholLevel}
            onClick={handleOnClick}
        >
            <St.CalendarItemDate // TODO: selectedDate 널 체크 사항 -> 이거 뭐야
                $isWeekend={
                    selectedDateForDisplay
                        ? selectedDateForDisplay.getDay()
                        : null
                }
            >
                <h4>{getDayName(selectedDateForDisplay)}</h4>
                <h2>{selectedDateForDisplay?.getDate()}</h2>
            </St.CalendarItemDate>
            <St.CalendarItemBodyBox>{children}</St.CalendarItemBodyBox>
        </St.CalendarItemBox>
    );
};

export default EventCard;
