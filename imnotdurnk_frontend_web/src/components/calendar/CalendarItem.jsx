import { styled } from 'styled-components';
import useCalendarStore from '../../stores/useCalendarStore';
import CalendarItemBody from './CalendarItemBody';

const CalendarItem = ({ statusOnDate, onItemClick }) => {
    const { selectedDate, eventListOnSelectedDate } = useCalendarStore();

    // 요일 index -> 문자열로 변환하는 함수
    const getDayName = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    };

    return (
        <CalendarItemBox
            $alcoholLevel={statusOnDate?.alcoholLevel}
            onClick={() => onItemClick(selectedDate)}
        >
            <CalendarItemDate $isWeekend={selectedDate.getDay()}>
                <h4>{getDayName(selectedDate)}</h4>
                <h2>{selectedDate.getDate()}</h2>
            </CalendarItemDate>
            <CalendarItemBody
                eventListOnSelectedDate={eventListOnSelectedDate.slice(0, 3)}
                statusOnDate={statusOnDate}
            />
            {/* <CalendarItemBody>
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
            </CalendarItemBody> */}
        </CalendarItemBox>
    );
};

export default CalendarItem;

const CalendarItemBox = styled.div`
    display: flex;
    gap: 1.4286rem;
    align-items: center;

    width: auto;
    min-height: 8.2857rem;
    padding: 1.5357rem 1.7143rem;
    border-radius: 20px;

    background-color: ${({ $alcoholLevel }) => {
        switch ($alcoholLevel) {
            case 3:
                return 'var(--color-red)';
            case 2:
                return 'var(--color-green1)';
            case 1:
                return 'var(--color-yellow)';
            default:
                return 'var(--color-white2)';
        }
    }};
`;

const CalendarItemDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2857rem;

    width: 3.7143rem;
    height: 5.2143rem;
    border-radius: 10px;
    background-color: var(--color-white1);

    // 요일에 따른 글자 색상 설정
    h4,
    h2 {
        color: ${({ $isWeekend }) =>
            $isWeekend === 0
                ? 'var(--color-red)'
                : $isWeekend === 6
                  ? 'var(--color-blue)'
                  : 'var(--color-green3)'};
    }
`;

// const CalendarItemBody = styled.div`
//     display: flex;
//     flex-direction: column;
//     /* word-wrap: break-word; */

//     width: 15.1429rem;
// `;
// const CalendarItemEventList = styled.h3`
//     color: ${({ $alcoholLevel }) =>
//         $alcoholLevel >= 2 ? 'var(--color-white1)' : 'var(--color-green3)'};
// `;
