import { styled } from 'styled-components';

const CalendarStatusBar = () => {
    return (
        <AlcoholLevelBox>
            <AlcoholLevel>
                <StatusDot $alcoholLevel={0} />
                <StatusExplain>시작 전</StatusExplain>
            </AlcoholLevel>
            <AlcoholLevel>
                <StatusDot $alcoholLevel={1} />
                <StatusExplain>취하지 않음</StatusExplain>
            </AlcoholLevel>
            <AlcoholLevel>
                <StatusDot $alcoholLevel={2} />
                <StatusExplain>적당히 취함</StatusExplain>
            </AlcoholLevel>
            <AlcoholLevel>
                <StatusDot $alcoholLevel={3} />
                <StatusExplain>만취</StatusExplain>
            </AlcoholLevel>
        </AlcoholLevelBox>
    );
};

export default CalendarStatusBar;

const AlcoholLevelBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    padding: 0rem 1.7143rem;
`;

const AlcoholLevel = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const StatusDot = styled.span`
    width: 0.4286rem;
    height: 0.4286rem;
    border-radius: 50%;

    background-color: ${({ $alcoholLevel }) => {
        switch ($alcoholLevel) {
            case 1:
                return 'var(--color-yellow)';
            case 2:
                return 'var(--color-green1)';
            case 3:
                return 'var(--color-red)';
            default:
                return 'var(--color-white1)';
        }
    }};
`;

const StatusExplain = styled.p`
    font-size: var(--font-body-h5);
`;
