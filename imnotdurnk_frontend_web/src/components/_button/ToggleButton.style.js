import { styled } from 'styled-components';

const ToggleButtonContainer = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 1.4286rem;

    height: 44.0006px;
    padding: 0.7143rem 1.7857rem;

    border-radius: 45.0002px;
    background: ${(props) =>
        props.$isMono
            ? 'var(--color-white1, #FFFFFF)'
            : 'var(--color-white2, #F7F7EC)'};
`;

const ToggleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;

    height: 21px;
    padding: 0.3571rem 1.6429rem;

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
const StyledH4 = styled.h4`
    color: ${(props) =>
        props.$isSelected
            ? 'var(--color-white1, #FFFFFF)'
            : 'var(--color-green3, #252F2C)'};
    font-size: 0.75rem;
`;

export { StyledH4, ToggleButton, ToggleButtonContainer };
