import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 5.6429rem;
    padding: 0.2857rem;
    background-color: ${(props) =>
        props.$isRed
            ? 'var(--color-red, #FF6A5F)'
            : 'var(--color-white1, #fff)'};
    border: none;
    border-radius: 45px;
`;

export const StyledText = styled.h6`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0;
`;

export const StyledIcon = styled.img`
    filter: ${(props) => (props.$isRed ? 'brightness(0) invert(1)' : 'none')};
`;
