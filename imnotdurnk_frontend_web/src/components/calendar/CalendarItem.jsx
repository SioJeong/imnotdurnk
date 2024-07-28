import { styled } from 'styled-components';
import useCalendarStore from '../../stores/useCalendarStore';

const CalendarItem = () => {
    const { eventListOnSelectedDate } = useCalendarStore();

    return (
        <CalendarItemBox>
            {eventListOnSelectedDate.map((e) => {
                <p>{e.title}</p>;
                // console.log(e.title);
            })}
        </CalendarItemBox>
    );
};

export default CalendarItem;

const CalendarItemBox = styled.div`
    width: auto;
    min-height: 8.2857rem;
    border-radius: 20px;
    background-color: var(--color-white2);
`;
