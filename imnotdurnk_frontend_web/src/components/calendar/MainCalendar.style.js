import { styled } from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7143rem;
`;

const EventCardTitle = styled.h3`
    color: ${({ $alcoholLevel }) =>
        $alcoholLevel >= 2 ? 'var(--color-white1)' : 'var(--color-green3)'};
    margin: 0.2857rem 0;
`;

const EventCardMorePlan = styled.p`
    color: ${({ $alcoholLevel }) =>
        $alcoholLevel < 2 ? 'var(--color-green2)' : 'var(--color-green3)'};
    margin-top: 5px;
`;

export { EventCardMorePlan, EventCardTitle, MainContainer };
