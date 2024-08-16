import { styled } from 'styled-components';

const StepperContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2143rem 0.9286rem;
    background-color: var(--color-green3, #252f2c);
    width: 7.1429rem;

    border-radius: 45px;
`;

const StyledButton = styled.button`
    flex-shrink: 0;
`;

const StyledIcon = styled.img`
    filter: brightness(0) invert(1);
`;

export { StepperContainer, StyledButton, StyledIcon };
