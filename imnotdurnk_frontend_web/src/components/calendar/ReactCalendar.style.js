import { styled } from 'styled-components';

const DateTile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 3.1rem;
`;

const DateNum = styled.p`
    color: var(--color-white1);
    line-height: 1.5rem;
    font-size: var(--font-title-h3);
    font-weight: 500;
`;

const EventItem = styled.li`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;

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

export { DateNum, DateTile, EventItem };
