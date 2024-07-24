import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 8.1429rem;
    background-color: ${(props) =>
        props.$isRed
            ? 'var(--color-red, #FF6A5F)'
            : 'var(--color-white1, #fff)'};
    border: none;
    border-radius: 45px;
`;

const StyledText = styled.h4`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0;
`;

export { StyledButton, StyledText };
