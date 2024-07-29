import { styled } from 'styled-components';

export const InformationContainer = styled.div`
    display: flex;
    padding: 1.7143rem;
    flex-direction: column;
    align-items: center;
    gap: 1.4286rem;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;

export const StyledH2 = styled.h2`
    align-self: stretch;
`;

export const StyledMessage = styled.p`
    align-self: stretch;
    font-size: var(--font-body-h3);
`;

export const StyledMessagewhenNotSent = styled.p`
    font-size: var(--font-body-h3);
`;
