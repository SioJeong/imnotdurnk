import styled from 'styled-components';

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StyledInput = styled.input.attrs({ type: 'checkbox' })`
    margin: 0;
    appearance: none;
    width: 0.7143rem;
    height: 0.7143rem;
    border: 0.0357rem solid var(--color-green3, #252f2c);
    border-radius: 2px;
    background-color: white;
    cursor: pointer;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--color-green3, #252f2c);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    &:checked::before {
        opacity: 1;
    }

    &:checked::after {
        content: '✓';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
    }
`;

const StyledText = styled.p`
    font-size: var(--font-body-h6, 0.57rem);
`;

export { StyledLabel, StyledInput, StyledText };
