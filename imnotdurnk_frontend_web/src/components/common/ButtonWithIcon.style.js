import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.$isEmpty ? '24px' : 'auto')};
    height: ${(props) => (props.$isEmpty ? '24px' : 'auto')};

    padding: 2px 13px;

    background: ${(props) =>
        props.$isEmpty ? 'transparent' : 'var(--color-white2, #F7F7EC)'};

    border: none;
    border-radius: 45px;

    ${(props) =>
        props.$isEmpty &&
        `
    pointer-events: none;
    visibility: hidden;
  `}
`;
