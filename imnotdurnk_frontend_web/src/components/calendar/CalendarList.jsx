import useCalendarStore from '../../stores/useCalendarStore';
import * as St from './CalendarList.style';
import CalendarStatusBar from './CalendarStatusBar';
import EventCard from './EventCard';

const CalendarList = () => {
    const { eventListOnSelectedDate } = useCalendarStore();

    return (
        <St.CalendarListContainer>
            <CalendarStatusBar />
            <St.CalendarListBox>
                {eventListOnSelectedDate.length > 0 ? (
                    eventListOnSelectedDate.map((e) => {
                        return (
                            <EventCard
                                key={e.id}
                                alcoholLevel={e.alcoholLevel}
                                fromCalendar={false}
                                eventId={e.id}
                            >
                                <div>
                                    <St.CalendarItemTitle
                                        $alcoholLevel={e.alcoholLevel}
                                    >
                                        {e.title}
                                    </St.CalendarItemTitle>
                                    <St.CalendarItemTime
                                        $alcoholLevel={e.alcoholLevel}
                                    >
                                        {e.time}
                                    </St.CalendarItemTime>
                                </div>
                            </EventCard>
                        );
                    })
                ) : (
                    <St.StyledEmptyEvent>
                        일정이 존재하지 않습니다.
                    </St.StyledEmptyEvent>
                )}
            </St.CalendarListBox>
        </St.CalendarListContainer>
    );
};

export default CalendarList;
