import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.$isEmpty ? '1.71rem' : 'auto')};
    height: ${(props) => (props.$isEmpty ? '1.71rem' : 'auto')};

    padding: 0.14rem 0.93rem;

    background: ${(props) =>
        props.$isEmpty
            ? 'transparent'
            : props.$isRed
              ? 'var(--color-red, #FF6A5F)'
              : 'var(--color-white2, #F7F7EC)'};

    border: none;
    border-radius: 45px;

    ${(props) =>
        props.$isEmpty &&
        css`
            pointer-events: none;
            visibility: hidden;
        `}
`;

const StyledIcon = styled.img`
    filter: ${(props) => (props.$isRed ? 'brightness(0) invert(1)' : 'none')};
`;

export { StyledButton, StyledIcon };
