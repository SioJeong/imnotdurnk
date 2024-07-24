import styled from 'styled-components';

const StyledButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2.0714rem;
    background-color: ${(props) =>
        props.$isRed
            ? 'var(--color-red, #FF6A5F)'
            : 'var(--color-white2, #F7F7EC)'};
    border: none;
    border-radius: 10px;
`;

const StyledText = styled.h4`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0;
`;

export { StyledButton, StyledText };
