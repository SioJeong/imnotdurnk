import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) =>
        props.$isEmpty ? '1.71rem' : 'auto'}; /* 24px -> 1.71rem */
    height: ${(props) =>
        props.$isEmpty ? '1.71rem' : 'auto'}; /* 24px -> 1.71rem */

    padding: 0.14rem 0.93rem; /* 2px -> 0.14rem, 13px -> 0.93rem */

    background: ${(props) =>
        props.$isEmpty ? 'transparent' : 'var(--color-white2, #F7F7EC)'};

    border: none;
    border-radius: 45px; /* px 단위 유지 */

    ${(props) =>
        props.$isEmpty &&
        `
    pointer-events: none;
    visibility: hidden;
  `}
`;

export { StyledButton };
