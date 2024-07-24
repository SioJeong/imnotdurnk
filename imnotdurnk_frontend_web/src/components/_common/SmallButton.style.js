import styled from 'styled-components';

const StyledButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1.1429rem;
    background-color: ${(props) =>
        props.$isRed
            ? 'var(--color-red, #FF6A5F)'
            : 'var(--color-white1, #fff)'};
    border: none;
    border-radius: 45px;
`;

const StyledText = styled.p`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0;
    font-size: var(--font-body-h4, 0.86rem);
`;

export { StyledButton, StyledText };
