import { styled } from 'styled-components';

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
                return 'var(--color-white2)';
        }
    }};
`;

const StatusExplain = styled.p`
    font-size: var(--font-body-h5);
`;

export { AlcoholLevel, AlcoholLevelBox, StatusDot, StatusExplain };
