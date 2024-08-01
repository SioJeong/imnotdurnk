import { styled } from 'styled-components';

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

export {
    CalendarItemTime,
    CalendarItemTitle,
    CalendarListBox,
    CalendarListContainer,
    StyledEmptyEvent,
};
