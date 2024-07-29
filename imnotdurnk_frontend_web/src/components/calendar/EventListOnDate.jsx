import { useParams } from 'react-router-dom';
import useCalendarStore from '../../stores/useCalendarStore';
import CalendarItem from './CalendarItem';
import CalendarStatusBar from './CalendarStatusBar';

const EventListOnDate = ({ statusOnDate }) => {
    const { date } = useParams();
    const { eventListOnSelectedDate } = useCalendarStore();

    return (
        <>
            <CalendarStatusBar />
            <br />
            <CalendarItem statusOnDate={statusOnDate} />
            {/* 여기에 이벤트 리스트 컴포넌트를 추가하세요 */}
        </>
    );
};

export default EventListOnDate;
