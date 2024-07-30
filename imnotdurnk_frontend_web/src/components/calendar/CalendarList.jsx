import { styled } from 'styled-components';
import useCalendarStore from '../../stores/useCalendarStore';
import CalendarStatusBar from './CalendarStatusBar';
import EventCard from './EventCard';

const CalendarList = () => {
    const { eventListOnSelectedDate } = useCalendarStore();

    return (
        <CalendarListContainer>
            <CalendarStatusBar />
            <CalendarListBox>
                {eventListOnSelectedDate.length > 0 ? (
                    eventListOnSelectedDate.map((e) => {
                        return (
                            <EventCard key={e.id} alcoholLevel={e.alcoholLevel}>
                                <div>
                                    <CalendarItemTitle
                                        $alcoholLevel={e.alcoholLevel}
                                    >
                                        {e.title}
                                    </CalendarItemTitle>
                                    <CalendarItemTime
                                        $alcoholLevel={e.alcoholLevel}
                                    >
                                        {e.time}
                                    </CalendarItemTime>
                                </div>
                            </EventCard>
                        );
                    })
                ) : (
                    <StyledEmptyEvent>
                        일정이 존재하지 않습니다.
                    </StyledEmptyEvent>
                )}
            </CalendarListBox>
        </CalendarListContainer>
    );
};

export default CalendarList;

const CalendarListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const CalendarListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CalendarItemTitle = styled.h3`
    color: ${({ $alcoholLevel }) =>
        $alcoholLevel >= 2 ? 'var(--color-white1)' : 'var(--color-green3)'};
`;

const CalendarItemTime = styled.p`
    color: ${({ $alcoholLevel }) =>
        $alcoholLevel >= 2 ? 'var(--color-white1)' : 'var(--color-green3)'};
`;

const StyledEmptyEvent = styled.h3`
    padding-top: 3rem;
`;
