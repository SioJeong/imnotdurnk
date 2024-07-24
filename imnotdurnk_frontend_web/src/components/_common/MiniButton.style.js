import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) =>
        props.$isRed
            ? 'var(--color-red, #FF6A5F)'
            : 'var(--color-white1, #fff)'};

    border: none;
    border-radius: 3.2143rem;
`;

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.2143rem;
    width: 5.6429rem;
    height: 1.7143rem;
`;

const StyledText = styled.h6`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0;
`;

const StyledIcon = styled.img`
    filter: ${(props) => (props.$isRed ? 'brightness(0) invert(1)' : 'none')};
`;

export { StyledButton, StyledContainer, StyledText, StyledIcon };
