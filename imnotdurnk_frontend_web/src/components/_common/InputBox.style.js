import { styled } from 'styled-components';

const InputBoxContainer = styled.div`
    display: flex;
    width: ${(props) => (props.$size === 'small' ? '9rem' : '19rem')};
    padding: 0.5rem
        ${(props) => (props.$size === 'small' ? '1.1429rem' : '1.4286rem')};
    justify-content: space-between;
    align-items: center;
    border-radius: 0.7143rem;
    background: var(----color-white1, #fff);
    gap: ${(props) => (props.$size === 'small' ? '0.2143rem' : '0.3571rem')};
`;

const TextContainer = styled.div`
    display: flex;
    width: ${(props) =>
        props.$size === 'small' ? '4.0714rem ' : '13.5714rem'};

    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: ${(props) => (props.$size === 'small' ? '0.2143rem' : '.3571rem')};
`;

const InputLabel = styled.h6`
    color: var(----color-green3, #252f2c);
    font-size: var(---font-title-h6, 0.57rem);
`;

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-size: var(--font-body-h5, 0.71rem);
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
