import { styled } from 'styled-components';
export const InformationContainer = styled.div`
    display: flex;
    padding: 1.7143rem;
    margin-bottom: 1.4286rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    border-radius: 20px;
    background-color: var(----color-green2, #465a54);
`;

export const StyledH2 = styled.h2`
    color: var(--color-white1, #ffffff);
    line-height: normal;
`;

export const StyledMessage = styled.p`
    color: var(--color-white1, #ffffff);
    font-size: var(--font-body-h3, 1rem);
    line-height: normal;
`;
