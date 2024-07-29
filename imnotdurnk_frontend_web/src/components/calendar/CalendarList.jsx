import useCalendarStore from '../../stores/useCalendarStore';
import CalendarStatusBar from './CalendarStatusBar';
import EventCard from './EventCard';

const CalendarList = () => {
    // const { date } = useParams();
    const { eventListOnSelectedDate } = useCalendarStore();

    return (
        <>
            <CalendarStatusBar />
            <br />
            <div>
                {eventListOnSelectedDate.length > 0 ? (
                    eventListOnSelectedDate.map((e) => {
                        const textColor =
                            e.alcoholLevel >= 2
                                ? 'var(--color-white1)'
                                : 'var(--color-green3)';
                        return (
                            <EventCard key={e.id} alcoholLevel={e.alcoholLevel}>
                                <div>
                                    <h3 style={{ color: textColor }}>
                                        {e.title}
                                    </h3>
                                    <p style={{ color: textColor }}>{e.time}</p>
                                </div>
                            </EventCard>
                        );
                    })
                ) : (
                    <h3>이 날짜에 일정이 없습니다.</h3>
                )}
            </div>
        </>
    );
};

export default CalendarList;
