import { styled } from 'styled-components';

const InputBoxContainer = styled.div`
    display: flex;
    width: ${(props) =>
        props.$size === 'small'
            ? '9rem'
            : '100%'}; /* 'small'이 아닐 때 100%로 설정 */

    padding: 0.5rem
        ${(props) => (props.$size === 'small' ? '1.1429rem' : '1.4286rem')};
    justify-content: space-between;
    align-items: center;
    border-radius: 10.0002px;
    background: var(----color-white1, #fff);
    gap: ${(props) => (props.$size === 'small' ? '0.2143rem' : '0.3571rem')};
`;

const TextContainer = styled.div`
    display: flex;
    width: ${(props) =>
        props.$size === 'small' ? '56.9996px ' : '189.9996px'};

    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: ${(props) => (props.$size === 'small' ? '3.0002px' : '4.9994px')};
`;

const InputLabel = styled.h6`
    color: var(----color-green3, #252f2c);
    font-size: var(---font-title-h6, 7.98px);
`;

const Input = styled.input`
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    font-size: var(--font-body-h5, 9.94px);
`;

const InputIcon = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 1.7143rem;
    height: 1.7143rem;
    ${(props) =>
        props.$isEmpty &&
        `
    pointer-events: none;
    visibility: hidden;
  `}
`;

export { Input, InputBoxContainer, InputIcon, InputLabel, TextContainer };
