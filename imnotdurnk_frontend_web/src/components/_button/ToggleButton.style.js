import { styled } from 'styled-components';

export const ToggleButtonContainer = styled.div`
    display: inline-flex;
    height: 44.0006px;
    padding: 0.7143rem 1.7857rem;
    justify-content: center;
    align-items: center;
    gap: 1.4286rem;
    border-radius: 45.0002px;
    background: ${(props) =>
        props.$isMono
            ? 'var(--color-white1, #FFFFFF)'
            : 'var(--color-white2, #F7F7EC)'};
`;

export const ToggleButton = styled.div`
    display: flex;
    height: 21px;
    padding: 0.3571rem 1.6429rem;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;
    border-radius: 3.2143rem;
    background: ${(props) =>
        props.$isSelected
            ? props.$isMono
                ? 'var(--color-green3, #252F2C)'
                : 'var(--color-red, #FF6A5F)'
            : 'var(--color-white1, #FFFFFF)'};
    ${(props) =>
        props.$isMono &&
        !props.$isSelected &&
        `
        border: 1px solid var(--color-green3, #252F2C);
  `}
`;
export const StyledH4 = styled.h4`
    color: ${(props) =>
        props.$isSelected
            ? 'var(--color-white1, #FFFFFF)'
            : 'var(--color-green3, #252F2C)'};
    font-size: 0.75rem;
`;
