import { styled } from 'styled-components';

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

    cursor: pointer;
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

const CalendarItemBodyBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 15.1429rem;
`;

export { CalendarItemBodyBox, CalendarItemBox, CalendarItemDate };
