import { styled } from 'styled-components';

const CalendarItemBodyBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 15.1429rem;
`;
const CalendarItemEventList = styled.h3`
    color: ${({ $alcoholLevel }) =>
        $alcoholLevel >= 2 ? 'var(--color-white1)' : 'var(--color-green3)'};
`;

const CalendarItemBody = ({ eventListOnSelectedDate, statusOnDate }) => {
    return (
        <CalendarItemBodyBox>
            {eventListOnSelectedDate.length > 0 ? (
                eventListOnSelectedDate.map((e) => (
                    <CalendarItemEventList
                        key={e.id}
                        $alcoholLevel={statusOnDate?.alcoholLevel}
                    >
                        - {e.title}
                    </CalendarItemEventList>
                ))
            ) : (
                <h3>일정 없음</h3>
            )}
        </CalendarItemBodyBox>
    );
};

export default CalendarItemBody;
