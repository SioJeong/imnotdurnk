import useCalendarStore from '../../stores/useCalendarStore';
import * as St from './EventCard.style';

const EventCard = ({ alcoholLevel, onItemClick, children }) => {
    const { selectedDate } = useCalendarStore();

    // 요일 index -> 문자열로 변환하는 함수
    const getDayName = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return date ? days[date.getDay()] : null; // TODO: selectedDate 널 체크 사항 -> 이거 뭐야
    };

    return (
        <St.CalendarItemBox
            $alcoholLevel={alcoholLevel}
            onClick={() => onItemClick(selectedDate)}
        >
            <St.CalendarItemDate // TODO: selectedDate 널 체크 사항 -> 이거 뭐야
                $isWeekend={selectedDate ? selectedDate.getDay() : null}
            >
                <h4>{getDayName(selectedDate)}</h4>
                <h2>{selectedDate?.getDate()}</h2>
            </St.CalendarItemDate>
            <St.CalendarItemBodyBox>{children}</St.CalendarItemBodyBox>
        </St.CalendarItemBox>
    );
};

export default EventCard;
