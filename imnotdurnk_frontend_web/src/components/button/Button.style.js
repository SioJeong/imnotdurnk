import { styled } from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    /* size props에 따라 버튼 사이즈 동적으로 변경 */
    width: ${(props) => {
        if (props.$size === 'small') {
            return '50px';
        } else if (props.$size === 'medium') {
            return '99px';
        } else {
            return '265.0004px';
        }
    }};

    height: ${(props) => {
        if (props.$size === 'small') {
            return '28px';
        } else if (props.$size === 'medium') {
            return '42px';
        } else {
            return '42px';
        }
    }};

    background-color: ${(props) =>
        props.$isRed
            ? 'var(--color-red, #FF6A5F)'
            : 'var(--color-white1, #fff)'};
    border: none;
    border-radius: 45.0002px;

    box-sizing: border-box;
`;

const StyledTextP = styled.p`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0rem;
    font-size: var(--font-body-h4, 0.86rem);
`;

const StyledTextH4 = styled.h4`
    color: ${(props) => (props.$isRed ? 'white' : 'inherit')};
    margin: 0rem;
`;

export { StyledButton, StyledTextH4, StyledTextP };
